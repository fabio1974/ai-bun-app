import TypingDots from './ui/TypingDots';

type ChatResponse = {
    message: string;
    role: 'user' | 'bot';
};

type ChatMessagesProps = {
    messages: ChatResponse[];
    loading: boolean;
    chatContainerRef: React.RefObject<HTMLDivElement>;
};

const ChatMessages: React.FC<ChatMessagesProps> = ({
    messages,
    loading,
    chatContainerRef,
}) => (
    <div
        ref={chatContainerRef}
        className="flex-1 w-full overflow-y-auto flex flex-col gap-2 border-2 border-gray-300 rounded-lg px-2 py-2 scrollbar-hide"
        style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
        }}
    >
        {messages.map((msg, idx) => (
            <div
                key={idx}
                className={`p-2 max-w-[80%] flex items-end ${
                    msg.role === 'user'
                        ? 'bg-blue-500 text-white self-end rounded-2xl rounded-br-sm'
                        : 'bg-gray-200 text-gray-900 self-start rounded-2xl rounded-bl-sm'
                }`}
            >
                {msg.message}
            </div>
        ))}
        {loading && (
            <div className="p-2 max-w-[80%] flex items-end bg-gray-200 text-gray-900 self-start rounded-2xl rounded-bl-sm">
                <TypingDots />
            </div>
        )}
    </div>
);

export default ChatMessages;
