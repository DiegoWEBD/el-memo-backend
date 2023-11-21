export class Item {
	code: string
	description: string
	price: number

	constructor(code: string, description: string, price: number) {
		this.code = code
		this.description = description
		this.price = price
	}
}
