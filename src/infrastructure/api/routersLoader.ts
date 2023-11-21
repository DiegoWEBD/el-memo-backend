import { type Express } from 'express'
import { type PosSystemApplication } from '../../application'
import { createProductRouter } from '../product'
import { createPromotionRouter } from '../promotion'
import { createSaleRouter } from '../sale'
import { createClientRouter } from '../client'
import { createCreditRouter } from '../credit'

export const loadRouters = (
	api: Express,
	portfolioApp: PosSystemApplication
): void => {
	api.get('/', (_, res) => res.send('Api OK!'))
	api.use('/products', createProductRouter(portfolioApp))
	api.use('/promotions', createPromotionRouter(portfolioApp))
	api.use('/sales', createSaleRouter(portfolioApp))
	api.use('/clients', createClientRouter(portfolioApp))
	api.use('/credits', createCreditRouter(portfolioApp))
	// api.use('/employees', createEmployeeRouter(portfolioApp))
}
