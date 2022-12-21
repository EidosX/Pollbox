import {
  collection,
  doc,
  DocumentData,
  FirestoreDataConverter,
  getFirestore,
  query,
  QueryDocumentSnapshot,
  SnapshotOptions,
  where,
} from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { UserId } from './auth';
import { db, firebaseApp } from './firebase';
import { PollId } from './polls';

export type EntryId = string;

export interface Entry {
  id: EntryId;
  contestant: {
    id: UserId;
    displayName: string;
  };
  content: string;
  pollId: PollId;
}

export function useEntries(pollId: PollId): [Entry[], boolean, boolean] {
  const entriesRef = collection(db, 'entries').withConverter(postConverter);
  const [entries, loading, error] = useCollectionData(
    query(entriesRef, where('pollId', '==', pollId))
  );

  if (typeof entries === 'undefined') return [[], false, true];
  if (loading) return [[], loading, false];

  return [entries as Entry[], false, false];
}

const postConverter: FirestoreDataConverter<Entry> = {
  toFirestore(post: Entry): DocumentData {
    return {
      content: post.content,
      contestant: {
        displayName: post.contestant.displayName,
        ref: doc(collection(db, 'users'), post.contestant.id),
      },
      pollRef: doc(collection(db, 'polls'), post.pollId),
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions) {
    const data = snapshot.data();
    return {
      content: data.content,
      contestant: {
        displayName: data.contestant.displayName,
        id: data.contestant.ref.id,
      },
      id: snapshot.id,
      pollId: data.pollRef.id,
    };
  },
};
