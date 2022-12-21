import Link from 'next/link';
import { useRouter } from 'next/router';
import { PollCard } from '../../components/PollCard';
import { SafeHSpace } from '../../components/SafeHSpace';
import { defaultAvatarUrl } from '../../lib/auth';
import { Entry, EntryId, useEntries } from '../../lib/entries';
import { Poll, usePoll } from '../../lib/polls';
import { useResults } from '../../lib/votes';

export default () => {
  const router = useRouter();
  const pollId = typeof router.query.id === 'string' ? router.query.id : null;
  const [poll] = usePoll(pollId);
  const [entries] = useEntries(pollId);
  const results = useResults(pollId);

  if (!pollId) return <p>Invalid poll id</p>;
  if (!poll) return <p>...</p>;

  return (
    <SafeHSpace>
      <div
        className="mt-6 flex flex-wrap gap-12 relative"
        style={{ height: '21rem' }}
      >
        <div className="relative flex-grow flex-shrink-0 w-80 h-full flex flex-col gap-3">
          <VoteResultChart poll={poll} results={results} entries={entries} />
        </div>
        <div className="relative basis-0 flex-grow h-full">
          <PollCard poll={poll} />
        </div>
      </div>
    </SafeHSpace>
  );
};

const VoteResultChart = ({
  poll,
  results,
  entries,
}: {
  poll: Poll;
  results: Map<EntryId, number>;
  entries: Entry[];
}) => {
  const results2 = Array.from(results.entries()).sort(
    ([_1, a], [_2, b]) => b - a
  );
  const max = results2.reduce((a, [_, b]) => Math.max(a, b), 0);
  return (
    <>
      {results2.slice(0, poll.onlyShowTop).map(([eid, votes]) => {
        const entry = entries.find((e) => e.id === eid)!;
        const profilePic = (
          <img
            src={entry.contestant.avatarUrl ?? defaultAvatarUrl}
            alt=""
            className="inline w-10 h-10 rounded-full"
          />
        );
        return (
          <div className="flex-shrink-0 flex justify-between items-center relative h-14 px-6">
            <div
              className="absolute inset-0 bg-red-600 rounded-lg -z-10"
              style={{ width: `${(100 * votes) / max}%` }}
            ></div>
            <div className="flex items-center gap-4">
              {!entry.contestant.id ? (
                profilePic
              ) : (
                <div className="cursor-pointer">
                  <Link href={`/users/${entry.contestant.id}`}>
                    {profilePic}
                  </Link>
                </div>
              )}
              <p>
                {entry.contestant.displayName ?? entry.contestant.twitchName}
              </p>
            </div>
            <p className={votes !== max ? 'opacity-40' : ''}>{votes}</p>
          </div>
        );
      })}
    </>
  );
};
