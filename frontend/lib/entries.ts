import {
  collection,
  doc,
  DocumentData,
  FirestoreDataConverter,
  query,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { UserId } from './auth';
import { db } from './firebase';
import { PollId } from './polls';

export type EntryId = string;

export interface Entry {
  id: EntryId;
  contestant: {
    id: UserId | null;
    displayName: string | null;
    avatarUrl: string | null;
    twitchId: string | null;
    twitchName: string | null;
  };
  content: string;
}

export function useEntries(pollId: PollId | null): [Entry[], boolean, boolean] {
  const entriesRef = pollId
    ? collection(db, `polls/${pollId}/entries`).withConverter(postConverter)
    : null;
  const [entries, loading, error] = useCollectionData(
    entriesRef && query(entriesRef)
  );

  if (typeof entries === 'undefined') return [[], false, true];
  if (loading) return [[], loading, false];

  return [entries, false, false];
}

export function useEntriesCount(pollId: PollId): number {
  const [entries] = useEntries(pollId);
  return entries.length;
}

const postConverter: FirestoreDataConverter<Entry> = {
  toFirestore(post: Entry): DocumentData {
    return {
      content: post.content,
      contestant: {
        displayName: post.contestant.displayName,
        ref:
          post.contestant.id &&
          doc(collection(db, 'users'), post.contestant.id),
        twitchId: post.contestant.twitchId,
        twitchName: post.contestant.twitchName,
        avatarUrl: post.contestant.avatarUrl,
      },
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions) {
    const data = snapshot.data();
    return {
      content: data.content,
      contestant: {
        displayName: data.contestant.displayName,
        id: data.contestant.ref?.id,
        twitchId: data.contestant.twitchId,
        twitchName: data.contestant.twitchName,
        avatarUrl: data.contestant.avatarUrl,
      },
      id: snapshot.id,
    };
  },
};
