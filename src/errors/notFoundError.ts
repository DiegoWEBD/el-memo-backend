import { CustomError } from './customError'

export class NotFoundError extends CustomError {
	constructor(message: string) {
		super(404, message)

		Object.setPrototypeOf(this, NotFoundError.prototype)
	}
}
