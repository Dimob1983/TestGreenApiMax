import './ChatHeader.css';

function ChatHeader({ phoneNumber, onLogout, status }) {
    return (
        <header className="chat-header">
            <div className="chat-header__info">
                <div className="chat-header__avatar">
                    {phoneNumber?.[0] || '?'}
                </div>
                <div className="chat-header__text">
                    <div className="chat-header__name">{phoneNumber || 'Без имени'}</div>
                    {status && <div className="chat-header__status">{status}</div>}
                </div>
            </div>

            <button
                className="chat-header__logout"
                onClick={onLogout}
                title="Выйти"
            >
                Выйти
            </button>
        </header>
    );
}

export default ChatHeader;