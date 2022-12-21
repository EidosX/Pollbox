import {
  collection,
  doc,
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { UserId } from './auth';
import { EntryId, useEntries } from './entries';
import { db } from './firebase';
import { PollId } from './polls';

export type VoteId = string;

export interface Vote {
  id: VoteId;
  forEntryId: EntryId;
  pollId: PollId;
  voter: {
    twitchId: string;
    id: UserId | null;
  };
}

export function useVotes(pollId: PollId | null): Vote[] {
  const votesRef = pollId
    ? collection(db, `polls/${pollId}/votes`).withConverter(postConverter)
    : null;
  const [votes] = useCollectionData(votesRef);
  return votes ?? [];
}

export function useResults(pollId: PollId | null): Map<EntryId, number> {
  const [entries] = useEntries(pollId);
  const votes = useVotes(pollId);

  const results = new Map<EntryId, number>();
  for (let e of entries) results.set(e.id, 0);
  for (let v of votes)
    results.set(v.forEntryId, results.get(v.forEntryId)! + 1);
  return results;
}

export function useVotesCount(pollId: PollId | null): number {
  const votes = useVotes(pollId);
  return votes.length;
}

const postConverter: FirestoreDataConverter<Vote> = {
  toFirestore(post: Vote): DocumentData {
    return {
      forEntryRef: doc(db, `polls/${post.pollId}/votes/${post.id}`),
      voter: {
        twitchId: post.voter.twitchId,
        ref: post.voter.id ? doc(db, `users/${post.voter.id}`) : null,
      },
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions) {
    const data = snapshot.data();
    return {
      id: snapshot.id,
      pollId: snapshot.ref.parent.id,
      forEntryId: data.forEntryRef.id,
      voter: {
        twitchId: data.voter.twitchId,
        id: data.voter.ref?.id,
      },
    };
  },
};
