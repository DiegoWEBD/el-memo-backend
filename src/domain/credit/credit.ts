export class NewCredit {
	saleCode: string
	amount: number
	paymentDate: Date
	voucherCode: string | null

	constructor(
		saleCode: string,
		amount: number,
		paymentDate: Date,
		voucherCode: string | null
	) {
		this.saleCode = saleCode
		this.amount = amount
		this.paymentDate = paymentDate
		this.voucherCode = voucherCode
	}
}

export class Credit {
	id: number | null
	saleCode: string
	amount: number
	paymentDate: Date
	voucherCode: string | null
	utility: number | null

	constructor(
		id: number | null,
		saleCode: string,
		amount: number,
		paymentDate: Date,
		voucherCode: string | null,
		utility: number | null = null
	) {
		this.id = id
		this.saleCode = saleCode
		this.amount = amount
		this.paymentDate = paymentDate
		this.voucherCode = voucherCode
		this.utility = utility
	}
}
