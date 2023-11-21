import type { Credit, CreditRepository } from '../../domain'

export const makeGetCredits = (creditRepository: CreditRepository) => {
	return async (): Promise<Credit[]> => await creditRepository.getAll()
}
