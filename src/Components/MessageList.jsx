import { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import './MessageList.css';

function MessageList({ messages }) {
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    if (messages.length === 0) {
        return (
            <div className="message-list message-list--empty">
                <p>Нет сообщений. Напишите первым!</p>
            </div>
        );
    }

    return (
        <div className="message-list">
            {messages.map((msg) => (
                <MessageBubble
                    key={msg.id}
                    text={msg.text}
                    isMine={msg.isMine}
                    time={msg.time}
                />
            ))}
            <div ref={bottomRef} />
        </div>
    );
}

export default MessageList;