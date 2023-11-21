import { CustomError } from '../errors'

/* Receives a date object and returns a string that represents
   the given date with the format YYYY-MM-DD HH:mm:ss, which
   is the correct format to insert a date into a mysql database. */
export const fromDateToMysqlStringDate = (date: Date): string => {
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	const hours = date.getHours()
	const minutes = date.getMinutes()
	const seconds = date.getSeconds()
	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

export const validateDate = (date: string): void => {
	const parts = date.split('/')

	if (parts.length !== 3) {
		throw new CustomError(400, 'Fecha inválida')
	}
	const [day, month, year] = parts
	const stringNormalized = `${year}/${month}/${day}`

	if (isNaN(Date.parse(stringNormalized))) {
		throw new CustomError(400, 'Fecha inválida')
	}
}

/* Receives a string date with format dd/mm/yyyy already validated
   and returns a date object */
export const makeDate = (date: string): Date => {
	const [day, month, year] = date.split('/')
	return new Date(`${year}/${month}/${day}`)
}
