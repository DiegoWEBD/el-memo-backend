import type { NewCredit, Credit } from './credit'

export interface CreditRepository {
	getAll: () => Promise<Credit[]>
	addCredit: (newCredit: NewCredit) => Promise<Credit>
	getCreditsOfSale: (saleCode: string) => Promise<Credit[]>
}
