'use client';

import { db } from '@/firebase';
import { addDoc, collection, onSnapshot } from '@firebase/firestore';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import LoadingSpinner from './LoadingSpinner';
import { useSubscriptionStore } from '@/store/store';
import ManageAccountButton from './ManageAccountButton';

type Props = {};

const CheckoutButton = (props: Props) => {
  // return if  user is not logged in
  const { data: session } = useSession();

  // component's state
  const [loading, setLoading] = useState(false);

  // check for subscription
  const subscription = useSubscriptionStore((state) => state.subscription);

  const isLoadingSubscription = subscription === undefined;

  const isSubscribed =
    subscription?.status === 'active' && subscription?.role === 'pro';

  const createCheckoutSession = async () => {
    if (!session?.user.id) return;

    setLoading(true);

    // push document to firestore
    const docRef = await addDoc(
      collection(db, 'customers', session.user.id, 'checkout_sessions'),
      {
        price: 'price_1OKmtDJTXFcxpdPeGjRVDQN8',
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      },
    );
    // ... stripe extension on firebase will create a checkout session
    return onSnapshot(docRef, (snap) => {
      const data = snap.data();
      const url = data?.url;
      const error = data?.error;

      if (error) {
        // show an error to the customer and
        // inspect your cloud function logs in the firebase console
        alert(`An error occurred: ${error.message}`);
        setLoading(false);
      }

      if (url) {
        // we have a stripe checkout url, let's redirect.
        window.location.assign(url);
        setLoading(false);
      }
    });
  };

  return (
    <div className="flex flex-col space-y-2">
      {/* If subscribed, show the user is subscribed */}
      <div className="mt-8 block rounded-md bg-indigo-600 px-3.5 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer disabled:opacity-80 disabled:bg-indigo-600/50 disabled:text-white   disabled:cursor-default">
        {isSubscribed ? (
          <ManageAccountButton />
        ) : isLoadingSubscription || loading ? (
          <LoadingSpinner />
        ) : (
          <button type="button" onClick={() => createCheckoutSession()}>
            Sign Up
          </button>
        )}
      </div>
    </div>
  );
};

export default CheckoutButton;
