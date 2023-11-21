import type { ClientRepository, Client } from '../../domain'
import { makeAddClient } from './addClient'
import { makeGetClients } from './getClients'

export interface ClientServices {
	getClients: () => Promise<Client[]>
	addClient: (
		name: string,
		specialDiscount: number,
		birthDate: Date,
		registrationDate: Date,
		phones: string[]
	) => Promise<Client>
}

export const makeClientServices = (
	clientRepository: ClientRepository
): ClientServices => {
	return Object.freeze({
		getClients: makeGetClients(clientRepository),
		addClient: makeAddClient(clientRepository),
	})
}
