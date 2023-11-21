import { type Promotion, type PromotionRepository } from '../../domain'

export const makeGetPromotions = (promotionRepository: PromotionRepository) => {
	return async (): Promise<Promotion[]> => await promotionRepository.getAll()
}
