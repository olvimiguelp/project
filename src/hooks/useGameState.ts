import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useLocalStorage from './useLocalStorage';
import { GameState, Game, Player, Round } from '../types';

const DEFAULT_TARGET_SCORE = 100;

const initialGameState: GameState = {
  currentGame: null,
  gameHistory: [],
};

export default function useGameState() {
  const [gameState, setGameState] = useLocalStorage<GameState>('dominoGameState', initialGameState);

  // Create a new game
  const createGame = useCallback((players: string[], targetScore: number = DEFAULT_TARGET_SCORE) => {
    const newPlayers: Player[] = players.map((name) => ({
      id: uuidv4(),
      name,
      score: 0,
      isWinner: false,
    }));

    const newGame: Game = {
      id: uuidv4(),
      players: newPlayers,
      rounds: [],
      targetScore,
      completed: false,
      createdAt: Date.now(),
    };

    setGameState((prev) => ({
      ...prev,
      currentGame: newGame,
    }));

    return newGame;
  }, [setGameState]);

  // Add scores for a round
  const addRound = useCallback((playerScores: Record<string, number>) => {
    if (!gameState.currentGame) return;

    const roundScores: Round['playerScores'] = Object.entries(playerScores).map(
      ([playerId, score]) => ({
        playerId,
        score,
      })
    );

    const newRound: Round = {
      id: uuidv4(),
      playerScores: roundScores,
      timestamp: Date.now(),
    };

    // Calculate new scores and check for winner
    const updatedPlayers = gameState.currentGame.players.map((player) => {
      const roundScore = playerScores[player.id] || 0;
      const newScore = player.score + roundScore;
      
      return {
        ...player,
        score: newScore,
        isWinner: newScore >= gameState.currentGame.targetScore,
      };
    });

    const gameCompleted = updatedPlayers.some((player) => player.isWinner);
    const winner = gameCompleted 
      ? updatedPlayers.find((player) => player.isWinner)?.id 
      : undefined;

    const updatedGame: Game = {
      ...gameState.currentGame,
      players: updatedPlayers,
      rounds: [...gameState.currentGame.rounds, newRound],
      completed: gameCompleted,
      winner,
    };

    // If game is completed, add it to history
    if (gameCompleted) {
      setGameState((prev) => ({
        currentGame: null,
        gameHistory: [updatedGame, ...prev.gameHistory],
      }));
    } else {
      setGameState((prev) => ({
        ...prev,
        currentGame: updatedGame,
      }));
    }

    return updatedGame;
  }, [gameState, setGameState]);

  // Undo last round
  const undoLastRound = useCallback(() => {
    if (!gameState.currentGame || gameState.currentGame.rounds.length === 0) return;

    const rounds = [...gameState.currentGame.rounds];
    const lastRound = rounds.pop();

    if (!lastRound) return;

    // Recalculate player scores
    const updatedPlayers = gameState.currentGame.players.map((player) => {
      const roundScore = lastRound.playerScores.find(
        (score) => score.playerId === player.id
      )?.score || 0;
      
      return {
        ...player,
        score: player.score - roundScore,
        isWinner: false,
      };
    });

    setGameState((prev) => ({
      ...prev,
      currentGame: {
        ...gameState.currentGame!,
        players: updatedPlayers,
        rounds,
        completed: false,
        winner: undefined,
      },
    }));
  }, [gameState, setGameState]);

  // Reset the current game
  const resetGame = useCallback(() => {
    if (!gameState.currentGame) return;

    // Archive the current game if it has rounds
    if (gameState.currentGame.rounds.length > 0) {
      setGameState((prev) => ({
        currentGame: null,
        gameHistory: [gameState.currentGame!, ...prev.gameHistory],
      }));
    } else {
      setGameState((prev) => ({
        ...prev,
        currentGame: null,
      }));
    }
  }, [gameState, setGameState]);

  return {
    currentGame: gameState.currentGame,
    gameHistory: gameState.gameHistory,
    createGame,
    addRound,
    undoLastRound,
    resetGame,
  };
}