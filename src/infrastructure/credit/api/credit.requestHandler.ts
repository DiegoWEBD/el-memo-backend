import { type Request } from 'express'
import { type HttpResponse } from '../../../utils/types'
import { type CreditServices } from '../../../application'
import { CustomError } from '../../../errors'
import { makeHttpResponse } from '../../../utils'

export const createCreditRequestHandler = (creditServices: CreditServices) => {
	return async (request: Request): Promise<HttpResponse> => {
		switch (request.method) {
			case 'GET': {
				const credits = await creditServices.getCredits()
				return makeHttpResponse(200, credits)
			}

			case 'POST': {
				const credit = request.body
				const newCredit = await creditServices.addCredit(
					credit.sale_code,
					credit.amount,
					new Date(credit.payment_date),
					credit.voucher_code
				)
				return makeHttpResponse(201, newCredit)
			}

			default: {
				throw new CustomError(405, `Método ${request.method} no permitido`)
			}
		}
	}
}
