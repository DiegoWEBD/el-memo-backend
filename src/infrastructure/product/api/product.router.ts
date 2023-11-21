import { Router } from 'express'
import { type PosSystemApplication } from '../../../application'
import { createController } from '../../api'
import { createProductRequestHandler } from './product.requestHandler'

export const createProductRouter = (
	posSystemApp: PosSystemApplication
): Router => {
	const router = Router()
	const requestHandler = createProductRequestHandler(
		posSystemApp.productServices
	)
	const productController = createController(requestHandler)

	router.all('/', productController)
	router.all('/:code', productController)

	return router
}
