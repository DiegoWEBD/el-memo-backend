import { Credit, Sale, type SaleDiscount, type SoldItem } from '../../domain'

export interface SaleJSON {
	code: string
	subtotal: number
	discount_applied: number
	total: number
	utility: number
	sale_date: Date
	client_id: number | null
	client_name: string | null
	by_credit: boolean
	with_iva: boolean
	voucher_code: string | null
	completed: boolean
	sold_items: SoldItem[]
	discounts: SaleDiscount[]
	credits: Credit[]
}

export const adaptSoldItem = (soldItem: any): SoldItem => ({
	code: soldItem.code,
	description: soldItem.description ?? null,
	quantity: soldItem.quantity,
	price: soldItem.price ?? null,
})

export const adaptSaleDiscount = (saleDiscount: any): SaleDiscount => ({
	type: saleDiscount.type,
	percentage: parseFloat(saleDiscount.percentage),
})

export const adaptSale = (sale: any): Sale =>
	new Sale(
		sale.code,
		sale.subtotal,
		Number(sale.discount_applied),
		Number(sale.total),
		Number(sale.utility),
		sale.sale_date,
		sale.client_id,
		sale.client_name,
		sale.by_credit,
		sale.with_iva,
		sale.voucher_code,
		sale.completed
	)

export const adaptSaleToJSON = (sale: Sale): SaleJSON => ({
	code: sale.code,
	subtotal: sale.subtotal,
	discount_applied: sale.discountApplied,
	total: sale.total,
	utility: sale.utility,
	sale_date: sale.saleDate,
	client_id: sale.clientId,
	client_name: sale.clientName,
	by_credit: Boolean(sale.byCredit),
	with_iva: Boolean(sale.withIva),
	voucher_code: sale.voucherCode,
	completed: Boolean(sale.completed) ?? false,
	sold_items: sale.soldItems,
	discounts: sale.discounts,
	credits: sale.credits,
})
