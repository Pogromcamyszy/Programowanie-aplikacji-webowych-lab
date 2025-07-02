export type UserRole = 'admin' | 'devops' | 'developer';

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  email: string;
  createdAt: string;
  updatedAt: string;
}

