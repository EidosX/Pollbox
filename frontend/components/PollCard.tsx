import { useEntriesCount } from '../lib/entries';
import { Poll } from '../lib/polls';

export const PollCard = ({ poll }: { poll: Poll }) => {
  const date = poll.createdAt.toDate();

  const entriesCount = useEntriesCount(poll.id);
  const votesCount = 0;

  return (
    <div className="flex flex-col gap-8 justify-between bg-cardbg rounded-lg px-9 py-7 h-full hover:scale-105 transition-all">
      <div className="flex flex-col gap-0.5">
        <p className="font-bold text-2xl">{poll.title}</p>
        <p className="text-xs text-midnight-800">
          By {poll.creator.displayName}
        </p>
      </div>
      <div className="flex justify-between gap-12">
        <div className="flex flex-col gap-0.5 w-full">
          <p className="text-xs text-midnight-800">Status</p>
          {poll.status === 'running' && (
            <p className="text-green-running">Running</p>
          )}
          {poll.status === 'finished' && (
            <p className="text-orange-finished">Finished</p>
          )}
          {poll.status === 'submissions' && (
            <p className="text-red-submissions">Submissions</p>
          )}
          {poll.status === 'published' && <p>Published</p>}
        </div>
        <div className="flex flex-col gap-0.5 w-full">
          <p className="text-xs text-midnight-800">Created</p>
          <p>
            {date.getDate()}/{date.getMonth()}/{date.getFullYear()}
          </p>
        </div>
      </div>
      <div className="flex justify-between gap-12">
        <div className="flex flex-col gap-0.5 w-full">
          <p className="text-xs text-midnight-800">Total number of entries</p>
          <p className="text-7xl w-0">{entriesCount}</p>
        </div>
        <div className="flex flex-col gap-0.5 w-full">
          <p className="text-xs text-midnight-800">Total number of Votes</p>
          <p className="text-7xl w-0">{votesCount}</p>
        </div>
      </div>
    </div>
  );
};
