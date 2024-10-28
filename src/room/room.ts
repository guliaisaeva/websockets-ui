interface Player {
  name: string;
  password: string;
  index: number | string;
}

interface Room {
  id: number | string;
  players: Player[];
  gameStarted: boolean;
}

const roomsDB: Room[] = [];

export const createGameRoom = (player: Player) => {
  const newRoomId = roomsDB.length + 1;

  const newRoom: Room = {
    id: newRoomId,
    players: [player],
    gameStarted: false,
  };

  roomsDB.push(newRoom);

  return newRoom;
};

export const addPlayerToRoom = (roomId: number | string, player: Player) => {
  const room = roomsDB.find((r) => r.id === roomId);

  if (room) {
    if (room.gameStarted) {
      return {
        success: false,
        message: 'Cannot add player, game has already started.',
      };
    }

    if (room.players.some((p) => p.name === player.name)) {
      return {
        success: false,
        message: 'Player is already in the room.',
      };
    }

    room.players.push(player);

    return {
      success: true,
      message: 'Player added successfully.',
      room: room,
    };
  }

  return {
    success: false,
    message: 'Room not found.',
  };
};
