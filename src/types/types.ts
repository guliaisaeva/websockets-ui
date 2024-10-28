export type RegData = {
  name: string;
  password: string;
};

export interface Position {
  x: number;
  y: number;
}

export interface Ship {
  id: string;
  name: string;
  size: number;
  position: Position;
  orientation: 'horizontal' | 'vertical';
}

export interface Player {
  id: string;
  name: string;
  ships: Ship[];
  socket: WebSocket;
}

export interface Game {
  id: string;
  players: Player[];
  currentPlayerIndex: number;
}
export type User = {
  id: string;
  name: string;
  password: string;
  sessionId: SessionId;
};
export type SessionId = string;

export type PersonalResponse = {
  message: string;
  status: string;
};

export type RegistrationResponse = {
  status: 'success' | 'error';
  message: string;
  userId?: string;
};
export type LoginResponse = {
  status: 'success' | 'error';
  message: string;
  userId?: string;
};

export type CreateGameResponse = {
  gameId: string;
  playerId: string;
};

export type StartGameResponse = {
  gameId: string;
  playerShips: any[];
};

export type TurnResponse = {
  currentPlayerId: string;
};

export type AttackResponse = {
  coordinates: { x: number; y: number };
  status: 'hit' | 'miss';
};

export type FinishResponse = {
  winnerId: string;
};

export type UpdateRoomResponse = {
  rooms: Array<{ roomId: string; players: string[] }>;
};

export type UpdateWinnersResponse = {
  winners: Array<{ playerId: string; score: number }>;
};
