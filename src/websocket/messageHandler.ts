import WebSocket from 'ws';
import { createGameRoom, addPlayerToRoom } from '../room/room';
import { registerPlayer } from '../users/player';
import { addShips, handleAttack, startGame } from '../ships/ships';

export const handleConnection = (socket: WebSocket) => {
  socket.send(JSON.stringify({ message: 'Welcome to Battleship!' }));
};

export const handleMessage = (
  message: string,
  socket: WebSocket,
  server: WebSocket.Server,
) => {
  const parsedMessage = JSON.parse(message);
  switch (parsedMessage.type) {
    case 'reg':
      const registrationResponse = registerPlayer(
        parsedMessage.data.name,
        parsedMessage.data.password,
      );
      socket.send(JSON.stringify(registrationResponse));
      break;
    case 'create_room':
      const createdRoom = createGameRoom(parsedMessage.data.player);
      socket.send(JSON.stringify({ type: 'room_created', data: createdRoom }));
      break;
    case 'add_user_to_room':
      const addUserResponse = addPlayerToRoom(
        parsedMessage.data.roomId,
        parsedMessage.data.player,
      );
      socket.send(JSON.stringify(addUserResponse));
      break;
    case 'start_game':
      const startGameResponse = startGame(parsedMessage.data.gameId);
      socket.send(JSON.stringify(startGameResponse));
      break;
    case 'add_ships':
      const shipsResponse = addShips(
        parsedMessage.data.gameId,
        parsedMessage.data.ships,
        parsedMessage.data.indexPlayer,
      );
      if (shipsResponse) {
        socket.send(JSON.stringify(shipsResponse));
      }
      break;
    case 'attack':
      try {
        const attackResponse = handleAttack(
          parsedMessage.data.gameId,
          parsedMessage.data.indexPlayer,
          parsedMessage.data.x,
          parsedMessage.data.y,
        );
        socket.send(JSON.stringify(attackResponse));
      } catch (error: any) {
        console.error(error.message);
      }
      break;
    default:
      console.error('Unknown message type:', parsedMessage.type);
  }
};
