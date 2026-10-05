const API_URL = 'https://3100.api.green-api.com';


export async function getStateInstance(idInstance, apiTokenInstance) {
    const url = `${API_URL}/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Ошибка ${response.status}: не удалось получить состояние инстанса`);
    }

    const text = await response.text();
    
    if (!text || text.trim() === '') {
        return null;
    }

    return JSON.parse(text);
}


export async function sendMessage(idInstance, apiTokenInstance, chatId, message) {
    const url = `${API_URL}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ chatId, message }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Ошибка отправки: ${response.status} — ${errorText}`);
    }

    return response.json();
}


export async function receiveNotification(idInstance, apiTokenInstance) {
    const url = `${API_URL}/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`;
    const response = await fetch(url);

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Ошибка получения: ${response.status} — ${errorText}`);
    }

    const text = await response.text();
     
    if (!text || text.trim() === '') {
        return null;
    }
    return JSON.parse(text);
}

export async function deleteNotification(idInstance, apiTokenInstance, receiptId) {
    const url = `${API_URL}/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`;

    const response = await fetch(url, { method: 'DELETE' });

    if (!response.ok) {
        throw new Error(`Ошибка удаления уведомления: ${response.status}`);
    }

    return response.json();
}