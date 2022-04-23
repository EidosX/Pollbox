import { defaultAvatarUrl, useCurrentUser } from '../lib/CurrentUser';

export const Navbar = () => {
  const user = useCurrentUser();
  return (
    <div className="flex text-white font-light relative gap-12 h-14 items-center select-none">
      <a href="/" className="mr-auto">
        <img src="svg/logo.svg" alt="Eidovote" />
      </a>
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
        <a href="/login" className="text-white">
          Login
        </a>
      )}
    </div>
  );
};
