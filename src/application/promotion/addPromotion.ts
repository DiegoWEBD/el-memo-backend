import {
	type ItemRepository,
	Promotion,
	type PromotionProduct,
	type PromotionRepository,
	type Item,
} from '../../domain'
import { CustomError } from '../../errors'

export const makeAddPromotion = (
	promotionRepository: PromotionRepository,
	itemRepository: ItemRepository
) => {
	return async (
		code: string,
		description: string,
		price: number,
		products: PromotionProduct[]
	): Promise<Promotion> => {
		if (code === '') code = await itemRepository.generateCode()
		else if ((await itemRepository.findByCode(code)) !== null) {
			throw new CustomError(409, `Ya existe un item con el código ${code}`)
		}

		const promotion = new Promotion(code, description, price, products)
		const item = promotion as Item
		await itemRepository.add(item)
		await promotionRepository.add(promotion)
		return promotion
	}
}
