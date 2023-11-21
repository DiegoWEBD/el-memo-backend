import {
	type Item,
	type ItemRepository,
	type Product,
	type ProductRepository,
} from '../../domain'
import { CustomError } from '../../errors'

export const makeUpdateProduct = (
	productRepository: ProductRepository,
	itemRepository: ItemRepository
) => {
	return async (productCode: string, newValues: Product): Promise<Product> => {
		if ((await productRepository.findByCode(productCode)) === null) {
			throw new CustomError(
				404,
				`El producto ${productCode} no está registrado`
			)
		}

		if (
			productCode !== newValues.code &&
			(await itemRepository.findByCode(newValues.code)) !== null
		) {
			throw new CustomError(
				409,
				`Ya existe un item con código ${newValues.code}`
			)
		}

		if (newValues.code === '') {
			newValues.code = await itemRepository.generateCode()
		}

		const item = newValues as Item
		await itemRepository.update(productCode, item)
		await productRepository.update(item.code, newValues)
		return newValues
	}
}
