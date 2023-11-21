import { Item } from '../item'

export class Product extends Item {
	buyPrice: number
	stock: number

	constructor(
		code: string,
		description: string,
		price: number,
		buyPrice: number,
		stock: number
	) {
		super(code, description, price)
		this.buyPrice = buyPrice
		this.stock = stock
	}
}
