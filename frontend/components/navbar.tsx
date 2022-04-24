import Link from 'next/link';
import { useState } from 'react';
import {
  CurrentUser,
  defaultAvatarUrl,
  useCurrentUser,
} from '../lib/CurrentUser';
import { SafeHSpace } from './SafeHSpace';
import Image from 'next/image';

export const Navbar = () => {
  const user = useCurrentUser();
  const [hamMenuOpened, setHamMenuOpened] = useState(false);
  return (
    <>
      <div className="flex items-center h-16 z-50 relative">
        <Link href="/" passHref>
          <Image
            src="svg/logo.svg"
            alt="Eidovote"
            className="mr-auto cursor-pointer"
          />
        </Link>

        <Image
          src="svg/hamburger-menu.svg"
          alt="menu"
          className="sm:hidden w-7 cursor-pointer"
          onClick={() => setHamMenuOpened((x) => !x)}
        ></Image>

        <div className="hidden sm:flex text-white font-light relative gap-12 items-center select-none">
          <RightNavContent user={user}></RightNavContent>
        </div>
      </div>
      <HamMenu
        className={`sm:hidden absolute z-40 px-12 py-6 left-0 right-0 transition duration-500 shadow-2xl shadow-black ${
          hamMenuOpened ? 'translate-y-0' : '-translate-y-64'
        }`}
        user={user}
      ></HamMenu>
    </>
  );
};

const RightNavContent = ({ user }: { user: CurrentUser | undefined }) => {
  return (
    <>
      {!!user && <p className="cursor-pointer">My Votes</p>}
      {!!user ? (
        <div className="flex gap-4 items-center cursor-pointer">
          <p>{user.username}</p>
          <Image
            src={user.avatarUrl ?? defaultAvatarUrl}
            alt=""
            className="w-9 h-9"
          />
        </div>
      ) : (
        <Link href="/login" passHref>
          <p className="text-white cursor-pointer">Login</p>
        </Link>
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
