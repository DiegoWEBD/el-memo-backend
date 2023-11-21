import type {
	ClientRepository,
	CreditRepository,
	Sale,
	SaleDiscount,
	SaleRepository,
	SoldItem,
} from '../../domain'
import { makeAddSale } from './addSale'
import { makeGetSaleData } from './getSaleData'
import { makeGetSales } from './getSales'

export interface SaleServices {
	getSales: () => Promise<Sale[]>
	getSaleData: (saleCode: string) => Promise<Sale>
	addSale: (
		code: string,
		byCredit: boolean,
		withIva: boolean,
		date: Date,
		voucherCode: string | null,
		clientId: number | null,
		items: SoldItem[],
		discounts: SaleDiscount[] | null
	) => Promise<Sale>
}

export const makeSaleServices = (
	saleRepository: SaleRepository,
	clientRepository: ClientRepository,
	creditRepository: CreditRepository
): SaleServices => {
	return Object.freeze({
		getSales: makeGetSales(saleRepository, creditRepository),
		getSaleData: makeGetSaleData(saleRepository, creditRepository),
		addSale: makeAddSale(saleRepository, clientRepository),
	})
}
