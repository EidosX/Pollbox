import { User } from '../../backend/src/users/User.service';

export const defaultAvatarUrl = 'svg/generic-avatar.svg';

export function useCurrentUser(): User | undefined {
  return {
    id: '14156211',
    username: 'Eidos',
    email: 'imeidos@pm.me',
    avatarUrl: 'png/eidos-avatar.png',
  };
}
