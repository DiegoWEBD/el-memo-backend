import { Product } from '../../domain'

export const adaptProduct = (product: any): Product =>
	new Product(
		product.code,
		product.description,
		product.price,
		product.buy_price,
		product.stock
	)
