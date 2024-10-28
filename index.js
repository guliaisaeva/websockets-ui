import { httpServer } from './src/http_server/index.ts';
import { wssetup } from './src/websocket/websocket.ts';
import * as dotenv from 'dotenv';

dotenv.config();
const HTTP_PORT = process.env.HTTP_PORT || 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT, () => {
  console.log(`HTTP server is listening on port ${HTTP_PORT}`);
});

const shutdown = () => {
  console.log('Shutting down server...');
  wssetup.clients.forEach((client) => client.close());
  wssetup.close(() => console.log('WebSocket server closed.'));
  httpServer.close(() => console.log('HTTP server closed.'));
  process.exit(0);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
