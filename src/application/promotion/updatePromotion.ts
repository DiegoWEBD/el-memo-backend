import {
	type Item,
	type ItemRepository,
	type Promotion,
	type PromotionRepository,
} from '../../domain'
import { CustomError } from '../../errors'

export const makeUpdatePromotion = (
	promotionRepository: PromotionRepository,
	itemRepository: ItemRepository
) => {
	return async (
		promotionCode: string,
		newValues: Promotion
	): Promise<Promotion> => {
		if ((await promotionRepository.findByCode(promotionCode)) === null) {
			throw new CustomError(
				404,
				`La promoción ${promotionCode} no está registrada`
			)
		}
		if (
			promotionCode !== newValues.code &&
			(await itemRepository.findByCode(newValues.code)) !== null
		) {
			throw new CustomError(
				409,
				`Ya existe un item con código ${newValues.code}`
			)
		}
		if (newValues.code === '') {
			newValues.code = await itemRepository.generateCode()
		}
		const item = newValues as Item
		await itemRepository.update(promotionCode, item)
		await promotionRepository.update(item.code, newValues)
		return newValues
	}
}
