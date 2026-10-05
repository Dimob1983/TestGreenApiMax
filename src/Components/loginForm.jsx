import { useState } from 'react';
import './LoginForm.css';

function LoginForm({ onLogin }) {
  const [idInstance, setIdInstance] = useState('');
  const [apiTokenInstance, setApiTokenInstance] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!idInstance.trim() || !apiTokenInstance.trim()) {
      setError('Заполните оба поля');
      return;
    }


    onLogin({
      idInstance: idInstance.trim(),
      apiTokenInstance: apiTokenInstance.trim(),
    });
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Вход в GREEN-API</h1>
        <p className="login-subtitle">
          Введите данные вашего инстанса из личного кабинета GREEN-API
        </p>

        <label>
          idInstance
          <input
            type="text"
            value={idInstance}
            onChange={(e) => setIdInstance(e.target.value)}
            placeholder="idInstance из ЛК green-api"
            autoComplete="off"
          />
        </label>

        <label>
          apiTokenInstance
          <input
            type="text"
            value={apiTokenInstance}
            onChange={(e) => setApiTokenInstance(e.target.value)}
            placeholder="Вставьте токен инстанса"
            autoComplete="off"
          />
        </label>

        {error && <div className="login-error">{error}</div>}

        <button type="submit">Войти</button>
      </form>
    </div>
  );
}

export default LoginForm;