import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { firebaseApp } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

export const defaultAvatarUrl = 'svg/generic-avatar.svg';

export type UserId = string;
export interface User {
  id: UserId;
  username: string;
  email: string;
  avatarUrl: string | null;
}

export function useCurrentUser(): User | null {
  const [u, loading, error] = useAuthState(getAuth(firebaseApp));
  if (u)
    return {
      email: u.email ?? '',
      id: u.uid,
      username: u.displayName ?? 'N/A',
      avatarUrl: u.photoURL,
    };
  return null;
}

export function signInWithGoogle() {
  signInWithPopup(getAuth(firebaseApp), new GoogleAuthProvider()).catch(
    console.error
  );
}
export function logOut() {
  signOut(getAuth(firebaseApp));
}
