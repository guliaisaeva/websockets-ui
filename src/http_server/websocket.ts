import { WebSocket, WebSocketServer } from 'ws';
import { httpServer } from '../http_server/index';

export const wssetup = new WebSocketServer({ server: httpServer });

wssetup.on('connection', (ws: WebSocket) => {
  console.log('WebSocket client connected.');

  ws.send(
    JSON.stringify({
      message: 'Welcome to the WebSocket server,Websocket client connected!',
      status: 'connected',
    }),
  );

  ws.on('message', (message) => {
    const command = message.toString();
    console.log(`Received command: ${command}`);

    const response = { command, result: `Result for command: ${command}` };
    ws.send(JSON.stringify(response));
  });

  ws.on('close', () => {
    console.log('WebSocket client disconnected.');
  });
});
