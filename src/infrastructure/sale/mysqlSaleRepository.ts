import type { Sale, SaleRepository } from '../../domain'
import { adaptSale, adaptSaleDiscount, adaptSoldItem } from './sale.adapter'
import { fromDateToMysqlStringDate } from '../../utils'
import { type Database } from '../database'

export class MysqlSaleRepository implements SaleRepository {
	database: Database

	constructor(database: Database) {
		this.database = database
	}

	async getAll(): Promise<Sale[]> {
		let query = 'call get_sales();'
		const { data } = await this.database.call('get_sales()')
		const sales: Sale[] = []

		for (const row of data) {
			const sale = adaptSale(row)
			query =
				'select sold_item_code as code, ' +
				'item_description as description, ' +
				'item_price as price, quantity ' +
				'from sale_detail ' +
				`where sale_code = "${sale.code}";`
			let response = await this.database.query(query)
			sale.soldItems = response.data.map(adaptSoldItem)

			query =
				'select discount_type as type, percentage ' +
				'from sale_discount ' +
				`where sale_code = "${sale.code}";`
			response = await this.database.query(query)
			sale.discounts = response.data.map(adaptSaleDiscount)
			sales.push(sale)
		}
		return sales
	}

	async add(sale: Sale): Promise<Sale> {
		const transactionQueries: string[] = []

		if (sale.code === '') sale.code = await this.generateCode()
		const byCredit = sale.byCredit ? 'true' : 'false'
		const withIva = sale.withIva ? 'true' : 'false'
		const voucherCode =
			sale.voucherCode === null ? 'null' : `"${sale.voucherCode}"`
		const saleDate = fromDateToMysqlStringDate(sale.saleDate)
		const clientId = sale.clientId !== null ? sale.clientId : 'null'

		let query =
			'insert into sale (code, by_credit, with_iva, sale_date, voucher_code, client_id) ' +
			`values ("${sale.code}", ${byCredit}, ${withIva}, "${saleDate}", ${voucherCode}, ${clientId});`

		transactionQueries.push(query)

		for (const item of sale.soldItems) {
			query =
				'insert into sale_detail (sale_code, sold_item_code, quantity) ' +
				`values ("${sale.code}", "${item.code}", ${item.quantity});`
			transactionQueries.push(query)
		}
		for (const discount of sale.discounts) {
			query =
				'insert into sale_discount (sale_code, discount_type, percentage) ' +
				`values ("${sale.code}", "${discount.type}", ${discount.percentage});`
			transactionQueries.push(query)
		}
		await this.database.executeTransaction(transactionQueries)

		return (await this.findByCode(sale.code)) as Sale
	}

	async findByCode(saleCode: string): Promise<Sale | null> {
		let query = `call get_sale("${saleCode}");`
		let response = await this.database.call(`get_sale("${saleCode}")`)
		if (response.data.length === 0) return null

		const sale = adaptSale(response.data[0])
		query =
			'select sold_item_code as code, ' +
			'item_description as description, ' +
			'item_price as price, quantity ' +
			'from sale_detail ' +
			`where sale_code = "${saleCode}";`
		response = await this.database.query(query)
		sale.soldItems = response.data.map(adaptSoldItem)

		query =
			'select discount_type as type, percentage ' +
			'from sale_discount ' +
			`where sale_code = "${sale.code}";`
		response = await this.database.query(query)
		sale.discounts = response.data.map(adaptSaleDiscount)
		return sale
	}

	private async generateCode(): Promise<string> {
		const { data } = await this.database.query('select s.code from sale s;')
		const codes: number[] = data.map((item) => parseInt(item.code))
		return codes.length !== 0 ? `${Math.max(...codes) + 1}` : '1001'
	}
}
