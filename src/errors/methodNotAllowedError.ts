import { CustomError } from './customError'

export class MethodNotAllowedError extends CustomError {
	constructor(method: string) {
		super(405, `Método ${method} no permitido`)
		Object.setPrototypeOf(this, MethodNotAllowedError.prototype)
	}
}
