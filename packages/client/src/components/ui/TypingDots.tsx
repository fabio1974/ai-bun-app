const TypingDots = () => (
    <div className="flex items-center ml-2">
        <span
            className="dot bg-gray-400 animate-bounce-dot"
            style={{ animationDelay: '0s' }}
        />
        <span
            className="dot bg-gray-400 animate-bounce-dot"
            style={{ animationDelay: '0.2s' }}
        />
        <span
            className="dot bg-gray-400 animate-bounce-dot"
            style={{ animationDelay: '0.4s' }}
        />
        <style>
            {`
            .dot {
                display: inline-block;
                width: 6px;
                height: 6px;
                border-radius: 50%;
                margin-right: 4px;
                opacity: 0.7;
            }
            @keyframes bounce-dot {
                0%, 80%, 100% { transform: scale(1); opacity: 0.7; }
                40% { transform: scale(1.5); opacity: 1; }
            }
            .animate-bounce-dot {
                animation: bounce-dot 1.2s infinite;
            }
            `}
        </style>
    </div>
);

export default TypingDots;
