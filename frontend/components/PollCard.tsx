import Link from 'next/link';
import { MouseEventHandler, useEffect, useRef, useState } from 'react';
import { useEntriesCount } from '../lib/entries';
import { Poll } from '../lib/polls';
import { useVotesCount } from '../lib/votes';

export const PollCard = ({
  poll,
  noClick,
}: {
  poll: Poll;
  noClick?: boolean;
}) => {
  const date = poll.createdAt.toDate();

  const entriesCount = useEntriesCount(poll.id);
  const votesCount = useVotesCount(poll.id);

  const ref = useRef(null);
  const mouseGradientRef = useRef(null);

  const onMouseMove: MouseEventHandler = (e) => {
    if (!ref.current || !mouseGradientRef.current) return;
    const ref2 = ref.current as any;
    const mouseGradientRef2 = mouseGradientRef.current as any;

    const gradientRect = mouseGradientRef2.getBoundingClientRect();
    const parentRect = ref2.getBoundingClientRect();
    const x = e.clientX - parentRect.x - gradientRect.width / 2;
    const y = e.clientY - parentRect.y - gradientRect.height / 2;
    if (
      e.clientX < parentRect.x ||
      e.clientY < parentRect.y ||
      e.clientX >= parentRect.x + parentRect.width ||
      e.clientY >= parentRect.y + parentRect.height
    ) {
      mouseGradientRef2.style.opacity = '0%';
      return;
    }
    mouseGradientRef2.style.transform = `translate(${x}px, ${y}px)`;
    mouseGradientRef2.style.opacity = '10%';
  };

  return (
    <div
      className="flex flex-col gap-8 justify-between bg-cardbg rounded-lg px-9 py-7 h-full overflow-hidden relative"
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseMove}
      onMouseEnter={onMouseMove}
    >
      <div
        className="w-full aspect-square absolute pointer-events-none opacity-0"
        style={{
          background: 'radial-gradient(closest-side, #aaccff, #00000000)',
          transition: 'opacity 180ms',
        }}
        ref={mouseGradientRef}
      />
      {noClick && <div className="absolute z-10 inset-0 bg-transparent"></div>}

      <div className="flex flex-col gap-0.5">
        <p className="font-bold text-2xl">{poll.title}</p>
        <Link href={`/users/${poll.creator.id}`}>
          <p className="text-xs text-midnight-800 cursor-pointer">
            By {poll.creator.displayName}
          </p>
        </Link>
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
