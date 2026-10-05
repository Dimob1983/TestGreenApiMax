import { useState } from 'react';
import LoginForm from './Components/LoginForm';
import ChatWindow from './Components/ChatWindow';
import './App.css';

function App() {
    const [auth, setAuth] = useState(() => {
        const saved = localStorage.getItem('greenAuth');
        return saved ? JSON.parse(saved) : null;
    });

    const handleLogin = (data) => {
        localStorage.setItem('greenAuth', JSON.stringify(data));
        setAuth(data);
    };

    const handleLogout = () => {
        localStorage.removeItem('greenAuth');
        setAuth(null);
    };

    if (!auth) {
        return <LoginForm onLogin={handleLogin} />;
    }

    return (
        <ChatWindow
            idInstance={auth.idInstance}
            apiTokenInstance={auth.apiTokenInstance}
            onLogout={handleLogout}
        />
    );
}

export default App;