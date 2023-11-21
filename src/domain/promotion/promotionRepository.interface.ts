import { type Promotion } from './promotion'

export interface PromotionRepository {
	getAll: () => Promise<Promotion[]>
	add: (promotion: Promotion) => Promise<void>
	update: (promotionCode: string, newValues: Promotion) => Promise<void>
	findByCode: (code: string) => Promise<Promotion | null>
	remove: (promotionCode: string) => Promise<void>
}
