// ships.ts
import { Game, Player } from '../types/types'; // Assuming you have types for Game and Player

const ongoingGames: Game[] = [];

export const startGame = (
  gameId: string,
): { type: string; data: any; id: number } => {
  const game = ongoingGames.find((g) => g.id === gameId);
  if (!game || game.players.length < 2) {
    throw new Error('Game cannot start without two players');
  }

  const response = {
    type: 'start_game',
    data: {
      ships: game.players.map((player) => player.ships),
      currentPlayerIndex: game.currentPlayerIndex,
    },
    id: 0,
  };
  game.players.forEach((player) =>
    player.socket.send(JSON.stringify(response)),
  );
  return response;
};

export const addShips = (
  gameId: string,
  indexPlayer: string,
  ships: any[],
): { type: string; data: any; id: number } => {
  const game = ongoingGames.find((g) => g.id === gameId);
  const player = game?.players.find((p) => p.id === indexPlayer);

  if (!player) {
    throw new Error('Player not found in game');
  }

  player.ships = ships;

  if (game?.players.every((p) => p.ships.length > 0)) {
    startGame(gameId);
  }

  return {
    type: 'add_ships',
    data: {
      indexPlayer,
      ships,
    },
    id: 0,
  };
};

export const handleAttack = (
  gameId: string,
  indexPlayer: string,
  x: number,
  y: number,
): { type: string; data: any; id: number } => {
  const game = ongoingGames.find((g) => g.id === gameId);
  if (!game) {
    throw new Error('Game not found');
  }

  const currentPlayer = game.players[game.currentPlayerIndex];
  const targetPlayer = game.players.find((p) => p.id !== indexPlayer);

  if (!targetPlayer) {
    throw new Error('Target player not found');
  }

  const hitShip = targetPlayer.ships.find(
    (ship) => ship.position.x === x && ship.position.y === y,
  );

  let status: 'miss' | 'killed' | 'shot' = 'miss';

  if (hitShip) {
    targetPlayer.ships = targetPlayer.ships.filter((ship) => ship !== hitShip);
    status = targetPlayer.ships.length === 0 ? 'killed' : 'shot';
  }

  const attackResponse = {
    type: 'attack',
    data: {
      position: { x, y },
      currentPlayer: indexPlayer,
      status,
    },
    id: 0,
  };

  game.players.forEach((player) =>
    player.socket.send(JSON.stringify(attackResponse)),
  );

  if (status !== 'killed') {
    game.currentPlayerIndex =
      (game.currentPlayerIndex + 1) % game.players.length;
  }

  if (targetPlayer.ships.length === 0) {
    const finishResponse = {
      type: 'finish',
      data: {
        winPlayer: currentPlayer.id,
      },
      id: 0,
    };
    game.players.forEach((player) =>
      player.socket.send(JSON.stringify(finishResponse)),
    );
  }

  return attackResponse;
};
