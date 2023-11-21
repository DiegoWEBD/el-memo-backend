import { Router } from 'express'
import { type PosSystemApplication } from '../../../application'
import { createController } from '../../api'
import { createClientRequestHandler } from './client.requestHandler'

export const createClientRouter = (
	posSystemApp: PosSystemApplication
): Router => {
	const router = Router()
	const requestHandler = createClientRequestHandler(posSystemApp.clientServices)
	const clientController = createController(requestHandler)

	router.all('/', clientController)
	router.all('/:code', clientController)

	return router
}
