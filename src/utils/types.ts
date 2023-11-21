export interface HttpResponse {
	headers: any
	statusCode: number
	data: any
}

export interface HttpError {
	statusCode: number
	errorMessage: string
}

interface NewPromotionProducts {
	productCode: string
	quantity: number
}

export interface NewPromotion {
	code: string
	description: string
	price: number
	utility: number
	products: NewPromotionProducts[]
}

interface NewSaleSoldItem {
	code: string
	type: 'product' | 'promotion'
	description: string
	quantity: number
	unitaryPrice: number
	unitaryUtility: number
}

export interface NewSale {
	total: number
	utility: number
	voucherCode: string | null
	soldItems: NewSaleSoldItem[]
	withIva: boolean
	date: Date
	clientId: number | null
	isClientBirthday: boolean
	completed: boolean
	byCredit: boolean
}

export interface NewClient {
	name: string
	discount: number
	birthDate: string
	registeredAt: string
}
