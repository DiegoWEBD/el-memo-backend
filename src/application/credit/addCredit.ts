import { NewCredit, type Credit, type CreditRepository } from '../../domain'
import { CustomError } from '../../errors'

export const makeAddCredit = (creditRepository: CreditRepository) => {
	return async (
		saleCode: string,
		amount: number,
		paymentDate: Date,
		voucherCode: string | null
	): Promise<Credit> => {
		const newCredit = new NewCredit(saleCode, amount, paymentDate, voucherCode)
		try {
			return await creditRepository.addCredit(newCredit)
		} catch (error: any) {
			throw new CustomError(400, error.message)
		}
	}
}
