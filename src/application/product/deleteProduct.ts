import { type ProductRepository } from '../../domain'
import { CustomError } from '../../errors'

export const makeDeleteProduct = (productRepository: ProductRepository) => {
	return async (productCode: string): Promise<void> => {
		const product = await productRepository.findByCode(productCode)

		if (product == null) {
			throw new CustomError(
				404,
				`El producto ${productCode} no está registrado`
			)
		}
		await productRepository.remove(productCode)
	}
}
