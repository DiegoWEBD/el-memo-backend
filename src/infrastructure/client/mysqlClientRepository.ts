import type { Client, ClientRepository } from '../../domain'
import { adaptClient } from './client.adapter'
import { fromDateToMysqlStringDate } from '../../utils'
import { type Database } from '../database'

export class MysqlClientRepository implements ClientRepository {
	database: Database

	constructor(database: Database) {
		this.database = database
	}

	async getAll(): Promise<Client[]> {
		let query = 'select * from client;'
		let response = await this.database.query(query)
		const clients = response.data.map(adaptClient)

		for (const client of clients) {
			query =
				'select phone_number from client_phone ' +
				`where client_id = ${client.id as number};`
			response = await this.database.query(query)
			client.phones = response.data.map(row => row.phone_number)
		}
		return clients
	}

	async add(client: Client): Promise<Client> {
		const birthDate = fromDateToMysqlStringDate(client.birthDate)
		const registrationDate = fromDateToMysqlStringDate(client.registrationDate)
		let phones = ''

		for (let i = 0; i < client.phones.length; ++i) {
			phones += client.phones[i]
			if (i !== client.phones.length - 1) phones += ','
		}

		let query = `insert_client("${client.name}", "${birthDate}", ${client.specialDiscount}, "${registrationDate}", "${phones}")`
		await this.database.call(query)
		query = 'select max(id) as new_client_id from client;'
		const { data } = await this.database.query(query)
		client.id = data[0].new_client_id
		return client
	}

	async findById(clientId: number): Promise<Client | null> {
		let query = `select * from client where id = ${clientId};`
		let response = await this.database.query(query)

		if (response.data[0] === undefined) return null
		const client = adaptClient(response.data[0])
		query =
			'select phone_number from client_phone ' +
			`where client_id = ${client.id as number};`
		response = await this.database.query(query)
		client.phones = response.data.map(row => row.phone_number)
		return client
	}

	async remove(clientId: number): Promise<void> {
		const query = `delete from client where id = ${clientId};`
		await this.database.query(query)
	}
}
