import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Navbar } from '../components/Navbar';
import { SafeHSpace } from '../components/SafeHSpace';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <SafeHSpace>
        <Navbar></Navbar>
      </SafeHSpace>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
