import type { CreditRepository, Sale, SaleRepository } from '../../domain'
import { adaptCredit } from '../../infrastructure'

export const makeGetSales = (
	saleRepository: SaleRepository,
	creditRepository: CreditRepository
) => {
	return async (): Promise<Sale[]> => {
		const sales = await saleRepository.getAll()

		for (const sale of sales) {
			const saleCredits = await creditRepository.getCreditsOfSale(
				sale.code
			)
			sale.credits = saleCredits.map(adaptCredit)
		}
		return sales
	}
}
