import { CustomError } from '../errors'
import { type HttpError } from './types'

export const makeHttpError = (error: Error | CustomError): HttpError => {
	const httpError = {
		statusCode: 500,
		errorMessage: 'Internal server error',
	}

	if (error instanceof CustomError) {
		httpError.statusCode = error.getCode()
		httpError.errorMessage = error.getMessage()
	}

	return httpError
}
