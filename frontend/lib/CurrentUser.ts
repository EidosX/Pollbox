export const defaultAvatarUrl = 'svg/generic-avatar.svg';

export interface CurrentUser {
  username: string;
  avatarUrl?: string;
}

export function useCurrentUser(): CurrentUser | undefined {
  return {
    username: 'Eidos',
    avatarUrl: 'png/eidos-avatar.png',
  };
}
