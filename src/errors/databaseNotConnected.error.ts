import { CustomError } from './customError'

export class DatabaseNotConnectedError extends CustomError {
	constructor() {
		super(500, 'Database connection is closed.')
	}
}
