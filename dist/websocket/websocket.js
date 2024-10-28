"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wssetup = void 0;
const ws_1 = require("ws");
const index_1 = require("../http_server/index");
const handleRegistr_1 = require("../utils/handleRegistr");
exports.wssetup = new ws_1.WebSocketServer({ server: index_1.httpServer });
exports.wssetup.on('connection', (ws) => {
    console.log('WebSocket client connected.');
    ws.send(JSON.stringify({
        message: 'Welcome to the WebSocket server,Websocket client connected!',
        status: 'connected',
    }));
    ws.on('message', (message) => {
        console.log('Received:', message);
        const { type, data, id } = JSON.parse(message);
        if (type === 'reg') {
            (0, handleRegistr_1.handleRegistration)(data, ws, id);
        }
        else if (type === 'login') {
            handleLogin(data, ws, id);
        }
    });
    ws.on('close', () => {
        console.log('WebSocket client disconnected.');
    });
});
