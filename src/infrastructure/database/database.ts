import mysql, { type Connection, type RowDataPacket } from 'mysql2/promise'
import { CustomError, DatabaseNotConnectedError } from '../../errors'

interface DatabaseResponse {
	data: any[]
}

export interface Database {
	connect(): Promise<void>
	query(query: string): Promise<DatabaseResponse>
	call(procedureCall: string): Promise<DatabaseResponse>
	executeTransaction(queries: string[]): Promise<void>
	disconnect(): Promise<void>
}

export class MysqlDatabase implements Database {
	private connection!: Connection
	private isConnected: boolean = false

	async connect(): Promise<void> {
		console.log('Connecting to database...')
		try {
			const dbConnection = await mysql.createConnection({
				host: 'localhost',
				user: 'root',
				password: 'Dgo951mz',
				database: 'vallepesca-database',
			})
			this.connection = dbConnection
			this.isConnected = true
			console.log('Connected to database')
		} catch {
			throw new CustomError(500, 'Unable to connect to database.')
		}
	}

	async query(query: string): Promise<DatabaseResponse> {
		if (!this.isConnected) throw new DatabaseNotConnectedError()
		let rows: any
		try {
			;[rows] = await this.connection.query(query)
		} catch (error: any) {
			throw new CustomError(400, error.message)
		}

		rows = rows as RowDataPacket[]
		return { data: rows }
	}

	async call(procedureCall: string): Promise<DatabaseResponse> {
		if (!this.isConnected) throw new DatabaseNotConnectedError()
		let rows: any
		try {
			;[rows] = await this.connection.query(`call ${procedureCall};`)
		} catch (error: any) {
			throw new CustomError(400, error.message)
		}

		rows = rows as RowDataPacket[]
		return { data: rows[0] }
	}

	async executeTransaction(queries: string[]): Promise<void> {
		await this.connection.beginTransaction()

		for (const query of queries) {
			try {
				await this.query(query)
			} catch (error: any) {
				await this.connection.rollback()
				throw new CustomError(400, error.message)
			}
		}
		await this.connection.commit()
	}

	async disconnect(): Promise<void> {
		if (!this.isConnected) throw new DatabaseNotConnectedError()
		await this.connection.end()
		this.isConnected = false
		console.log('Database disconnected.')
	}
}
