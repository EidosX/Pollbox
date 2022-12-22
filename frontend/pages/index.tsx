import type { NextPage } from 'next';
import Link from 'next/link';
import { MouseEventHandler } from 'react';
import BackgroundDesign from '../components/BackgroundDesign';
import { SafeHSpace } from '../components/SafeHSpace';
import { signInWithGoogle, useCurrentUser } from '../lib/auth';

const Home: NextPage = () => {
  return (
    <>
      <FrontPageContent></FrontPageContent>
      <SndPageContent></SndPageContent>
    </>
  );
};

export default Home;

const FrontPageContent = () => {
  const user = useCurrentUser();

  const actionButton = ({
    text,
    onClick,
  }: {
    text: string;
    onClick?: MouseEventHandler;
  }) => {
    return (
      <button
        className="flex items-center text-midnight-100 bg-red-600 rounded-sm px-6 py-3 font-medium mt-10 hover:scale-110 transition-all"
        onClick={onClick}
      >
        {text}
        <img
          src="/svg/down-arrow.svg"
          alt=""
          className="ml-4 w-4 -rotate-90"
          style={{ filter: 'invert(100%)' }}
        />
      </button>
    );
  };

  const left = (
    <>
      <h1 className="uppercase font-extrabold text-5xl">
        Tired of people rigging <br /> your polls?
      </h1>
      <h2 className="max-w-md mt-4 text-midnight-800">
        We have configurable security that prevents cheating without bothering
        the voters
      </h2>
      {user ? (
        <Link href={`/users/${user.id}`}>
          {actionButton({ text: 'My Dashboard' })}
        </Link>
      ) : (
        actionButton({ text: 'Try Pollbox', onClick: signInWithGoogle })
      )}
    </>
  );
  return (
    <div className="h-[36rem]">
      <BackgroundDesign />
      <SafeHSpace className="flex justify-between h-full items-center">
        <div>{left}</div>
        <img
          src="/svg/graph-design.svg"
          alt=""
          className="max-w-xs pl-4 opacity-80 select-none pointer-events-none hidden lg:block"
        />
      </SafeHSpace>
    </div>
  );
};

const SndPageContent = () => {
  const Section = (args: {
    title: string;
    iconLink: string;
    description: string;
  }) => (
    <div className="w-72 text-center flex flex-col items-center gap-10">
      <h2 className="font-bold uppercase text-3xl">{args.title}</h2>
      <img src={args.iconLink} alt="" className="w-24 h-24" />
      <p className="text-midnight-800">{args.description}</p>
    </div>
  );
  return (
    <SafeHSpace
      className="py-24 flex flex-col justify-between gap-36 items-center 
                 lg:items-baseline lg:gap-8 lg:flex-row"
    >
      <Section
        title="Secure"
        iconLink="/svg/shield.svg"
        description="We provide polls which can only be voted once per user identified via twitch."
      ></Section>
      <Section
        title="Easy to use"
        iconLink="/svg/double-arrow-right.svg"
        description="Voters only need to copy and paste a 4 letter code into the twitch chat to authenticate themselves and validate their votes."
      ></Section>
      <Section
        title="Configurable"
        iconLink="/svg/wrench.svg"
        description="You can configure vote changes, twitch code security and much more."
      ></Section>
    </SafeHSpace>
  );
};
