export class Client {
	id: number | null
	name: string
	specialDiscount: number
	birthDate: Date
	registrationDate: Date
	phones: string[]

	constructor(
		id: number | null,
		name: string,
		specialDiscount: number,
		birthDate: Date,
		registrationDate: Date,
		phones: string[]
	) {
		this.id = id
		this.name = name
		this.specialDiscount = specialDiscount
		this.birthDate = birthDate
		this.registrationDate = registrationDate
		this.phones = phones
	}
}
