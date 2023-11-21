import { Router } from 'express'
import type { PosSystemApplication } from '../../../application'
import { createSaleRequestHandler } from './sale.requestHandler'
import { createController } from '../../api'

export const createSaleRouter = (
	posSystemApp: PosSystemApplication
): Router => {
	const router = Router()
	const requestHandler = createSaleRequestHandler(posSystemApp.saleServices)
	const saleController = createController(requestHandler)

	router.all('/', saleController)
	router.all('/:code', saleController)

	return router
}
