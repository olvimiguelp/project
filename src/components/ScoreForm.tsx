import React, { useState } from 'react';
import { Player } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface ScoreFormProps {
  players: Player[];
  onSubmit: (scores: Record<string, number>) => void;
}

const ScoreForm: React.FC<ScoreFormProps> = ({ players, onSubmit }) => {
  const { t } = useLanguage();
  const [scores, setScores] = useState<Record<string, string>>(
    players.reduce((acc, player) => ({ ...acc, [player.id]: '' }), {})
  );
  const [error, setError] = useState<string>('');

  const handleScoreChange = (playerId: string, value: string) => {
    if (value === '' || /^\d*\.?\d{0,1}$/.test(value)) {
      setScores({ ...scores, [playerId]: value });
    }
  };

  const validateScores = (): boolean => {
    const allEmpty = Object.values(scores).every(score => score === '');
    if (allEmpty) {
      setError(t('error.one.score'));
      return false;
    }

    const invalidScores = Object.values(scores).some(score => {
      return score !== '' && isNaN(Number(score));
    });

    if (invalidScores) {
      setError(t('error.valid.scores'));
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateScores()) {
      return;
    }
    
    const numericScores = Object.entries(scores).reduce(
      (acc, [playerId, score]) => ({
        ...acc,
        [playerId]: score === '' ? 0 : Number(score),
      }),
      {} as Record<string, number>
    );
    
    onSubmit(numericScores);
    
    setScores(
      players.reduce((acc, player) => ({ ...acc, [player.id]: '' }), {})
    );
    setError('');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold mb-3 text-slate-800">{t('add.round.scores')}</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-3 mb-4">
          {players.map((player) => (
            <div key={player.id} className="flex items-center">
              <label className="w-1/2 text-slate-700">{player.name}</label>
              <div className="w-1/2">
                <input
                  type="text"
                  inputMode="decimal"
                  value={scores[player.id]}
                  onChange={(e) => handleScoreChange(player.id, e.target.value)}
                  placeholder="0"
                  className="w-full p-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                />
              </div>
            </div>
          ))}
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
          {t('add.scores')}
        </button>
      </form>
    </div>
  );
};

export default ScoreForm;