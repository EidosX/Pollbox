import Link from 'next/link';
import { defaultAvatarUrl, useCurrentUser } from '../lib/CurrentUser';

export const Navbar = () => {
  const user = useCurrentUser();
  return (
    <div className="flex text-white font-light relative gap-12 h-16 items-center select-none">
      <Link href="/">
        <img src="svg/logo.svg" alt="Eidovote" className="mr-auto" />
      </Link>
      {!!user && <p>My Votes</p>}
      {!!user ? (
        <div className="flex gap-4 items-center">
          <p>{user.username}</p>
          <img
            src={user.avatarUrl ?? defaultAvatarUrl}
            alt=""
            className="w-9 h-9"
          />
        </div>
      ) : (
        <Link href="/login">
          <p className="text-white">Login</p>
        </Link>
      )}
    </div>
  );
};
