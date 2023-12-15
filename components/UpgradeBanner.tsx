'use client';

import { useSubscriptionStore } from '@/store/store';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Button } from './ui/button';

type Props = {};

function UpgradeBanner({}: Props) {
  const subscription = useSubscriptionStore((state) => state.subscription);
  const isPro = subscription?.role === 'pro';
  const router = useRouter();

  if (subscription === undefined || isPro) return null;

  return (
    <Button
      onClick={() => router.push('/register')}
      className="w-full rounded-none bg-gradient-to-r from-[#777506] to-[#E935c1] text-center text-white px-5 py-2 hover:from-[#777506] hover:to-[#E935C1] hover:shadow-md hover:opacity-75 transition-all"
    >
      Upgrade to Pro to unlock all features
    </Button>
  );
}

export default UpgradeBanner;
