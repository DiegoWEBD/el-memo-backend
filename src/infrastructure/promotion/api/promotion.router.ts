import { Router } from 'express'
import { type PosSystemApplication } from '../../../application'
import { createController } from '../../api'
import { createPromotionRequestHandler } from './promotion.requestHandler'

export const createPromotionRouter = (
	posSystemApp: PosSystemApplication
): Router => {
	const router = Router()
	const requestHandler = createPromotionRequestHandler(
		posSystemApp.promotionServices
	)
	const promotionController = createController(requestHandler)

	router.all('/', promotionController)
	router.all('/:code', promotionController)
	return router
}
