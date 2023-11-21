export class CustomError extends Error {
	code: number

	constructor(code: number, message: string) {
		super(message)
		this.code = code

		// Set the prototype explicitly
		Object.setPrototypeOf(this, CustomError.prototype)
	}

	getCode = (): number => this.code
	getMessage = (): string => this.message
}
