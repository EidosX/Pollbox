import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { db, firebaseApp } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  addDoc,
  collection,
  DocumentData,
  FirestoreDataConverter,
  limit,
  query,
  QueryDocumentSnapshot,
  SnapshotOptions,
  where,
} from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useEffect } from 'react';

export const defaultAvatarUrl = '/svg/generic-avatar.svg';

export type UserId = string;
export interface User {
  id: UserId;
  username: string;
  avatarUrl: string | null;
  linkedAccounts: {
    google: string;
  };
}

export function useCurrentUser(): User | null {
  const [u, loading, error] = useAuthState(getAuth(firebaseApp));
  const usersRef = collection(db, 'users').withConverter(postConverter);
  const [users] = useCollectionData(
    u && query(usersRef, where('linkedAccounts.google', '==', u.uid), limit(2))
  );

  useEffect(() => {
    if (u && users?.length === 0) {
      addDoc<User>(usersRef, {
        avatarUrl: u.photoURL,
        username: u.displayName ?? '???',
        id: '???',
        linkedAccounts: {
          google: u.uid,
        },
      });
    }
  }, [u?.uid]);

  if (!u || !users) return null;
  else if (users.length === 1) return users[0];
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

const postConverter: FirestoreDataConverter<User> = {
  toFirestore(post: User): DocumentData {
    return {
      avatarUrl: post.avatarUrl,
      username: post.username,
      linkedAccounts: {
        google: post.linkedAccounts.google,
      },
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions) {
    const data = snapshot.data();
    return {
      id: snapshot.id,
      avatarUrl: data.avatarUrl,
      username: data.username,
      linkedAccounts: {
        google: data.linkedAccounts.google,
      },
    };
  },
};
