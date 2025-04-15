export enum UserRole {
  Admin = "admin",
  DevOps = "devops",
  Developer = "developer",
}

export class User {
  public id: number;
  public firstName: string;
  public lastName: string;
  public role: UserRole;

  constructor(id: number, firstName: string, lastName: string, role: UserRole) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
  }
}

// Lista zamockowanych użytkowników
export const users: User[] = [
  new User(1, 'Admin', 'User', UserRole.Admin),         // Admin (zalogowany)
  new User(2, 'Alice', 'Developer', UserRole.Developer), // Developer
  new User(3, 'Bob', 'DevOps', UserRole.DevOps),         // DevOps
];