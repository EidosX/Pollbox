import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class UserService {
  abstract getById(id: UserId): User | 'UserNotFound';

  abstract create(
    username: string,
    email: string,
    password: string | null
  ): Promise<User | 'UsernameAlreadyTaken'>;

  abstract delete(id: UserId): Promise<'OK' | 'UserNotFound'>;
}

export type UserId = string;

export interface User {
  id: UserId;
  username: string;
  email: string;
  emailVerification?: { status: 'unverified'; confirmationCode: string };
  avatarUrl?: string;
}
