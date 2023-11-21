import { type PromotionRepository } from '../../domain'
import { CustomError } from '../../errors'

export const makeDeletePromotion = (
	promotionRepository: PromotionRepository
) => {
	return async (promotionCode: string): Promise<void> => {
		const promotion = await promotionRepository.findByCode(promotionCode)

		if (promotion == null) {
			throw new CustomError(
				404,
				`La promoción ${promotionCode} no está registrada`
			)
		}
		await promotionRepository.remove(promotionCode)
	}
}
