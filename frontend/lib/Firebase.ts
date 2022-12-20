import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyBOGPZy77GIwQZ4BcV_K4lwJGC6QDenKxM',
  authDomain: 'pollboxx.firebaseapp.com',
  projectId: 'pollboxx',
  storageBucket: 'pollboxx.appspot.com',
  messagingSenderId: '594814872663',
  appId: '1:594814872663:web:349d8a748a834aab844712',
  measurementId: 'G-B33ZVVFBME',
};

export const firebase = initializeApp(firebaseConfig);
