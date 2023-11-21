import type { CreditRepository, Sale, SaleRepository } from '../../domain'
import { CustomError } from '../../errors'
import { adaptCredit } from '../../infrastructure'

export const makeGetSaleData = (
	saleRepository: SaleRepository,
	creditRepository: CreditRepository
) => {
	return async (saleCode: string): Promise<Sale> => {
		const sale = await saleRepository.findByCode(saleCode)

		if (sale === null)
			throw new CustomError(404, `La venta ${saleCode} no está registrada.`)

		const saleCredits = await creditRepository.getCreditsOfSale(sale.code)
		sale.credits = saleCredits.map(adaptCredit)
		return sale
	}
}
