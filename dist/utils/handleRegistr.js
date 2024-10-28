"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleRegistration = handleRegistration;
// In-memory database for players
const players = new Map();
function handleRegistration(ws, data, id) {
    const { name, password } = data;
    let player = Array.from(players.values()).find((p) => p.name === name);
    if (player) {
        if (player.password !== password) {
            ws.send(JSON.stringify({
                type: 'reg',
                data: {
                    name,
                    index: id,
                    error: true,
                    errorText: 'Invalid password',
                },
                id: 0,
            }));
            return;
        }
        player.ws = ws; // Update the WebSocket connection
    }
    else {
        // Register new player
        players.set(name, { name, password, ws });
    }
    // Respond with success
    ws.send(JSON.stringify({
        type: 'reg',
        data: {
            name,
            index: id,
            error: false,
            errorText: '',
        },
        id: 0,
    }));
    console.log(`Player registered: ${name}`);
}
