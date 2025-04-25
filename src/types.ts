export interface Player {
  id: string;
  name: string;
  score: number;
  isWinner: boolean;
}

export interface Round {
  id: string;
  playerScores: {
    playerId: string;
    score: number;
  }[];
  timestamp: number;
}

export interface Game {
  id: string;
  players: Player[];
  rounds: Round[];
  targetScore: number;
  completed: boolean;
  winner?: string;
  createdAt: number;
}

export interface GameState {
  currentGame: Game | null;
  gameHistory: Game[];
}