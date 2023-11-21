import type {
	SaleRepository,
	ItemRepository,
	ProductRepository,
	PromotionRepository,
	ClientRepository,
	CreditRepository,
} from '../domain'
import { type ClientServices } from './client'
import { type CreditServices } from './credit'
import { type ProductServices } from './product'
import { type PromotionServices } from './promotion'
import { type SaleServices } from './sale'

export interface ApplicationDependencies {
	productRepository: ProductRepository
	promotionRepository: PromotionRepository
	itemRepository: ItemRepository
	saleRepository: SaleRepository
	clientRepository: ClientRepository
	creditRepository: CreditRepository
}

export interface PosSystemApplication {
	productServices: ProductServices
	promotionServices: PromotionServices
	saleServices: SaleServices
	clientServices: ClientServices
	creditServices: CreditServices
}
