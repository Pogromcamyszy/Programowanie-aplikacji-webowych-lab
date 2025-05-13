import type { IUser } from './Users';

export class UserManager {
  private user: IUser;

  constructor(user: IUser) {
    this.user = user;
  }

  getLoggedInUser() {
    return this.user;
  }
}