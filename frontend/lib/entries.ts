import {
  collection,
  doc,
  DocumentData,
  FirestoreDataConverter,
  getCountFromServer,
  getFirestore,
  query,
  QueryDocumentSnapshot,
  SnapshotOptions,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
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

export function useEntries(
  pollIds: PollId[]
): [Map<PollId, Entry[]>, boolean, boolean] {
  const entriesRef = collection(db, 'entries').withConverter(postConverter);
  const pollRefs = pollIds.map((pid) => doc(collection(db, 'polls'), pid));
  const [entries, loading, error] = useCollectionData(
    pollIds.length ? query(entriesRef, where('pollRef', 'in', pollRefs)) : null
  );

  if (typeof entries === 'undefined') return [new Map(), false, true];
  if (loading) return [new Map(), loading, false];
  console.log({ entries, loading, error });

  const map = new Map<PollId, Entry[]>();
  for (let pid of pollIds) map.set(pid, []);
  for (let e of entries) map.get(e.pollId)?.push(e);
  return [map, false, false];
}

export function useEntriesCounts(pollIds: PollId[]): Map<PollId, number> {
  const [entries] = useEntries(pollIds);
  const map = new Map<PollId, number>();
  for (let pid of pollIds) map.set(pid, entries.get(pid)?.length ?? 0);
  return map;
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
