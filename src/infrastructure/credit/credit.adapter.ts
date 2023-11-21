import { Credit } from '../../domain'

interface CreditJSON {
	id: number
	sale_code: string
	amount: number
	payment_date: Date
	voucher_code: string | null
	utility: number
}

export const adaptCredit = (credit: any): Credit =>
	new Credit(
		credit.id ?? null,
		credit.sale_code,
		credit.amount,
		credit.payment_date,
		credit.voucher_code,
		credit.utility ?? null
	)

export const creditToJSON = (credit: Credit): CreditJSON => ({
	id: credit.id as number,
	sale_code: credit.saleCode,
	amount: credit.amount,
	payment_date: credit.paymentDate,
	voucher_code: credit.voucherCode,
	utility: credit.utility ?? 0,
})
