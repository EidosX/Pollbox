import Link from 'next/link';
import { useRouter } from 'next/router';
import BackgroundDesign from '../../components/BackgroundDesign';
import { NavbarGhost } from '../../components/Navbar';
import { PollCard } from '../../components/PollCard';
import { SafeHSpace } from '../../components/SafeHSpace';
import { defaultAvatarUrl } from '../../lib/auth';
import { Entry, useEntries } from '../../lib/entries';
import { usePoll } from '../../lib/polls';
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
    <div className="relative">
      <BackgroundDesign />
      <SafeHSpace>
        <div className="pt-40 pb-32 flex flex-row-reverse flex-wrap gap-10 relative">
          <div
            className="relative basis-0 flex-grow h-full"
            style={{ height: '21rem' }}
          >
            <PollCard poll={poll} />
          </div>
          {poll.status !== 'submissions' && (
            <div
              className="relative flex-grow w-80 overflow-y-scroll pr-3 flex flex-col gap-3"
              style={{ maxHeight: '21rem' }}
            >
              <VoteResultChart
                entries={entries
                  .map((e) => ({
                    ...e,
                    votes: results.get(e.id)!,
                  }))
                  .sort((a, b) => b.votes - a.votes)}
              />
            </div>
          )}
        </div>
      </SafeHSpace>
    </div>
  );
};

const VoteResultChart = ({
  entries,
}: {
  entries: (Entry & { votes: number })[];
}) => {
  const max = entries.reduce((a, b) => Math.max(a, b.votes), 0);
  return (
    <>
      {[...entries, ...entries, ...entries, ...entries, ...entries].map(
        (entry) => {
          const profilePic = (
            <img
              src={entry.contestant.avatarUrl ?? defaultAvatarUrl}
              alt=""
              className="inline w-10 h-10 rounded-full"
            />
          );
          return (
            <div
              key={entry.id}
              className="flex-shrink-0 flex justify-between items-center relative h-14 px-6"
            >
              <div
                className="absolute inset-0 bg-red-600 rounded-lg -z-10"
                style={{ width: `${(100 * entry.votes) / max}%` }}
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
                  {entry.contestant.displayName ??
                    entry.contestant.twitchName ??
                    '???'}
                </p>
              </div>
              <p className={entry.votes !== max ? 'opacity-40' : ''}>
                {entry.votes}
              </p>
            </div>
          );
        }
      )}
    </>
  );
};
