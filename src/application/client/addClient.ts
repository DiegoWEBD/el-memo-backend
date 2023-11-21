import { Client, type ClientRepository } from '../../domain'

export const makeAddClient = (clientRepository: ClientRepository) => {
	return async (
		name: string,
		specialDiscount: number,
		birthDate: Date,
		registrationDate: Date,
		phones: string[]
	): Promise<Client> => {
		const client = new Client(
			null,
			name,
			specialDiscount,
			birthDate,
			registrationDate,
			phones
		)
		return await clientRepository.add(client)
	}
}
