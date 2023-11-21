import {
	type ItemRepository,
	type Product,
	type ProductRepository,
} from '../../domain'
import { makeAddProduct } from './addProduct'
import { makeDeleteProduct } from './deleteProduct'
import { makeGetProducts } from './getProducts'
import { makeUpdateProduct } from './updateProduct'

export interface ProductServices {
	getProducts: () => Promise<Product[]>
	addProduct: (
		code: string,
		description: string,
		price: number,
		buyPrice: number,
		stock: number
	) => Promise<Product>
	updateProduct: (productCode: string, newValues: Product) => Promise<Product>
	deleteProduct: (productCode: string) => Promise<void>
}

export const makeProductServices = (
	productRepository: ProductRepository,
	itemRepository: ItemRepository
): ProductServices => {
	return Object.freeze({
		getProducts: makeGetProducts(productRepository),
		addProduct: makeAddProduct(productRepository, itemRepository),
		updateProduct: makeUpdateProduct(productRepository, itemRepository),
		deleteProduct: makeDeleteProduct(productRepository),
	})
}
