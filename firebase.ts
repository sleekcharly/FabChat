// pull in necessary dependencies
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
  apiKey: 'AIzaSyB00ztkBvGcKt0tXh3VWAvo76fVj41WAKM',
  authDomain: 'fabchat-9e5b1.firebaseapp.com',
  projectId: 'fabchat-9e5b1',
  storageBucket: 'fabchat-9e5b1.appspot.com',
  messagingSenderId: '625441821306',
  appId: '1:625441821306:web:77becd2bfc5157283321c3',
};

// check if the app is already initialized
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);

export { db, auth, functions };
