export enum AuthorityEnum { 
	Audiologist, 
	Admin,
}

export const authorityTypes: Array<string> = ['Audiologist', 'Admin'];

export class UsersObject {
	public username: string;
	public name: string;
	public email: string;
	public password: string;
	public authorityType: number;
}
