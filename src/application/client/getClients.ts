import type { Client, ClientRepository } from '../../domain'

export const makeGetClients = (clientRepository: ClientRepository) => {
	return async (): Promise<Client[]> => await clientRepository.getAll()
}
