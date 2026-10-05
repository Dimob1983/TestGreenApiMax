import { useEffect, useRef } from 'react';
import { receiveNotification, deleteNotification } from '../api/greenApi';

export function usePolling({ idInstance, apiTokenInstance, chatId, onNewMessage }) {
    const isRunningRef = useRef(false);
    const onNewMessageRef = useRef(onNewMessage);

    useEffect(() => {
        onNewMessageRef.current = onNewMessage;
    }, [onNewMessage]);

    useEffect(() => {
        if (!idInstance || !apiTokenInstance || !chatId) return;

        isRunningRef.current = true;

        const poll = async () => {
            if (!isRunningRef.current) return;

            try {
                const notification = await receiveNotification(idInstance, apiTokenInstance);



                if (notification && notification.body) {
                    await deleteNotification(idInstance, apiTokenInstance, notification.receiptId);

                    const body = notification.body;

                    if (
                        body.typeWebhook === 'incomingMessageReceived' &&
                        body.messageData?.typeMessage === 'textMessage'
                    ) {
                        const messageChatId = body.senderData?.chatId;
                        const text = body.messageData.textMessageData?.textMessage;



                        if (messageChatId == chatId && text) {
                            onNewMessageRef.current(text);
                        }
                    }
                }
            } catch (error) {
                console.error('Polling error:', error);
                await new Promise((resolve) => setTimeout(resolve, 5000));
            }

            if (isRunningRef.current) {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                poll();
            }
        };

        poll();

        return () => {
            isRunningRef.current = false;
        };
    }, [idInstance, apiTokenInstance, chatId]);
}