import { Application, loadAppDependencies } from './application'
import { type CustomError } from './errors'
import { createApi } from './infrastructure'
import { Database } from './infrastructure/database'
import { PgDatabase } from './infrastructure/database/database.postgres'
import dotenv from 'dotenv'

dotenv.config()
const PORT: number = parseInt(process.env.PORT ?? '3001')
const database: Database = new PgDatabase()

database
	.connect()
	.then(() => {
		const appDependencies = loadAppDependencies(database)
		const portfolioApp = new Application(appDependencies)
		const api = createApi(portfolioApp)
		api.start(PORT)
	})
	.catch((error: CustomError) => {
		console.log(error.getMessage())
	})
