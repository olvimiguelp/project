import React from 'react';
import { Trophy } from 'lucide-react';
import { Player } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface ScoreCardProps {
  players: Player[];
  targetScore: number;
  currentLeaderId?: string;
}

const ScoreCard: React.FC<ScoreCardProps> = ({ 
  players, 
  targetScore,
  currentLeaderId
}) => {
  const { t } = useLanguage();
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-slate-800 text-white p-3 flex justify-between items-center">
        <h2 className="text-lg font-semibold">{t('current.scores')}</h2>
        <div className="text-sm bg-slate-700 px-2 py-1 rounded">
          {t('target')}: {targetScore}
        </div>
      </div>
      
      <div className="divide-y divide-slate-200">
        {sortedPlayers.map((player) => {
          const isLeader = player.id === currentLeaderId;
          const scorePercentage = Math.min((player.score / targetScore) * 100, 100);
          
          return (
            <div 
              key={player.id} 
              className={`p-4 relative ${isLeader ? 'bg-amber-50' : ''}`}
            >
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-2">
                  {isLeader && (
                    <Trophy size={16} className="text-amber-500" />
                  )}
                  <span className={`font-medium ${isLeader ? 'text-amber-900' : 'text-slate-800'}`}>
                    {player.name}
                  </span>
                </div>
                <span className="text-xl font-bold text-slate-800">
                  {player.score}
                </span>
              </div>
              
              <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                <div 
                  className={`h-2 rounded-full ${isLeader ? 'bg-amber-500' : 'bg-slate-500'}`}
                  style={{ width: `${scorePercentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScoreCard;