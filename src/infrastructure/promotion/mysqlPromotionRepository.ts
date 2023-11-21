import type { Promotion, PromotionRepository } from '../../domain'
import { adaptPromotion, adaptPromotionProduct } from './promotion.adapter'
import { type Database } from '../database'

export class MysqlPromotionRepository implements PromotionRepository {
	database: Database

	constructor(database: Database) {
		this.database = database
	}

	async getAll(): Promise<Promotion[]> {
		let query =
			'select p.code, i.description, i.price ' +
			'from promotion p inner join item i ' +
			'on p.code = i.code;'
		const { data } = await this.database.query(query)
		const promotions = data.map(adaptPromotion)

		for (const promo of promotions) {
			query =
				'select pp.product_code, pp.product_quantity as quantity ' +
				'from promotion_product pp ' +
				'inner join promotion p ' +
				'on pp.promotion_code = p.code ' +
				`where p.code = "${promo.code}";`
			const { data } = await this.database.query(query)
			promo.products = data.map(adaptPromotionProduct)
		}
		return promotions
	}

	async add(promotion: Promotion): Promise<void> {
		const transactionQueries: string[] = []

		let query = `insert into promotion(code) values ("${promotion.code}");`
		transactionQueries.push(query)

		for (const promotionProduct of promotion.products) {
			query =
				'insert into promotion_product (promotion_code, product_code, product_quantity) ' +
				`values ("${promotion.code}", "${promotionProduct.productCode}", ${promotionProduct.quantity});`
			transactionQueries.push(query)
		}
		await this.database.executeTransaction(transactionQueries)
	}

	async update(promotionCode: string, newValues: Promotion): Promise<void> {
		const transactionQueries: string[] = []

		let query = `delete from promotion_product where promotion_code = "${promotionCode}";`
		transactionQueries.push(query)

		for (const promotionProduct of newValues.products) {
			query =
				'insert into promotion_product (promotion_code, product_code, product_quantity) ' +
				`values ("${promotionCode}", "${promotionProduct.productCode}", ${promotionProduct.quantity});`
			transactionQueries.push(query)
		}
		await this.database.executeTransaction(transactionQueries)
	}

	async findByCode(code: string): Promise<Promotion | null> {
		let query =
			'select p.code, i.description, i.price ' +
			'from promotion p inner join item i ' +
			'on p.code = i.code ' +
			`where p.code = "${code}";`

		let { data } = await this.database.query(query)
		const item = data[0]

		if (item === undefined) return null

		const promotion = adaptPromotion(item)
		query =
			'select pp.product_code, pp.product_quantity as quantity ' +
			'from promotion_product pp ' +
			'inner join promotion p ' +
			'on pp.promotion_code = p.code ' +
			`where p.code = "${code}";`
		const response = await this.database.query(query)
		data = response.data
		promotion.products = data.map(adaptPromotionProduct)
		return promotion
	}

	async remove(promotionCode: string): Promise<void> {
		const query = `delete from promotion where code = "${promotionCode}"`
		await this.database.query(query)
	}
}
