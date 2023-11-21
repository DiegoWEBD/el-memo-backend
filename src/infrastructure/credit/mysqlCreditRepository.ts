import type { Credit, CreditRepository, NewCredit } from '../../domain'
import { adaptCredit } from './credit.adapter'
import { fromDateToMysqlStringDate } from '../../utils'
import { type Database } from '../database'

export class MysqlCreditRepository implements CreditRepository {
	database: Database

	constructor(database: Database) {
		this.database = database
	}

	async getAll(): Promise<Credit[]> {
		const { data } = await this.database.call('get_all_credits()')
		return data.map(adaptCredit)
	}

	async addCredit(newCredit: NewCredit): Promise<Credit> {
		const voucherCode = newCredit.voucherCode ?? 'null'
		const paymentDate = fromDateToMysqlStringDate(newCredit.paymentDate)
		const query =
			'insert into credit (sale_code, amount, payment_date, voucher_code) ' +
			`values ("${newCredit.saleCode}", ${newCredit.amount}, "${paymentDate}", ${voucherCode});`

		await this.database.query(query)
		const saleCredits = await this.getCreditsOfSale(newCredit.saleCode)
		return saleCredits[saleCredits.length - 1]
	}

	async getCreditsOfSale(saleCode: string): Promise<Credit[]> {
		console.log(saleCode)
		// const { data } = await this.database.call(`get_sale_credits("${saleCode}")`)
		return []
	}
}
