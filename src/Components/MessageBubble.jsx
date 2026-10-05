import './MessageBubble.css';

function MessageBubble({ text, isMine, time }) {
    return (
        <div className={`message-bubble ${isMine ? 'message-bubble--mine' : 'message-bubble--theirs'}`}>
            <div className="message-bubble__text">{text}</div>
            {time && <div className="message-bubble__time">{time}</div>}
        </div>
    );
}

export default MessageBubble;