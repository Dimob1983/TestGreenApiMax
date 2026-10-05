import { useState } from 'react';
import './MessageInput.css';

function MessageInput({ onSend, disabled }) {
    const [text, setText] = useState('');

    const handleSend = () => {
        const trimmed = text.trim();
        if (!trimmed || disabled) return;

        onSend(trimmed);
        setText('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="message-input">
            <textarea
                className="message-input__field"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Введите сообщение..."
                rows={1}
                disabled={disabled}
            />
            <button
                className="message-input__send"
                onClick={handleSend}
                disabled={disabled || !text.trim()}
                title="Отправить"
            >
                ➤
            </button>
        </div>
    );
}

export default MessageInput;