import Link from 'next/link';
import { useRouter } from 'next/router';
import { PollCard } from '../../components/PollCard';
import { SafeHSpace } from '../../components/SafeHSpace';
import { useUserById } from '../../lib/auth';
import { useEntriesCounts } from '../../lib/entries';
import { Poll, PollId, usePolls } from '../../lib/polls';

const UserPage = () => {
  const router = useRouter();
  const userId = typeof router.query.id === 'string' ? router.query.id : null;

  const [user] = useUserById(userId);
  const [polls] = usePolls(userId);
  const entriesCount = useEntriesCounts(polls.map((p) => p.id));

  if (typeof userId != 'string') return <p>Invalid user id</p>;

  return (
    <SafeHSpace>
      <h1 className="text-lg my-4 font-bold">My Polls</h1>
      <PollList polls={polls} entriesCount={entriesCount} />
    </SafeHSpace>
  );
};
export default UserPage;

const PollList = ({
  polls,
  entriesCount,
}: {
  polls: Poll[];
  entriesCount: Map<PollId, number>;
}) => {
  return (
    <div className="flex flex-wrap gap-4">
      {polls.map((p) => (
        <Link key={p.id} href={`/polls/${p.id}`}>
          <div
            className="flex-grow flex-shrink basis-0 relative cursor-pointer"
            style={{ height: '22rem' }}
          >
            <PollCard
              poll={p}
              entries={entriesCount.get(p.id) ?? 0}
              votes={0}
            />
          </div>
        </Link>
      ))}
    </div>
  );
};
