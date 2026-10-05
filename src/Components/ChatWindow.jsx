import { useState, useCallback, useEffect } from 'react';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { sendMessage, getStateInstance } from '../api/greenApi';
import { usePolling } from '../hooks/usePolling';
import './ChatWindow.css';

function ChatWindow({ idInstance, apiTokenInstance, onLogout }) {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [chatId, setChatId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [isSending, setIsSending] = useState(false);
    const [status, setStatus] = useState('');
    const [error, setError] = useState('');

    const createChat = () => {
        const cleaned = phoneNumber.replace(/\D/g, '');
        if (!cleaned) {
            setError('Введите номер телефона');
            return;
        }
        setError('');
        setChatId(`${cleaned}@c.us`);
        setMessages([]);
    };

    useEffect(() => {
        getStateInstance(idInstance, apiTokenInstance)
            .then((data) => {
                if (data.stateInstance === 'authorized') {
                    setStatus('в сети');
                } else {
                    setStatus(`статус: ${data.stateInstance}`);
                }
            })
            .catch(() => setStatus('нет связи с GREEN-API'));
    }, [idInstance, apiTokenInstance]);

    const handleIncoming = useCallback((text) => {
        setMessages((prev) => [
            ...prev,
            { id: `in-${Date.now()}-${Math.random()}`, text, isMine: false },
        ]);
    }, []);

    usePolling({
        idInstance,
        apiTokenInstance,
        chatId,
        onNewMessage: handleIncoming,
    });

    const handleSend = async (text) => {
        if (!chatId) return;

        const tempId = `out-${Date.now()}`;
        setMessages((prev) => [...prev, { id: tempId, text, isMine: true }]);
        setIsSending(true);

        try {
            await sendMessage(idInstance, apiTokenInstance, chatId, text);
        } catch (err) {
            console.error('Send error:', err);
            setError('Не удалось отправить сообщение');
        } finally {
            setIsSending(false);
        }
    };

    const handleLogout = () => {
        onLogout();
    };

    if (!chatId) {
        return (
            <div className="chat-window chat-window--setup">
                <div className="chat-setup">
                    <h2>Новый чат</h2>
                    <p>Введите номер телефона получателя в формате 79991234567</p>
                    <label>
                        Номер телефона
                        <input
                            type="tel"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && createChat()}
                            placeholder="79991234567"
                            autoComplete="off"
                        />
                    </label>
                    {error && <div className="chat-setup__error">{error}</div>}
                    <div className="chat-setup__actions">
                        <button onClick={createChat}>Создать чат</button>
                        <button className="chat-setup__logout" onClick={handleLogout}>
                            Выйти
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="chat-window">
            <ChatHeader
                phoneNumber={phoneNumber}
                onLogout={handleLogout}
                status={status}
            />
            <MessageList messages={messages} />
            <MessageInput onSend={handleSend} disabled={isSending} />
            {error && <div className="chat-window__error">{error}</div>}
        </div>
    );
}

export default ChatWindow;