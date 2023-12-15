'use client';

import { subscriptionRef } from '@/lib/converters/Subscription';
import { useSubscriptionStore } from '@/store/store';
import { onSnapshot } from 'firebase/firestore';
// get session
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

type Props = { children: React.ReactNode };

function SubscriptionProvider({ children }: Props) {
  const { data: session } = useSession();

  // get setSubscription from zustand store
  const setSubscription = useSubscriptionStore(
    (state) => state.setSubscription,
  );

  useEffect(() => {
    if (!session) return;

    return onSnapshot(
      subscriptionRef(session?.user.id),
      (snapshot) => {
        if (snapshot.empty) {
          console.log('User has no subscription');
          // set no subscription
          setSubscription(null);
        } else {
          console.log('User has subscription');

          // set subscription
          setSubscription(snapshot.docs[0].data());
        }
      },
      (error) => {
        console.log('Error getting document:', error);
      },
    );
  }, [session, setSubscription]);

  return <>{children}</>;
}

export default SubscriptionProvider;
