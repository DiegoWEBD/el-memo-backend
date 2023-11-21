import { Item } from '../item'

export interface PromotionProduct {
	productCode: string
	quantity: number
}

export class Promotion extends Item {
	products: PromotionProduct[]

	constructor(
		code: string,
		description: string,
		price: number,
		products: PromotionProduct[] = []
	) {
		super(code, description, price)
		this.products = products
	}
}
