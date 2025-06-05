export type UserRole = 'admin' | 'devops' | 'developer';

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  role: UserRole;

  getFullName(): string;
  getId(): number;
  getRole(): UserRole;
}

export class User implements IUser {
  id: number;
  firstName: string;
  lastName: string;
  role: UserRole;

  constructor(id: number, firstName: string, lastName: string, role: UserRole) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
  }

  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  getId() {
    return this.id;
  }

  getRole() {
    return this.role;
  }
}

const userList: IUser[] = [
  new User(1, 'Alice', 'Admin', 'admin'),
  new User(2, 'Bob', 'Builder', 'developer'),
  new User(3, 'Charlie', 'Ops', 'devops'),
  new User(4, 'Dave', 'Developer', 'admin'),
  new User(5, 'Eve', 'Engineer', 'admin'),
];

export class UserManager {
  private users: IUser[];

  constructor() {
    this.users = userList;
  }

  getUsers(): IUser[] {
    return this.users;
  }

  getDevelopersAndDevOps(): IUser[] {
    return this.users.filter(
      (user) => user.getRole() === 'developer' || user.getRole() === 'devops'
    );
  }
}
