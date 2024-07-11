interface DatabaseResponse {
	data: any[]
}

export interface Database {
	connect(): Promise<void>
	query(query: string): Promise<DatabaseResponse>
	call(procedureCall: string): Promise<DatabaseResponse>
	executeTransaction(queries: string[]): Promise<void>
	disconnect(): Promise<void>
}
