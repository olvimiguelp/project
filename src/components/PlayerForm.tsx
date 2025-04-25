import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface PlayerFormProps {
  onSubmit: (players: string[], targetScore: number) => void;
}

const PlayerForm: React.FC<PlayerFormProps> = ({ onSubmit }) => {
  const { t } = useLanguage();
  const [players, setPlayers] = useState<string[]>(['Player 1', 'Player 2']);
  const [targetScore, setTargetScore] = useState<string>('100');
  const [error, setError] = useState<string>('');

  const addPlayer = () => {
    if (players.length < 4) {
      setPlayers([...players, `Player ${players.length + 1}`]);
    }
  };

  const removePlayer = (index: number) => {
    if (players.length > 2) {
      setPlayers(players.filter((_, i) => i !== index));
    } else {
      setError(t('error.min.players'));
      setTimeout(() => setError(''), 3000);
    }
  };

  const updatePlayer = (index: number, name: string) => {
    const newPlayers = [...players];
    newPlayers[index] = name;
    setPlayers(newPlayers);
  };

  const handleTargetScoreChange = (value: string) => {
    if (value === '' || /^\d*$/.test(value)) {
      setTargetScore(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const duplicateNames = new Set(players).size !== players.length;
    const emptyNames = players.some(name => !name.trim());
    
    if (duplicateNames) {
      setError(t('error.unique.names'));
      return;
    }
    
    if (emptyNames) {
      setError(t('error.empty.names'));
      return;
    }

    const numericTargetScore = parseInt(targetScore, 10);
    if (!numericTargetScore || numericTargetScore < 1) {
      setError(t('error.target.score'));
      return;
    }
    
    onSubmit(players, numericTargetScore);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-slate-800">{t('new.game')}</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            {t('target.score')}
          </label>
          <input
            type="text"
            inputMode="numeric"
            value={targetScore}
            onChange={(e) => handleTargetScoreChange(e.target.value)}
            placeholder={t('enter.target.score')}
            className="w-full p-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            {t('players')} ({players.length}/4)
          </label>
          
          {players.map((player, index) => (
            <div key={index} className="flex mb-2">
              <input
                type="text"
                value={player}
                onChange={(e) => updatePlayer(index, e.target.value)}
                placeholder={`Player ${index + 1}`}
                className="flex-1 p-2 border border-slate-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                maxLength={20}
              />
              <button
                type="button"
                onClick={() => removePlayer(index)}
                className="bg-slate-200 p-2 rounded-r-md hover:bg-slate-300 transition-colors"
                aria-label="Remove player"
              >
                <X size={20} className="text-slate-700" />
              </button>
            </div>
          ))}
          
          {players.length < 4 && (
            <button
              type="button"
              onClick={addPlayer}
              className="flex items-center gap-1 text-sm text-slate-700 mt-2 hover:text-slate-900"
            >
              <Plus size={16} /> {t('add.player')}
            </button>
          )}
        </div>
        
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-800 rounded-md text-sm">
            {error}
          </div>
        )}
        
        <button
          type="submit"
          className="w-full bg-slate-800 text-white py-2 px-4 rounded-md hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
        >
          {t('start.game')}
        </button>
      </form>
    </div>
  );
};

export default PlayerForm;