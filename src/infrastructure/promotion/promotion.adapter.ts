import { Promotion, type PromotionProduct } from '../../domain'

export const adaptPromotion = (promotion: any): Promotion =>
	new Promotion(promotion.code, promotion.description, promotion.price)

export const adaptPromotionProduct = (
	promotionProduct: any
): PromotionProduct => ({
	productCode: promotionProduct.product_code,
	quantity: promotionProduct.quantity,
})
