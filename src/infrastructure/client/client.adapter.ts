import { Client } from '../../domain'

export const adaptClient = (client: any): Client =>
	new Client(
		client.id,
		client.name,
		client.special_discount,
		client.birth_date,
		client.registration_date,
		client.phones ?? []
	)
