import { type Request } from 'express'
import { type PromotionServices } from '../../../application'
import { CustomError } from '../../../errors'
import { makeHttpResponse } from '../../../utils'
import { type HttpResponse } from '../../../utils/types'
import { adaptPromotion, adaptPromotionProduct } from '../promotion.adapter'

export const createPromotionRequestHandler = (
	promotionServices: PromotionServices
) => {
	return async (request: Request): Promise<HttpResponse> => {
		switch (request.method) {
			case 'GET': {
				const promotions = await promotionServices.getPromotions()
				return makeHttpResponse(200, promotions)
			}

			case 'POST': {
				const newPromotion = request.body
				const promotion = await promotionServices.addPromotion(
					newPromotion.code,
					newPromotion.description,
					newPromotion.price,
					newPromotion.products
				)
				return makeHttpResponse(201, promotion)
			}

			case 'PUT': {
				const promotionCode = request.params.code
				const newValues = adaptPromotion(request.body)
				newValues.products = request.body.products.map(adaptPromotionProduct)
				const updatedPromotion = await promotionServices.updatePromotion(
					promotionCode,
					newValues
				)
				return makeHttpResponse(200, updatedPromotion)
			}

			case 'DELETE': {
				const promotionCode = request.params.code
				await promotionServices.deletePromotion(promotionCode)
				return makeHttpResponse(200, {
					message: `Promoción ${promotionCode} eliminada correctamente`,
				})
			}

			default: {
				throw new CustomError(405, `Método ${request.method} no permitido`)
			}
		}
	}
}
