import React from 'react';
import { Dice5 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import LanguageToggle from './LanguageToggle';

const Header: React.FC = () => {
  const { t } = useLanguage();

  return (
    <header className="bg-slate-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Dice5 size={32} className="text-red-500" />
          <h1 className="text-2xl font-bold">{t('app.title')}</h1>
        </div>
        <LanguageToggle />
      </div>
    </header>
  );
};

export default Header;