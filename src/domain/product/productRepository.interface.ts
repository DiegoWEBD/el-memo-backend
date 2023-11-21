import { type Product } from './product'

export interface ProductRepository {
	getAll: () => Promise<Product[]>
	add: (product: Product) => Promise<void>
	findByCode: (code: string) => Promise<Product | null>
	update: (productCode: string, newValues: Product) => Promise<void>
	remove: (productCode: string) => Promise<void>
}
