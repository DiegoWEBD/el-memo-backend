import { CustomError } from './customError'

export class InvalidTypeError extends CustomError {
	constructor(field: string, expectedType: string) {
		super(400, `Campo "${field}" inválido, debe ser un ${expectedType}`)

		Object.setPrototypeOf(this, InvalidTypeError.prototype)
	}
}
