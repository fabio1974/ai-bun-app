import { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

type ChatResponse = {
    message: string;
    role: 'user' | 'bot';
};

const ChatBox = () => {
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState<ChatResponse[]>([]);

    const conversationIdRef = useRef<string>(uuidv4());
    const chatContainerRef = useRef<HTMLDivElement>(null!);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop =
                chatContainerRef.current.scrollHeight;
        }
    }, [messages, loading]);

    return (
        <div className="flex flex-col h-[90vh] w-full overflow-hidden">
            <ChatMessages
                messages={messages}
                loading={loading}
                chatContainerRef={chatContainerRef}
            />
            <ChatInput
                loading={loading}
                setMessages={setMessages}
                setLoading={setLoading}
                conversationIdRef={conversationIdRef}
            />
        </div>
    );
};

export default ChatBox;
