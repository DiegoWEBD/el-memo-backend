import { type Product, type ProductRepository } from '../../domain'
import { adaptProduct } from './product.adapter'
import { type Database } from '../database'

export class MysqlProductRepository implements ProductRepository {
	database: Database

	constructor(database: Database) {
		this.database = database
	}

	async getAll(): Promise<Product[]> {
		const query =
			'select i.code, i.description, p.buy_price, ' +
			'i.price, p.stock ' +
			'from product p inner join item i ' +
			'on p.code = i.code;'
		const { data } = await this.database.query(query)
		return data.map(adaptProduct)
	}

	async add(product: Product): Promise<void> {
		const query =
			'insert into product(code, buy_price, stock) ' +
			`values ("${product.code}", ${product.buyPrice}, ${product.stock});`

		await this.database.query(query)
	}

	async findByCode(code: string): Promise<Product | null> {
		const query =
			'select i.code, i.description, p.buy_price, ' +
			'i.price, p.stock ' +
			'from product p inner join item i ' +
			'on p.code = i.code ' +
			`where p.code = "${code}";`
		const { data } = await this.database.query(query)
		const product = data[0]
		return product === undefined ? null : adaptProduct(product)
	}

	async update(productCode: string, newValues: Product): Promise<void> {
		const query =
			'update product set ' +
			`buy_price = "${newValues.buyPrice}", ` +
			`stock = "${newValues.stock}" ` +
			`where code = "${productCode}";`

		await this.database.query(query)
	}

	async remove(productCode: string): Promise<void> {
		const query = `delete from product where code = "${productCode}"`
		await this.database.query(query)
	}
}
