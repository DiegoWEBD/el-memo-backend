import { type HttpResponse } from './types'

export const makeHttpResponse = (
	statusCode: number,
	data: any
): HttpResponse => {
	const headers = {
		'Content-Type': 'application/json',
	}
	return { headers, statusCode, data: JSON.stringify(data) }
}
