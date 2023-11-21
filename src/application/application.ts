import type {
	ApplicationDependencies,
	PosSystemApplication,
} from './application.interface'
import { makeClientServices, type ClientServices } from './client'
import { makeCreditServices, type CreditServices } from './credit'
import { type ProductServices, makeProductServices } from './product'
import { makePromotionServices, type PromotionServices } from './promotion'
import { makeSaleServices, type SaleServices } from './sale'

export class Application implements PosSystemApplication {
	productServices: ProductServices
	promotionServices: PromotionServices
	saleServices: SaleServices
	clientServices: ClientServices
	creditServices: CreditServices

	constructor(dependencies: ApplicationDependencies) {
		this.productServices = makeProductServices(
			dependencies.productRepository,
			dependencies.itemRepository
		)
		this.promotionServices = makePromotionServices(
			dependencies.promotionRepository,
			dependencies.itemRepository
		)
		this.saleServices = makeSaleServices(
			dependencies.saleRepository,
			dependencies.clientRepository,
			dependencies.creditRepository
		)
		this.clientServices = makeClientServices(dependencies.clientRepository)
		this.creditServices = makeCreditServices(dependencies.creditRepository)
	}
}
