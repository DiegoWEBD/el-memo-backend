import { Sale, SaleRepository } from '../../domain'
import { fromDateToMysqlStringDate } from '../../utils'
import { Database } from '../database'
import { adaptSale } from './sale.adapter'

export class PostgresqlSaleRepository implements SaleRepository {
	database: Database

	constructor(database: Database) {
		this.database = database
	}

	async getAll(): Promise<Sale[]> {
		const query = 'select * from get_sales();'
		const { data } = await this.database.query(query)
		const sales: Sale[] = data.map(adaptSale)
		return sales
	}
	async add(sale: Sale): Promise<Sale> {
		if (sale.code === '') sale.code = await this.generateCode()
		const byCredit = sale.byCredit ? 'true' : 'false'
		const withIva = sale.withIva ? 'true' : 'false'
		const voucherCode =
			sale.voucherCode === null ? 'null' : `"${sale.voucherCode}"`
		const saleDate = fromDateToMysqlStringDate(sale.saleDate)
		const clientId = sale.clientId !== null ? sale.clientId : 'null'

		const queries: string[] = []
		let query =
			'insert into sale (code, by_credit, with_iva, sale_date, voucher_code, client_id) ' +
			`values ('${sale.code}', ${byCredit}, ${withIva}, '${saleDate}', ${voucherCode}, ${clientId});`
		queries.push(query)
		for (const item of sale.soldItems) {
			query =
				'insert into sale_detail (sale_code, sold_item_code, quantity) ' +
				`values ('${sale.code}', '${item.code}', ${item.quantity});`
			queries.push(query)
		}
		await this.database.executeTransaction(queries)
		return (await this.findByCode(sale.code)) as Sale
	}
	async findByCode(saleCode: string): Promise<Sale | null> {
		const query = `select * from get_sale('${saleCode}');`
		const { data } = await this.database.query(query)
		return data.length === 0 ? null : adaptSale(data[0])
	}

	private async generateCode(): Promise<string> {
		const { data } = await this.database.query('select s.code from sale s;')
		const codes: number[] = data.map((item) => parseInt(item.code))
		return codes.length !== 0 ? `${Math.max(...codes) + 1}` : '1001'
	}
}
