import React, { useEffect } from 'react';
import { Trophy, RefreshCw } from 'lucide-react';
import { Player } from '../types';
import confetti from 'canvas-confetti';
import { useLanguage } from '../context/LanguageContext';

interface GameWinnerProps {
  winner: Player;
  onNewGame: () => void;
}

const GameWinner: React.FC<GameWinnerProps> = ({ winner, onNewGame }) => {
  const { t } = useLanguage();

  useEffect(() => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    
    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };
    
    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
      
      const particleCount = 50 * (timeLeft / duration);
      
      confetti({
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        zIndex: 100,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#FFD700', '#FFA500', '#FF4500'],
      });
      
      confetti({
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        zIndex: 100,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#FFD700', '#FFA500', '#FF4500'],
      });
    }, 250);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto text-center animate-fadeIn">
      <div className="inline-block p-4 bg-amber-100 rounded-full mb-4">
        <Trophy size={48} className="text-amber-500" />
      </div>
      
      <h2 className="text-2xl font-bold text-slate-800 mb-2">
        {winner.name} {t('wins')}
      </h2>
      
      <p className="text-4xl font-bold text-amber-500 mb-4">
        {winner.score} points
      </p>
      
      <p className="text-slate-600 mb-6">
        {t('reached.target')}
      </p>
      
      <button
        onClick={onNewGame}
        className="flex items-center justify-center gap-2 w-full bg-slate-800 text-white py-3 px-4 rounded-md hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
      >
        <RefreshCw size={18} />
        <span>{t('start.new.game')}</span>
      </button>
    </div>
  );
};

export default GameWinner;