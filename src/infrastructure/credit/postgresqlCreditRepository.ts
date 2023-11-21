import { Credit, CreditRepository, NewCredit } from '../../domain'
import { Database } from '../database'
import { adaptCredit } from './credit.adapter'

export class PostgresqlCreditRepository implements CreditRepository {
	database: Database

	constructor(database: Database) {
		this.database = database
	}

	async getAll(): Promise<Credit[]> {
		const { data } = await this.database.query(
			'select * from get_all_credits();'
		)
		return data.map(adaptCredit)
	}

	async addCredit(newCredit: NewCredit): Promise<Credit> {
		console.log(newCredit)
		throw new Error('Method not implemented.')
	}

	async getCreditsOfSale(saleCode: string): Promise<Credit[]> {
		const { data } = await this.database.query(
			`select * from get_sale_credits('${saleCode}');`
		)
		return data.map(adaptCredit)
	}
}
