import type { CreditRepository, Credit } from '../../domain'
import { makeAddCredit } from './addCredit'
import { makeGetCredits } from './getCredits'

export interface CreditServices {
	getCredits: () => Promise<Credit[]>
	addCredit: (
		saleCode: string,
		amount: number,
		paymentDate: Date,
		voucherCode: string | null
	) => Promise<Credit>
}

export const makeCreditServices = (
	creditRepository: CreditRepository
): CreditServices =>
	Object.freeze({
		getCredits: makeGetCredits(creditRepository),
		addCredit: makeAddCredit(creditRepository),
	})
