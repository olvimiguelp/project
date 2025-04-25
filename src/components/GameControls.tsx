import React from 'react';
import { RotateCcw, RefreshCw } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface GameControlsProps {
  onUndo: () => void;
  onNewGame: () => void;
  canUndo: boolean;
}

const GameControls: React.FC<GameControlsProps> = ({ 
  onUndo, 
  onNewGame, 
  canUndo 
}) => {
  const { t } = useLanguage();

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={onUndo}
          disabled={!canUndo}
          className={`flex items-center justify-center gap-1 py-2 px-3 rounded-md border 
            ${canUndo 
              ? 'border-slate-300 text-slate-700 hover:bg-slate-50' 
              : 'border-slate-200 text-slate-400 cursor-not-allowed'
            }`}
        >
          <RotateCcw size={16} />
          <span>{t('undo.last')}</span>
        </button>
        
        <button
          onClick={onNewGame}
          className="flex items-center justify-center gap-1 py-2 px-3 rounded-md border border-red-300 text-red-700 hover:bg-red-50"
        >
          <RefreshCw size={16} />
          <span>{t('new.game.button')}</span>
        </button>
      </div>
    </div>
  );
};

export default GameControls;