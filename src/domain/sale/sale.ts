import { type Credit } from '../credit'

export interface SoldItem {
	code: string
	description: string | null
	quantity: number
	price: number | null
}

export interface SaleDiscount {
	type: 'client' | 'birthday' | 'additional'
	percentage: number
}

export class Sale {
	code: string
	subtotal: number
	discountApplied: number
	total: number
	utility: number
	saleDate: Date
	clientId: number | null
	clientName: string | null
	byCredit: boolean
	withIva: boolean
	voucherCode: string | null
	completed: boolean | null
	soldItems: SoldItem[]
	credits: Credit[]
	discounts: SaleDiscount[]

	constructor(
		code: string,
		subtotal: number,
		discountApplied: number,
		total: number,
		utility: number,
		saleDate: Date,
		clientId: number | null,
		clientName: string | null,
		byCredit: boolean,
		withIva: boolean,
		voucherCode: string | null,
		completed: boolean | null,
		soldItems: SoldItem[] = [],
		credits: Credit[] = [],
		discounts: SaleDiscount[] = []
	) {
		this.code = code
		this.subtotal = subtotal
		this.discountApplied = discountApplied
		this.total = total
		this.utility = utility
		this.saleDate = saleDate
		this.clientId = clientId
		this.clientName = clientName
		this.byCredit = byCredit
		this.withIva = withIva
		this.voucherCode = voucherCode
		this.soldItems = soldItems
		this.completed = completed
		this.credits = credits
		this.discounts = discounts
	}
}
