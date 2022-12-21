import Link from 'next/link';
import { useRouter } from 'next/router';
import { PollCard } from '../../components/PollCard';
import { SafeHSpace } from '../../components/SafeHSpace';
import { useUserById } from '../../lib/auth';
import { Poll, usePolls } from '../../lib/polls';

const UserPage = () => {
  const router = useRouter();
  const userId = typeof router.query.id === 'string' ? router.query.id : null;

  const [user] = useUserById(userId);
  const [polls] = usePolls(userId);

  if (typeof userId != 'string') return <p>Invalid user id</p>;

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
    <div className="flex flex-wrap gap-4">
      {polls.map((p) => (
        <Link key={p.id} href={`/polls/${p.id}`}>
          <div
            className="flex-grow flex-shrink basis-0 relative cursor-pointer"
            style={{ height: '22rem' }}
          >
            <PollCard poll={p} entries={0} votes={0} />
          </div>
        </Link>
      ))}
    </div>
  );
};
