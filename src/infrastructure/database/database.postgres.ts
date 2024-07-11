import pgPromise, { IDatabase, IMain } from 'pg-promise'
import { CustomError, DatabaseNotConnectedError } from '../../errors'
import { Database } from './database'

interface DatabaseResponse {
	data: any[]
}

const pgp: IMain = pgPromise()

export class PgDatabase implements Database {
	private connection!: IDatabase<any>
	private isConnected: boolean = false

	async connect(): Promise<void> {
		console.log('Connecting to database...')
		this.connection = pgp({
			host: process.env.DB_HOST,
			port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
			database: process.env.DB_NAME,
			user: process.env.DB_USERNAME,
			password: process.env.DB_PASSWORD,
		})
		this.isConnected = true
		console.log('Connected to database')
	}

	async query(query: string): Promise<DatabaseResponse> {
		if (!this.isConnected) throw new DatabaseNotConnectedError()
		let result: any[]
		try {
			result = await this.connection.any(query)
		} catch (error: any) {
			throw new CustomError(400, error.message)
		}
		return { data: result }
	}

	async call(procedureCall: string): Promise<DatabaseResponse> {
		throw new Error(`Method not implemented. ${procedureCall}`)
	}
	async executeTransaction(queries: string[]): Promise<void> {
		try {
			await this.connection.tx(async (t) => {
				for (const query of queries) {
					await t.query(query)
				}
			})
		} catch (error: any) {
			throw new CustomError(400, error.message)
		}
	}
	async disconnect(): Promise<void> {
		throw new Error('Method not implemented.')
	}
}
