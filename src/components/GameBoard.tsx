import React, { useMemo } from 'react';
import { Game } from '../types';
import ScoreCard from './ScoreCard';
import ScoreForm from './ScoreForm';
import GameControls from './GameControls';

interface GameBoardProps {
  game: Game;
  onAddRound: (scores: Record<string, number>) => void;
  onUndo: () => void;
  onNewGame: () => void;
}

const GameBoard: React.FC<GameBoardProps> = ({
  game,
  onAddRound,
  onUndo,
  onNewGame,
}) => {
  const currentLeaderId = useMemo(() => {
    if (game.players.length === 0) return undefined;
    
    return [...game.players]
      .sort((a, b) => b.score - a.score)[0].id;
  }, [game.players]);

  return (
    <div className="space-y-4">
      <ScoreCard 
        players={game.players} 
        targetScore={game.targetScore}
        currentLeaderId={currentLeaderId}
      />
      
      <ScoreForm 
        players={game.players} 
        onSubmit={onAddRound} 
      />
      
      <GameControls 
        onUndo={onUndo} 
        onNewGame={onNewGame} 
        canUndo={game.rounds.length > 0} 
      />
    </div>
  );
};

export default GameBoard;