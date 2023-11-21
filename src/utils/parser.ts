import { CustomError } from '../errors'

export const parseInteger = (num: any, key: string): number => {
	if (num == null) throw new CustomError(400, `${key} requerido`)
	if (typeof num === 'number') return num
	const parsed = parseInt(num)

	if (isNaN(parsed))
		throw new CustomError(400, `${key} inválido, debe ser un número`)

	if (parsed.toString().length !== num.toString().length)
		throw new CustomError(400, `${key} inválido, debe ser un número`)

	return parsed
}
