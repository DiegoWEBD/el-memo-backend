import cors from 'cors'
import express from 'express'
import { type PosSystemApplication } from '../../application'
import { createController } from './controller'
import { loadRouters } from './routersLoader'

export { createController }

interface Api {
	start: (port: number) => void
}

export function createApi(posSystemApp: PosSystemApplication): Api {
	const api = express()
	api.use(cors())
	api.use(express.json())
	loadRouters(api, posSystemApp)

	const start = (port: number): void => {
		api.listen(port, () => {
			console.log(`Api listening on port ${port}`)
		})
	}

	return Object.freeze({ start })
}
