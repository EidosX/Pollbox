import Link from 'next/link';
import { useRouter } from 'next/router';
import { PollCard } from '../../components/PollCard';
import { SafeHSpace } from '../../components/SafeHSpace';
import { useUserById } from '../../lib/auth';
import { Poll, PollId, usePolls } from '../../lib/polls';

const UserPage = () => {
  const router = useRouter();
  const userId = typeof router.query.id === 'string' ? router.query.id : null;

  const [user] = useUserById(userId);
  const [polls] = usePolls({ userId });

  if (!userId) return <p>Invalid user id</p>;

  return (
    <SafeHSpace>
      <h1 className="text-lg my-4 font-bold">My Polls</h1>
      <PollList polls={polls} />
    </SafeHSpace>
  );
};
export default UserPage;

const PollList = ({ polls }: { polls: Poll[] }) => {
  return (
    <div className="flex flex-wrap gap-6">
      {polls.map((p) => (
        <Link key={p.id} href={`/polls/${p.id}`}>
          <div
            className="flex-grow flex-shrink basis-0 relative cursor-pointer hover:scale-105 transition-all"
            style={{ height: '22rem' }}
          >
            <PollCard poll={p} noClick />
          </div>
        </Link>
      ))}
    </div>
  );
};
