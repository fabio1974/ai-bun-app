import { Button } from './ui/button';
import { AiOutlineArrowUp } from 'react-icons/ai';
import { useForm } from 'react-hook-form';
import axios from 'axios';

type ChatForm = {
    message: string;
};

type ChatResponse = {
    message: string;
    role: 'user' | 'bot';
};

type ChatInputProps = {
    loading: boolean;
    setMessages: React.Dispatch<React.SetStateAction<ChatResponse[]>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    conversationIdRef: React.RefObject<string>;
};

const MAX_LENGTH = 200;

const ChatInput: React.FC<ChatInputProps> = ({
    loading,
    setMessages,
    setLoading,
    conversationIdRef,
}) => {
    const form = useForm<ChatForm>({ mode: 'onChange' });
    const { register, formState, watch, reset, handleSubmit } = form;
    const messageValue = watch('message', '');

    const onSubmit = async (data: ChatForm) => {
        setLoading(true);
        try {
            setMessages((prev) => [
                ...prev,
                { message: data.message, role: 'user' },
            ]);
            reset();
            const response = await axios.post<{ message: string }>(
                '/api/chat',
                {
                    prompt: data.message,
                    conversationId: conversationIdRef.current,
                }
            );
            setMessages((prev) => [
                ...prev,
                { message: response.data.message, role: 'bot' },
            ]);
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            setLoading(false);
        }
    };

    const onKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(onSubmit)();
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            onKeyDown={onKeyDown}
            className="w-full border-2 border-gray-300 rounded-lg bg-white flex flex-col items-center px-2 py-2 mt-4"
        >
            <textarea
                className="mb-1 p-2 outline-none border-none resize-none rounded w-full"
                autoFocus
                rows={3}
                placeholder="Type your message...!"
                maxLength={MAX_LENGTH}
                {...register('message', {
                    required: true,
                    validate: (value) => value.trim().length > 0,
                })}
            />
            <div className="flex w-full justify-end mb-1 text-xs text-gray-500">
                {messageValue.length}/{MAX_LENGTH}
            </div>
            <div className="flex w-full justify-end">
                <Button
                    disabled={
                        loading || formState.isSubmitting || !formState.isValid
                    }
                    type="submit"
                    className="flex items-center justify-center border-2 border-blue-500 rounded-full w-9 h-9 p-0"
                >
                    <AiOutlineArrowUp size={20} />
                </Button>
            </div>
        </form>
    );
};

export default ChatInput;
