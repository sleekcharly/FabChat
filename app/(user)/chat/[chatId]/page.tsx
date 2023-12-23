import { authOptions } from '@/auth';
import ChatInput from '@/components/ChatInput';
import ChatMessages from '@/components/ChatMessages';
import { sortedMessagesRef } from '@/lib/converters/Message';
import { getDocs } from 'firebase/firestore';
import { getServerSession } from 'next-auth';
import React from 'react';

type Props = {
  params: {
    chatId: string;
  };
};

async function ChatPage({ params: { chatId } }: Props) {
  // get the user's session
  const session = await getServerSession(authOptions);

  // initial message
  const initialMessages = (await getDocs(sortedMessagesRef(chatId))).docs.map(
    (doc) => doc.data(),
  );

  return (
    <>
      {/* char messages */}
      <div className="flex-1">
        <ChatMessages
          chatId={chatId}
          session={session}
          initialMessages={initialMessages}
        />
      </div>

      <ChatInput chatId={chatId} />
    </>
  );
}

export default ChatPage;
