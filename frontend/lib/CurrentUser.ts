export const defaultAvatarUrl = 'svg/generic-avatar.svg';

export type UserId = string;
export interface User {
  id: UserId;
  username: string;
  email: string;
  emailVerification?: { status: 'unverified'; confirmationCode: string };
  avatarUrl?: string;
}

export function useCurrentUser(): User | undefined {
  return undefined;
}
