import { type Product, type ProductRepository } from '../../domain'

export const makeGetProducts = (productRepository: ProductRepository) => {
	return async (): Promise<Product[]> => await productRepository.getAll()
}
