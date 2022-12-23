import Link from 'next/link';
import { logOut, signInWithGoogle, User } from '../lib/auth';
import { useState } from 'react';
import { defaultAvatarUrl, useCurrentUser } from '../lib/auth';
import { SafeHSpace } from './SafeHSpace';

export const Navbar = () => {
  const user = useCurrentUser();
  const [hamMenuOpened, setHamMenuOpened] = useState(false);
  return (
    <>
      <div className="flex w-full items-center h-16 z-50 absolute">
        <Link href="/">
          <img
            src="/svg/logo.svg"
            alt="Pollbox"
            className="mr-auto cursor-pointer"
          />
        </Link>

        <img
          src="/svg/hamburger-menu.svg"
          alt="menu"
          className="md:hidden w-7 cursor-pointer"
          onClick={() => setHamMenuOpened((x) => !x)}
        ></img>

        <div className="hidden md:flex text-white font-light relative gap-12 items-center select-none">
          <RightNavContent user={user}></RightNavContent>
        </div>
      </div>
      <HamMenu
        className={`md:hidden absolute z-40 px-12 py-6 left-0 right-0 transition duration-500 shadow-2xl shadow-black ${
          hamMenuOpened ? 'translate-y-0' : '-translate-y-64'
        }`}
        user={user}
      ></HamMenu>
    </>
  );
};
export const NavbarGhost = () => <div className="h-16" />;

const RightNavContent = ({ user }: { user: User | null }) => {
  return (
    <>
      {!!user && (
        <p className="cursor-pointer" onClick={logOut}>
          Log out
        </p>
      )}
      {!!user ? (
        <Link href={`/users/${user.id}`}>
          <p className="cursor-pointer">
            {user.username}
            <img
              src={user.avatarUrl ?? defaultAvatarUrl}
              alt=""
              className="inline w-9 h-9 rounded-full ml-3"
            />
          </p>
        </Link>
      ) : (
        <p className="text-white cursor-pointer" onClick={signInWithGoogle}>
          Sign in with{' '}
          <img src="/svg/google.svg" alt="Google" className="inline h-6 ml-1" />
        </p>
      )}
    </>
  );
};

const HamMenu = ({ className, user, ...props }: any) => {
  return (
    <SafeHSpace>
      <div
        {...props}
        className={`${
          className ?? ''
        } bg-midnight-100 flex flex-col-reverse gap-8 items-center`}
      >
        <RightNavContent user={user}></RightNavContent>
      </div>
    </SafeHSpace>
  );
};
