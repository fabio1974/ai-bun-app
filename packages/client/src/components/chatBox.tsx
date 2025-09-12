import { Button } from './ui/button';
import { AiOutlineArrowUp } from 'react-icons/ai';

const ChatBox = () => {
    return (
        <div className="flex flex-col items-center border-2 border-gray-300 rounded-lg p-6 w-full">
            <textarea
                className="mb-4 p-2 outline-none border-none resize-none rounded w-full"
                rows={4}
                placeholder="Type your message...!"
            />
            <div className="flex w-full justify-end">
                <Button className="flex items-center justify-center border-2 border-blue-500 rounded-full w-9 h-9 p-0">
                    <AiOutlineArrowUp size={20} />
                </Button>
            </div>
        </div>
    );
};

export default ChatBox;
