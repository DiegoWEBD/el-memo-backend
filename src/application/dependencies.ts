import {
	MysqlClientRepository,
	MysqlItemRepository,
	MysqlProductRepository,
	MysqlPromotionRepository,
	type Database,
} from '../infrastructure'
import { PostgresqlCreditRepository } from '../infrastructure/credit/postgresqlCreditRepository'
import { PostgresqlSaleRepository } from '../infrastructure/sale/postgresqlSaleRepository'
import { type ApplicationDependencies } from './application.interface'

export const loadAppDependencies = (
	database: Database
): ApplicationDependencies =>
	Object.freeze({
		productRepository: new MysqlProductRepository(database),
		promotionRepository: new MysqlPromotionRepository(database),
		itemRepository: new MysqlItemRepository(database),
		saleRepository: new PostgresqlSaleRepository(database),
		clientRepository: new MysqlClientRepository(database),
		creditRepository: new PostgresqlCreditRepository(database),
	})
