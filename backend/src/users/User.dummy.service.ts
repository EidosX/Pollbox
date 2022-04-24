import { Injectable } from '@nestjs/common';
import { User, UserId, UserService } from './User.service';

@Injectable()
export class UserDummyService implements UserService {
  private users: (User & { password: string | null })[] = [];

  getById(id: UserId) {
    return this.users.find((user) => user.id === id) ?? 'UserNotFound';
  }

  async create(username: string, email: string, password: string | null) {
    if (this.users.find((user) => user.username === username))
      return 'UsernameAlreadyTaken';
    const id = Math.random().toString().substring(2);
    const user: User = { id, username, email };
    this.users.push({ password, ...user });
    return user;
  }

  async delete(id: string) {
    if (!this.users.find((user) => user.id === id)) return 'UserNotFound';
    this.users = this.users.filter((user) => user.id !== id);
    return 'OK';
  }
}
