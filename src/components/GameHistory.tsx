import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Trophy } from 'lucide-react';
import { Game } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface GameHistoryProps {
  games: Game[];
}

const GameHistory: React.FC<GameHistoryProps> = ({ games }) => {
  const { t, language } = useLanguage();
  const [expandedGameId, setExpandedGameId] = useState<string | null>(null);

  if (games.length === 0) {
    return null;
  }

  const toggleExpand = (gameId: string) => {
    setExpandedGameId(expandedGameId === gameId ? null : gameId);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-slate-800 text-white p-3">
        <h2 className="text-lg font-semibold">{t('game.history')}</h2>
      </div>

      <div className="divide-y divide-slate-200">
        {games.map((game) => {
          const isExpanded = expandedGameId === game.id;
          const winnerPlayer = game.players.find(p => p.id === game.winner);
          
          return (
            <div key={game.id} className="text-slate-800">
              <div 
                className="p-4 flex justify-between items-center cursor-pointer hover:bg-slate-50"
                onClick={() => toggleExpand(game.id)}
              >
                <div>
                  <div className="font-medium">
                    {t('game.on')} {formatDate(game.createdAt)}
                  </div>
                  <div className="text-sm text-slate-500">
                    {game.players.length} {t('players.count')} • {t('target')}: {game.targetScore}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {game.completed && winnerPlayer && (
                    <div className="text-sm flex items-center gap-1 bg-amber-100 text-amber-800 py-1 px-2 rounded-full">
                      <Trophy size={14} /> 
                      <span>{winnerPlayer.name}</span>
                    </div>
                  )}
                  
                  {isExpanded ? (
                    <ChevronUp size={20} className="text-slate-500" />
                  ) : (
                    <ChevronDown size={20} className="text-slate-500" />
                  )}
                </div>
              </div>
              
              {isExpanded && (
                <div className="bg-slate-50 p-4 animate-fadeIn">
                  <h3 className="font-medium mb-2">{t('final.scores')}</h3>
                  <div className="space-y-2">
                    {[...game.players]
                      .sort((a, b) => b.score - a.score)
                      .map((player) => (
                        <div 
                          key={player.id} 
                          className={`flex justify-between items-center p-2 rounded-md
                            ${player.id === game.winner ? 'bg-amber-100' : 'bg-white'}`}
                        >
                          <div className="flex items-center gap-1">
                            {player.id === game.winner && (
                              <Trophy size={14} className="text-amber-500" />
                            )}
                            <span>{player.name}</span>
                          </div>
                          <span className="font-bold">{player.score}</span>
                        </div>
                      ))
                    }
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GameHistory;