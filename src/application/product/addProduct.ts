import {
	type ItemRepository,
	Product,
	type ProductRepository,
	Item,
} from '../../domain'
import { CustomError } from '../../errors'

export const makeAddProduct = (
	productRepository: ProductRepository,
	itemRepository: ItemRepository
) => {
	return async (
		code: string,
		description: string,
		price: number,
		buyPrice: number,
		stock: number
	): Promise<Product> => {
		if (code === '') code = await itemRepository.generateCode()
		else if ((await itemRepository.findByCode(code)) != null) {
			throw new CustomError(409, `Ya existe un item con el código ${code}`)
		}
		const product = new Product(code, description, price, buyPrice, stock)
		const item = new Item(code, description, price)
		await itemRepository.add(item)
		await productRepository.add(product)
		return product
	}
}
