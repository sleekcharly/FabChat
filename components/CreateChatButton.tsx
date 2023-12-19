'use client';

import React, { useState } from 'react';
import { Button } from './ui/button';
import { MessageSquarePlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useToast } from './ui/use-toast';
import { useSubscriptionStore } from '@/store/store';
import LoadingSpinner from './LoadingSpinner';
import { v4 as uuidv4 } from 'uuid';
import { serverTimestamp, setDoc } from 'firebase/firestore';
import { addChatRef } from '@/lib/converters/ChatMembers';

type Props = {
  isLarge?: boolean;
};

const CreateChatButton = ({ isLarge }: Props) => {
  const router = useRouter();

  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const subscription = useSubscriptionStore((state) => state.subscription);

  const createNewChat = async () => {
    // all the chat logic here
    if (!session?.user.id) return;

    setLoading(true);

    toast({
      title: 'Creating new Chat...',
      description: 'Hold on tight while we create your new chat...',
      duration: 3000,
    });

    // todo check if user is pro and limit them creating a new chat

    // generate a chat id
    const chatId = uuidv4();

    // the new chat
    await setDoc(addChatRef(chatId, session.user.id), {
      userId: session.user.id!,
      email: session.user.email!,
      timestamp: serverTimestamp(),
      isAdmin: true,
      chatId: chatId,
      image: session.user.image || '',
    })
      .then(() => {
        // push the use to the chat page
        toast({
          title: 'Success',
          description: 'Your chat has been created',
          className: 'bg-green-600 text-white',
          duration: 3000,
        });

        router.push(`/chat/${chatId}`);
      })
      .catch((error) => {
        console.error(error);
        toast({
          title: 'Error',
          description: 'There was an error creating your chat!',
          variant: 'destructive',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (isLarge)
    return (
      <div>
        <Button variant={'default'} onClick={createNewChat}>
          {loading ? <LoadingSpinner /> : 'Create a New Chat'}
        </Button>
      </div>
    );

  return (
    <Button variant="ghost" onClick={createNewChat}>
      <MessageSquarePlusIcon />
    </Button>
  );
};

export default CreateChatButton;
