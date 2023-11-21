import type { Sale } from './sale'

export interface SaleRepository {
	getAll: () => Promise<Sale[]>
	add: (sale: Sale) => Promise<Sale>
	findByCode: (saleCode: string) => Promise<Sale | null>
}
