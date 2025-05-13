export interface IUser {
  id: number;
  firstName: string;
  lastName: string;

  getFullName(): string;

  getId(): number;
}

export class User implements IUser {
  id: number;
  firstName: string;
  lastName: string;

  constructor(id:number,firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.id = id; 
  }

  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  getId() {
    return this.id;
  }
}