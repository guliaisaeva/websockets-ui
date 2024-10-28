import { RawData, WebSocket, WebSocketServer } from 'ws';
import { httpServer } from '../http_server/index';
import { handleMessage } from './messageHandler';

export const wssetup = new WebSocketServer({ server: httpServer });

wssetup.on('connection', (ws: WebSocket) => {
  console.log('WebSocket client connected.');

  ws.send(
    JSON.stringify({
      message: 'Welcome to the WebSocket server,Websocket client connected!',
      status: 'connected',
    }),
  );

  ws.on('message', (message: RawData) => {
    const msgString =
      typeof message === 'string' ? message : message.toString();
    console.log('Received message:', msgString);

    try {
      handleMessage(msgString, ws, wssetup);
    } catch (error) {
      console.error('Error processing message:', error);
    }
  });

  ws.on('close', () => {
    console.log('WebSocket client disconnected.');
  });
});
