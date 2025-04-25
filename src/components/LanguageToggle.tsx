import React from 'react';
import { Languages } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const LanguageToggle: React.FC = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-slate-700 text-white hover:bg-slate-600 transition-colors"
      aria-label="Toggle language"
    >
      <Languages size={16} />
      <span>{language.toUpperCase()}</span>
    </button>
  );
};

export default LanguageToggle;