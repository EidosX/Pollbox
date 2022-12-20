export const defaultAvatarUrl = 'svg/generic-avatar.svg';

export type UserId = string;
export interface User {
  id: UserId;
  username: string;
  email: string;
  avatarUrl?: string;
}

export function useCurrentUser(): User | undefined {
  return { email: '', username: 'Eidos', id: '' };
}
