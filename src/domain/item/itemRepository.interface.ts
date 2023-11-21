import type { Item } from './item'

export interface ItemRepository {
	add: (item: Item) => Promise<void>
	findByCode: (code: string) => Promise<Item | null>
	generateCode: () => Promise<string>
	update: (itemCode: string, newValues: Item) => Promise<void>
}
