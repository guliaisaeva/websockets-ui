import * as fs from 'fs';
import * as path from 'path';
import * as http from 'http';
import { WebSocketServer, WebSocket } from 'ws';

export const httpServer = http.createServer(function (req, res) {
  const __dirname = path.resolve(path.dirname(''));
  const file_path =
    __dirname + (req.url === '/' ? '/front/index.html' : '/front' + req.url);
  fs.readFile(file_path, function (err, data) {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    res.writeHead(200);
    res.end(data);
  });
});

const wssetup = new WebSocketServer({ server: httpServer });

wssetup.on('connection', (ws) => {
  console.log('WebSocket client connected.');
  ws.send(
    JSON.stringify({
      message: 'WebSocket connection established',
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

export { wssetup };
