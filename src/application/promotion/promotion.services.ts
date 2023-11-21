import type {
	ItemRepository,
	Promotion,
	PromotionProduct,
	PromotionRepository,
} from '../../domain'
import { makeAddPromotion } from './addPromotion'
import { makeDeletePromotion } from './deletePromotion'
import { makeGetPromotions } from './getPromotions'
import { makeUpdatePromotion } from './updatePromotion'

export interface PromotionServices {
	getPromotions: () => Promise<Promotion[]>
	addPromotion: (
		code: string,
		description: string,
		price: number,
		products: PromotionProduct[]
	) => Promise<Promotion>
	updatePromotion: (
		promotionCode: string,
		newValues: Promotion
	) => Promise<Promotion>
	deletePromotion: (promotionCode: string) => Promise<void>
}

export const makePromotionServices = (
	promotionRepository: PromotionRepository,
	itemRepository: ItemRepository
): PromotionServices => {
	return Object.freeze({
		getPromotions: makeGetPromotions(promotionRepository),
		addPromotion: makeAddPromotion(promotionRepository, itemRepository),
		updatePromotion: makeUpdatePromotion(promotionRepository, itemRepository),
		deletePromotion: makeDeletePromotion(promotionRepository),
	})
}
