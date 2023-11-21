create table if not exists item (
	code text primary key,
	description text not null,
	price int not null
);

create table if not exists product (
	code text primary key,
	stock int not null check (stock >= 0),
	buy_price int not null,
	constraint product_code_fk foreign key (code) 
    references item(code)
	on delete cascade on update cascade
);

create table if not exists promotion (
	code text primary key,
	constraint promotion_code_fk foreign key (code) 
    references item(code) 
	on delete cascade on update cascade
);

create table if not exists promotion_product (
	promotion_code text not null,
	product_code text not null,
	product_quantity int not null check (product_quantity > 0),
	constraint promotion_code_fk foreign key (promotion_code) 
    references promotion(code) 
	on delete cascade on update cascade,
	constraint product_code_fk foreign key (product_code) 
    references product(code) 
	on delete cascade on update cascade,
    primary key (promotion_code, product_code)
);

create table if not exists client (
	id serial primary key,
	name text not null,
	birth_date date not null,
	special_discount numeric not null
    check (special_discount >= 0 and special_discount <= 1),
	registration_date timestamp not null
);

create table if not exists client_phone (
	client_id int not null,
	phone_number text not null unique,
	primary key (client_id, phone_number),
	constraint client_id_fk foreign key (client_id) 
    references client(id) 
	on delete cascade on update cascade
);

create table if not exists sale (
	code text primary key check (code != ''),
	subtotal int not null default 0,
	cost int not null default 0,
	sale_date timestamp not null,
	client_id int default null,
	client_name text default null,
	by_credit bool not null,
	with_iva bool not null,
	voucher_code text unique,
	constraint client_id_fk foreign key (client_id) 
    references client(id) 
	on delete set null on update cascade
);

create table if not exists sale_detail (
	sale_code text not null,
	sold_item_code text not null,
	quantity int not null check (quantity > 0),
	item_description text not null,
	item_price int not null,
	constraint sale_code_fk foreign key (sale_code) 
    references sale(code) 
	on delete cascade on update cascade,
    primary key (sale_code, sold_item_code)
);

create table if not exists credit (
	id serial primary key,
	sale_code text not null,
	amount int not null,
	payment_date timestamp not null default current_timestamp,
	voucher_code text unique,
	constraint sale_code_fk foreign key (sale_code) 
    references sale(code) 
	on delete cascade on update cascade
);

create type sale_discount_type as enum('client', 'birthday', 'additional');

create table if not exists sale_discount (
	sale_code text not null,
	discount_type sale_discount_type not null,
	percentage numeric not null
    check (percentage >= 0 and percentage <= 1),
	constraint sale_code_fk foreign key (sale_code)
    references sale(code) 
	on delete cascade on update cascade,
    primary key (sale_code, discount_type)
);

create table if not exists sale_adjustment (
	sale_code text primary key,
	amount int not null,
	updated_at timestamp not null default current_timestamp,
	constraint sale_code_fk foreign key (sale_code) 
    references sale(code) 
	on delete cascade on update cascade
);

create table if not exists sys_user (
	username text primary key,
	password text not null,
	name text not null,
	registered_at timestamp not null default current_timestamp
);

create table if not exists user_phone (
	username text not null,
	phone_number text not null unique,
	constraint username_fk foreign key (username) 
    references sys_user(username) 
	on delete cascade on update cascade,
    primary key (username, phone_number)
);

create table if not exists admin (
	username text primary key,
	constraint username_fk foreign key (username) 
    references sys_user(username) 
	on delete cascade on update cascade
);


/* TRIGGERS */

create or replace function on_delete_product()
returns trigger
language plpgsql
as $$
begin
    delete from item i
    where i.code = old.code;

    return old;
end $$;

create or replace trigger on_delete_product
after delete on product
for each row execute function on_delete_product();


create or replace function on_delete_promotion()
returns trigger
language plpgsql
as $$
begin
    delete from item i
    where i.code = old.code;

    return old;
end $$;

create or replace trigger on_delete_promotion
after delete on promotion
for each row execute function on_delete_promotion();


create or replace function check_sale_detail()
returns trigger
language plpgsql
as $$
declare
	found_item_code text;
	product_code text;
	product_stock int;
	product_cost int; /* buy_price */
	product_description text;
	product_price int;
begin
	select i.code
	into found_item_code
	from item i
	where i.code = new.sold_item_code;

	if found_item_code is null then
		raise exception 'El item % no existe', new.sold_item_code;
	end if;

	select p.code, p.stock, p.buy_price,
	i.description, i.price 
	into product_code, product_stock, 
	product_cost, product_description,
	product_price
	from product p 
	inner join item i 
	on p.code = i.code
	where new.sold_item_code = p.code;

	if product_code is not null then
		/*if product_stock < new.quantity then
			signal sqlstate '45000' 
			set message_text = 'Insufficient product stock.';
		end if;*/
	
		if new.item_description is null then 
			new.item_description := product_description;
		end if;
	
		if new.item_price is null then
			new.item_price := product_price;
		end if;
		
		/* update product 
		set stock = stock - new.quantity
		where code = new.sold_item_code; */
	
		update sale set 
		subtotal = subtotal + (product_price * new.quantity),
		cost = cost + (product_cost * new.quantity)
		where code = new.sale_code;
	end if;

	return new;
end $$;


create or replace trigger check_sale_detail
before insert on sale_detail
for each row execute function check_sale_detail(); 



create or replace function check_sale_discount()
returns trigger
language plpgsql
as $$
declare
	client_discount numeric;
	client_birth_date date;
begin
	if new.client_id is null then
		return new;
	end if;

	select c.special_discount, c.birth_date
	into client_discount, client_birth_date
	from client c
	where c.id = new.client_id;

	if client_discount != 0 then
		insert into sale_discount (sale_code, discount_type, percentage)
		values (new.code, 'client', client_discount);
	end if;

	return new;
end $$;


create or replace trigger check_sale_discount
after insert on sale
for each row execute function check_sale_discount();



create or replace function check_sale_credit() 
returns trigger 
language plpgsql
as $$
declare
   sale_total int;
   amount_payed int;
begin
   select 
      round(aux.total_percentage * aux.subtotal),
      coalesce(sum(c.amount), 0)
   into sale_total, amount_payed
   from (
      select s.code as sale_code, s.subtotal,
         1 - coalesce(exp(sum(log(sd.percentage))), 0) as total_percentage
      from sale s
      left join sale_discount sd on s.code = sd.sale_code
      group by s.code
   ) as aux
   left join credit c on aux.sale_code = c.sale_code 
   where aux.sale_code = new.sale_code
   group by aux.sale_code;

   if amount_payed + new.amount > sale_total then
      raise exception 'El monto del abono sobrepasa el monto restante por pagar.';
   end if;

   return new;
end $$;


create or replace trigger check_sale_credit
before insert on credit
for each row
execute function check_sale_credit();


create or replace function check_sale_client() 
returns trigger 
language plpgsql
as $$
declare
	sale_client_name text;
begin
	if new.client_id is null then
		return new;
	end if;

	select c.name
	into sale_client_name
	from client c
	where c.id = new.client_id;

	if sale_client_name is null then
		raise exception 'El cliente con id % no existe', new.client_id;
	end if;

	new.client_name := sale_client_name;
	return new;
end $$;

create or replace trigger check_sale_client
before insert on sale
for each row
execute function check_sale_client();


/* FUNCTIONS */

create or replace function get_sales()
returns table(
	code text,
	subtotal int,
	discount_applied numeric,
	total numeric,
	utility numeric,
	sale_date timestamp,
	client_id int,
	client_name text,
	by_credit bool,
	with_iva bool,
	voucher_code text,
	completed bool
)
language plpgsql
as $$
begin
    return query
    select aux2.code, aux2.subtotal, 
           round(1 - aux2.total_percentage, 2) as discount_applied,
           cast(aux2.total as numeric) as total, 
           cast((aux2.total - aux2.cost) as numeric) as utility, 
           aux2.sale_date, aux2.client_id, aux2.client_name,
           aux2.by_credit, aux2.with_iva, aux2.voucher_code,
           (not aux2.by_credit or (aux2.amount_paid = aux2.total)) as completed
    from (
        select aux.code, aux.subtotal, aux.cost, aux.total_percentage,
               aux.sale_date, aux.client_id, aux.client_name,
               aux.by_credit, aux.with_iva, aux.voucher_code,
               round(aux.total_percentage * aux.subtotal, 2) as total,
               coalesce(sum(c.amount), 0) as amount_paid
        from (
            select s.code, s.subtotal, s.cost,
                   s.sale_date, s.client_id, s.client_name,
                   s.by_credit, s.with_iva, s.voucher_code,
                   1 - coalesce(exp(sum(ln(sd.percentage))), 0) as total_percentage
            from sale s
            left join sale_discount sd on s.code = sd.sale_code
            group by s.code, s.subtotal, s.cost, s.sale_date, s.client_id, s.client_name, s.by_credit, s.with_iva, s.voucher_code
        ) as aux
        left join credit c on aux.code = c.sale_code 
        group by aux.code, aux.subtotal, aux.cost, aux.sale_date, aux.client_id, aux.client_name, aux.by_credit, aux.with_iva, aux.voucher_code, aux.total_percentage
    ) as aux2;
end $$;


create or replace function get_sale(sale_code text)
returns table(
	code text,
	subtotal int,
	discount_applied numeric,
	total numeric,
	utility numeric,
	sale_date timestamp,
	client_id int,
	client_name text,
	by_credit bool,
	with_iva bool,
	voucher_code text,
	completed bool
)
language plpgsql
as $$
declare
	found_sale_code text;
begin
	select s.code
	into found_sale_code
	from sale s
	where s.code = sale_code;

	if found_sale_code is null then
		raise exception 'La venta % no existe', sale_code;
	end if;

    return query
    select aux2.code, aux2.subtotal, 
           round(1 - aux2.total_percentage, 2) as discount_applied,
           cast(aux2.total as numeric) as total, 
           cast((aux2.total - aux2.cost) as numeric) as utility, 
           aux2.sale_date, aux2.client_id, aux2.client_name,
           aux2.by_credit, aux2.with_iva, aux2.voucher_code,
           (not aux2.by_credit or (aux2.amount_paid = aux2.total)) as completed
    from (
        select aux.code, aux.subtotal, aux.cost, aux.total_percentage,
               aux.sale_date, aux.client_id, aux.client_name,
               aux.by_credit, aux.with_iva, aux.voucher_code,
               round(aux.total_percentage * aux.subtotal, 2) as total,
               coalesce(sum(c.amount), 0) as amount_paid
        from (
            select s.code, s.subtotal, s.cost,
                   s.sale_date, s.client_id, s.client_name,
                   s.by_credit, s.with_iva, s.voucher_code,
                   1 - coalesce(exp(sum(ln(sd.percentage))), 0) as total_percentage
            from sale s
            left join sale_discount sd on s.code = sd.sale_code
            group by s.code, s.subtotal, s.cost, s.sale_date, s.client_id, s.client_name, s.by_credit, s.with_iva, s.voucher_code
        ) as aux
        left join credit c on aux.code = c.sale_code 
        group by aux.code, aux.subtotal, aux.cost, aux.sale_date, aux.client_id, aux.client_name, aux.by_credit, aux.with_iva, aux.voucher_code, aux.total_percentage
    ) as aux2
	where aux2.code = sale_code;
end $$;



create or replace function get_sale_credits(request_sale_code text)
returns table(
	id int,
	sale_code text,
	amount int,
	payment_date timestamp,
	voucher_code text,
	utility numeric
)
language plpgsql
as $$
declare
	found_sale_code text;
begin
	select s.code
	into found_sale_code
	from sale s
	where s.code = request_sale_code;

	if found_sale_code is null then
		raise exception 'La venta % no existe', request_sale_code;
	end if;

    return query
    select aux2.id, aux2.sale_code, aux2.amount, 
    aux2.payment_date, aux2.voucher_code,
    round((aux2.amount / aux2.sale_total) * aux2.sale_utility) as utility
    from (
        select c.id, c.sale_code, c.amount,
        c.payment_date, c.voucher_code,
        round(aux.total_percentage * aux.subtotal) as sale_total,
        round(aux.total_percentage * aux.subtotal) - aux.cost as sale_utility
        from (
            select s.code, s.subtotal, s.cost,
            coalesce(exp(sum(ln(1 - sd.percentage))), 1) as total_percentage
            from sale s
            left join sale_discount sd 
            on s.code = sd.sale_code
            group by s.code
        ) as aux
        inner join credit c
        on aux.code = c.sale_code 
    ) as aux2
    where aux2.sale_code = request_sale_code
    order by aux2.id asc;
end $$;


create or replace function get_all_credits()
returns table (
	id int,
	sale_code text,
	amount int,
	payment_date timestamp,
	voucher_code text,
	utility numeric
)
language plpgsql
as $$
begin
	return query
	select aux2.id, aux2.sale_code, aux2.amount, 
	aux2.payment_date, aux2.voucher_code,
	round((aux2.amount / aux2.sale_total) * aux2.sale_utility) as utility
	from (
		select c.id, c.sale_code, c.amount,
		c.payment_date, c.voucher_code,
		round(aux.total_percentage * aux.subtotal) as sale_total,
		round(aux.total_percentage * aux.subtotal) - aux.cost as sale_utility
		from (
			select s.code, s.subtotal, s.cost,
			coalesce(exp(sum(log(1 - sd.percentage))), 1)
			as total_percentage
			from sale s
			left join sale_discount sd 
			on s.code = sd.sale_code
			group by s.code
		) as aux
		inner join credit c
		on aux.code = c.sale_code 
	) as aux2
	order by aux2.id asc;
end $$;


/* PROCEDURES */

create or replace procedure insert_client(
    client_name text, 
    client_birth_date date,
    client_discount numeric,
    registered_at timestamp,
    phone_numbers text
)
language plpgsql
as $$
declare
    phone varchar(255);
    i int := 0;
    phone_count int := 0;
    phone_array varchar(255);
    new_client_id int;
    existing_phone int;
begin

    insert into client (name, birth_date, special_discount, registration_date)
    values (client_name, client_birth_date, client_discount, registered_at)
    returning id into new_client_id;

    phone_array := lower(phone_numbers);
    phone_count := length(phone_array) - length(replace(phone_array, ',', '')) + 1;

    while i < phone_count loop
        phone := substring(phone_array from '([^,]+)');
        phone_array := substring(phone_array from length(phone) + 2);
        i := i + 1;

        if phone != '' then
            select count(*)
            into existing_phone
            from client_phone cp 
            where cp.phone_number = phone;

            if existing_phone > 0 then
                raise exception 'El número de teléfono ya está registrado.';
            end if;
			insert into client_phone (client_id, phone_number)
            values (new_client_id, phone);
        end if;
    end loop;
end $$;




















