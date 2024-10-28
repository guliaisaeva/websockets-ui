export type PersonalResponse = {
  message: string;
  status: string;
};

export type RegistrationResponse = {
  status: 'success' | 'error';
  message: string;
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
