import React, { useContext, useEffect, useRef } from 'react';
import { SessionMessage } from './SessionMessage';
import { ResponseTransformer, Session } from './types';
import { SessionsContext } from './SessionsContext';
import { cn, DateFormat } from 'reablocks';

interface SessionMessagesProps {
  /**
   * Session to display.
   */
  session: Session;

  /**
   * Response transformers to apply to the response.
   */
  responseTransformers?: ResponseTransformer[];
}

export const SessionMessages: React.FC<SessionMessagesProps> = ({
  session,
  responseTransformers
}) => {
  const { theme } = useContext(SessionsContext);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [session]);

  return (
    <div className={cn(theme.messages.base)}>
      <header className={cn(theme.messages.header)}>
        <h2 className={cn(theme.messages.title)}>
          {session.title}
        </h2>
        <DateFormat date={session.createdAt} />
      </header>
      <div className={cn(theme.messages.content)} ref={contentRef}>
        {session.conversations.map((conversation) => (
          <SessionMessage
            key={conversation.id}
            question={conversation.question}
            response={conversation.response || ''}
            responseTransformers={responseTransformers}
          />
        ))}
      </div>
    </div>
  );
};
