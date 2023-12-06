import NextAuth, { DefaultSession } from 'next-auth';

// add id to the user object of the session interface
declare module 'next-auth' {
  interface Session {
    firebaseToken?: string;
    user: {
      id: string;
    } & DefaultSession['user'];
  }
}
