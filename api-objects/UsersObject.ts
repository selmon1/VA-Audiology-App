export const authorityTypes: Array<string> = ['Admin', 'Audiologist'];

export class UsersObject {
   constructor(
   public username: string,
   public name: string,
   public email: string,
   public password: string,
   public authorityType: number) { }
}