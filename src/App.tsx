import React, { useState, useEffect } from 'react';
import useGameState from './hooks/useGameState';
import Header from './components/Header';
import PlayerForm from './components/PlayerForm';
import GameBoard from './components/GameBoard';
import GameHistory from './components/GameHistory';
import GameWinner from './components/GameWinner';
import { Player } from './types';

function App() {
  const { 
    currentGame, 
    gameHistory, 
    createGame, 
    addRound, 
    undoLastRound, 
    resetGame 
  } = useGameState();
  
  const [winner, setWinner] = useState<Player | null>(null);

  // Check for winner when game updates
  useEffect(() => {
    if (currentGame?.completed && currentGame.winner) {
      const winnerPlayer = currentGame.players.find(p => p.id === currentGame.winner);
      if (winnerPlayer) {
        setWinner(winnerPlayer);
      }
    } else {
      setWinner(null);
    }
  }, [currentGame]);

  const handleStartNewGame = () => {
    setWinner(null);
    resetGame();
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6 md:px-6">
        {winner ? (
          <GameWinner winner={winner} onNewGame={handleStartNewGame} />
        ) : currentGame ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <GameBoard
                game={currentGame}
                onAddRound={addRound}
                onUndo={undoLastRound}
                onNewGame={handleStartNewGame}
              />
            </div>
            
            <div>
              <GameHistory games={gameHistory} />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <PlayerForm onSubmit={createGame} />
            </div>
            
            <div>
              <GameHistory games={gameHistory} />
            </div>
          </div>
        )}
      </main>
      
      <footer className="bg-white shadow-inner py-4 mt-auto">
        <div className="container mx-auto px-4 text-center text-slate-500 text-sm">
          © {new Date().getFullYear()} Domino Score Tracker
        </div>
      </footer>
    </div>
  );
}

export default App;