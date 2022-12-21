import { UserId } from './auth';
import {
  collection,
  doc,
  DocumentData,
  FirestoreDataConverter,
  orderBy,
  query,
  QueryDocumentSnapshot,
  SnapshotOptions,
  Timestamp,
  where,
} from 'firebase/firestore';
import {
  useCollectionData,
  useDocumentData,
} from 'react-firebase-hooks/firestore';
import { db } from './firebase';

export type PollId = string;

export interface Poll {
  createdAt: Timestamp;
  creator: {
    displayName: string;
    id: string;
  };
  hideResults: boolean;
  id: PollId;
  security: {
    type: 'twitch';
    channel: string;
    noSelfVote: boolean;
  };
  status: 'submissions' | 'running' | 'finished' | 'published';
  title: string;
  type: 'classic';
}

export function usePoll(pollId: PollId | null): [Poll | null] {
  const pollRef = pollId ? doc(db, `polls/${pollId}`) : null;
  const [poll] = useDocumentData(pollRef?.withConverter(postConverter));
  return [poll ?? null];
}

export function usePolls({
  userId,
}: {
  userId: UserId | null;
}): [Poll[], boolean, boolean] {
  const userDocRef = userId ? doc(collection(db, 'users'), userId) : null;

  const pollsRef = collection(db, 'polls').withConverter(postConverter);
  const [polls, loading, error] = useCollectionData(
    userDocRef &&
      query(
        pollsRef,
        where('creator.ref', '==', userDocRef),
        orderBy('createdAt', 'desc')
      )
  );

  if (typeof polls === 'undefined') return [[], false, true];
  if (loading) return [[], loading, false];

  return [polls as Poll[], false, false];
}

const postConverter: FirestoreDataConverter<Poll> = {
  toFirestore(post: Poll): DocumentData {
    return {
      createdAt: Timestamp,
      creator: {
        displayName: post.creator.displayName,
        ref: doc(collection(db, 'users'), post.creator.id),
      },
      hideResults: post.hideResults,
      security: {
        type: post.security.type,
        channel: post.security.channel,
        noSelfVote: post.security.noSelfVote,
      },
      status: post.security,
      title: post.title,
      type: post.type,
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions) {
    const data = snapshot.data();
    return {
      createdAt: data.createdAt,
      creator: {
        displayName: data.creator.displayName,
        id: data.creator.ref.id,
      },
      hideResults: data.hideResults,
      id: snapshot.id,
      security: {
        type: data.security.type,
        channel: data.security.channel,
        noSelfVote: data.security.noSelfVote,
      },
      status: data.status,
      title: data.title,
      type: data.type,
    };
  },
};
