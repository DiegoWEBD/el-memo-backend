import { type Request, type Response } from 'express'
import { type CustomError } from '../../errors'
import { type HttpResponse, makeHttpError } from '../../utils'

type RequestHandler = (req: Request) => Promise<HttpResponse>

export const createController = (handler: RequestHandler) => {
	return (req: Request, res: Response): void => {
		handler(req)
			.then((response: HttpResponse) => {
				res.set(response.headers)
					.status(response.statusCode)
					.send(response.data)
			})
			.catch((error: Error | CustomError) => {
				const httpError = makeHttpError(error)
				res.status(httpError.statusCode).send({
					message: httpError.errorMessage,
				})
			})
	}
}
