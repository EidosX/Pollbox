import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { db, firebaseApp } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  collection,
  DocumentData,
  FirestoreDataConverter,
  getFirestore,
  limit,
  query,
  QueryDocumentSnapshot,
  SnapshotOptions,
  where,
} from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';

export const defaultAvatarUrl = '/svg/generic-avatar.svg';

export type UserId = string;
export interface User {
  id: UserId;
  username: string;
  avatarUrl: string | null;
}

export function useCurrentUser(): User | null {
  const [u, loading, error] = useAuthState(getAuth(firebaseApp));
  const usersRef = collection(db, 'users').withConverter(postConverter);
  const [users] = useCollectionData(
    u && query(usersRef, where('linkedAccounts.google', '==', u.uid), limit(2))
  );

  if (!users) return null;
  else if (users.length === 0) {
    // Create new user
    return null;
  } else if (users.length !== 1) {
    console.error('MULTIPLE USERS ASSOCIATED WITH SAME GOOGLE ACCOUNT');
    return null;
  } else return users[0];
}

export function signInWithGoogle() {
  signInWithPopup(getAuth(firebaseApp), new GoogleAuthProvider()).catch(
    console.error
  );
}
export function logOut() {
  signOut(getAuth(firebaseApp));
}

const postConverter: FirestoreDataConverter<User> = {
  toFirestore(post: User): DocumentData {
    return {
      avatarUrl: post.avatarUrl,
      username: post.username,
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions) {
    const data = snapshot.data();
    return {
      id: snapshot.id,
      avatarUrl: data.avatarUrl,
      username: data.username,
    };
  },
};
