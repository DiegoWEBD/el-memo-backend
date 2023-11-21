import { type Request } from 'express'
import { type ClientServices } from '../../../application'
import { makeHttpResponse, type HttpResponse } from '../../../utils'
import { CustomError } from '../../../errors'

export const createClientRequestHandler = (clientServices: ClientServices) => {
	return async (request: Request): Promise<HttpResponse> => {
		switch (request.method) {
			case 'GET': {
				const clients = await clientServices.getClients()
				return makeHttpResponse(200, clients)
			}
			case 'POST': {
				const newClient = request.body
				const client = await clientServices.addClient(
					newClient.name,
					newClient.special_discount,
					new Date(newClient.birth_date),
					new Date(newClient.registration_date),
					newClient.phones
				)
				return makeHttpResponse(201, client)
			}

			default: {
				throw new CustomError(405, `Método ${request.method} no permitido`)
			}
		}
	}
}
