import { Router } from 'express'
import { type PosSystemApplication } from '../../../application'
import { createCreditRequestHandler } from './credit.requestHandler'
import { createController } from '../../api'

export const createCreditRouter = (
	posSystemApplication: PosSystemApplication
): Router => {
	const router = Router()
	const requestHandler = createCreditRequestHandler(
		posSystemApplication.creditServices
	)
	const creditController = createController(requestHandler)

	router.all('/', creditController)
	return router
}
