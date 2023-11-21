import { CustomError } from './customError'

export class FieldRequiredError extends CustomError {
	constructor(field: string) {
		super(400, `Campo "${field}" requerido`)

		Object.setPrototypeOf(this, FieldRequiredError.prototype)
	}
}
