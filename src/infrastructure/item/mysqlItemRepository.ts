import type { Item, ItemRepository } from '../../domain'
import { type Database } from '../database'

export class MysqlItemRepository implements ItemRepository {
	database: Database

	constructor(database: Database) {
		this.database = database
	}

	async add(item: Item): Promise<void> {
		const query =
			'insert into item(code, description, price) ' +
			`values ("${item.code}", "${item.description}", ${item.price});`
		await this.database.query(query)
	}

	async update(itemCode: string, newValues: Item): Promise<void> {
		const query =
			'update item set ' +
			`code = "${newValues.code}", ` +
			`description = "${newValues.description}" ` +
			`price = "${newValues.price}" ` +
			`where code = "${itemCode}";`
		await this.database.query(query)
	}

	async findByCode(code: string): Promise<Item | null> {
		const query = `select * from item where code = "${code}";`
		const { data } = await this.database.query(query)
		const item = data[0]
		return item === undefined ? null : (item as Item)
	}

	async generateCode(): Promise<string> {
		const { data } = await this.database.query('select * from item;')
		const codes: string[] = data.map(item => item.code)
		const characters = '0123456789'
		let newCode: string
		const codeLength = 10

		do {
			newCode = ''
			for (let i = 0; i < codeLength; i++) {
				const randomIndex = Math.floor(Math.random() * characters.length)
				newCode += characters.charAt(randomIndex)
			}
		} while (codes.includes(newCode))

		return newCode
	}
}
