import Link from 'next/link';
import { useRouter } from 'next/router';
import { PollCard } from '../../components/PollCard';
import { SafeHSpace } from '../../components/SafeHSpace';
import { usePolls } from '../../lib/polls';

const UserPage = () => {
  const router = useRouter();
  const { id: userId } = router.query;

  if (typeof userId != 'string') return <p>Invalid user id</p>;

  return (
    <SafeHSpace>
      <Top userId={userId}></Top>
      <PollList userId={userId} />
    </SafeHSpace>
  );
};
export default UserPage;

const Top = ({ userId }: { userId: string }) => {
  return (
    <div>
      <p>{}</p>
    </div>
  );
};
const PollList = ({ userId }: { userId: string }) => {
  const [polls] = usePolls(userId);
  return (
    <div className="flex flex-wrap gap-4">
      {polls.map((p) => (
        <Link href={`/polls/${p.id}`}>
          <div
            className="flex-grow flex-shrink basis-0 relative cursor-pointer"
            style={{ height: '22rem' }}
            key={p.id}
          >
            <PollCard poll={p} entries={0} votes={0} />
          </div>
        </Link>
      ))}
    </div>
  );
};
