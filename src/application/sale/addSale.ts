import {
	type ClientRepository,
	Sale,
	type SaleRepository,
	type SoldItem,
	type SaleDiscount,
} from '../../domain'
import { CustomError } from '../../errors'

export const makeAddSale = (
	saleRepository: SaleRepository,
	clientRepository: ClientRepository
) => {
	return async (
		code: string,
		byCredit: boolean,
		withIva: boolean,
		date: Date,
		voucherCode: string | null,
		clientId: number | null,
		items: SoldItem[],
		discounts: SaleDiscount[] | null
	): Promise<Sale> => {
		if (
			clientId !== null &&
			(await clientRepository.findById(clientId)) === null
		) {
			throw new CustomError(
				404,
				`El cliente ID:${clientId} no está registrado`
			)
		}
		const saleDiscounts = discounts ?? []

		const newSale = new Sale(
			code,
			0,
			0,
			0,
			0,
			date,
			clientId,
			null,
			byCredit,
			withIva,
			voucherCode,
			null,
			items,
			[],
			saleDiscounts
		)

		return await saleRepository.add(newSale)
	}
}
