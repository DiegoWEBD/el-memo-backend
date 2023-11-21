import { type Client } from './client'

export interface ClientRepository {
	getAll: () => Promise<Client[]>
	add: (client: Client) => Promise<Client>
	findById: (clientId: number) => Promise<Client | null>
	remove: (clientId: number) => Promise<void>
}
