import { type Request } from 'express'
import type { SaleServices } from '../../../application'
import { makeHttpResponse, type HttpResponse } from '../../../utils'
import {
	adaptSaleDiscount,
	adaptSaleToJSON,
	adaptSoldItem,
} from '../sale.adapter'
import { CustomError } from '../../../errors'

export const createSaleRequestHandler = (saleServices: SaleServices) => {
	return async (request: Request): Promise<HttpResponse> => {
		switch (request.method) {
			case 'GET': {
				if (request.params.code !== undefined) {
					const sale = await saleServices.getSaleData(
						request.params.code
					)
					return makeHttpResponse(200, adaptSaleToJSON(sale))
				}
				const sales = await saleServices.getSales()
				return makeHttpResponse(200, sales.map(adaptSaleToJSON))
			}
			case 'POST': {
				const newSale = request.body
				newSale.items = newSale.items.map(adaptSoldItem)
				newSale.discounts =
					newSale.discounts !== undefined
						? newSale.discounts.map(adaptSaleDiscount)
						: null

				const sale = await saleServices.addSale(
					newSale.code,
					newSale.by_credit,
					newSale.with_iva,
					new Date(newSale.date),
					newSale.voucher_code,
					newSale.client_id,
					newSale.items,
					newSale.discounts
				)
				return makeHttpResponse(201, adaptSaleToJSON(sale))
			}

			default: {
				throw new CustomError(
					405,
					`Método ${request.method} no permitido`
				)
			}
		}
	}
}
