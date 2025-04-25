import React, { createContext, useContext, useState } from 'react';

type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    'app.title': 'Domino Score Tracker',
    'new.game': 'New Game',
    'target.score': 'Target Score',
    'enter.target.score': 'Enter target score',
    'players': 'Players',
    'add.player': 'Add Player',
    'start.game': 'Start Game',
    'current.scores': 'Current Scores',
    'target': 'Target',
    'add.round.scores': 'Add Round Scores',
    'add.scores': 'Add Scores',
    'undo.last': 'Undo Last',
    'new.game.button': 'New Game',
    'game.history': 'Game History',
    'game.on': 'Game on',
    'players.count': 'players',
    'final.scores': 'Final Scores',
    'wins': 'Wins!',
    'reached.target': 'Congratulations! 🎉 They\'ve reached the target score.',
    'start.new.game': 'Start New Game',
    'error.unique.names': 'All player names must be unique',
    'error.empty.names': 'Player names cannot be empty',
    'error.min.players': 'At least 2 players are required',
    'error.target.score': 'Target score must be a positive number',
    'error.valid.scores': 'All scores must be valid numbers',
    'error.one.score': 'At least one player must have a score',
  },
  es: {
    'app.title': 'Contador de Puntos Dominó',
    'new.game': 'Nuevo Juego',
    'target.score': 'Puntuación Objetivo',
    'enter.target.score': 'Ingrese puntuación objetivo',
    'players': 'Jugadores',
    'add.player': 'Agregar Jugador',
    'start.game': 'Comenzar Juego',
    'current.scores': 'Puntuaciones Actuales',
    'target': 'Objetivo',
    'add.round.scores': 'Agregar Puntos de Ronda',
    'add.scores': 'Agregar Puntos',
    'undo.last': 'Deshacer Último',
    'new.game.button': 'Nuevo Juego',
    'game.history': 'Historial de Juegos',
    'game.on': 'Juego del',
    'players.count': 'jugadores',
    'final.scores': 'Puntuaciones Finales',
    'wins': '¡Gana!',
    'reached.target': '¡Felicitaciones! 🎉 Han alcanzado la puntuación objetivo.',
    'start.new.game': 'Comenzar Nuevo Juego',
    'error.unique.names': 'Los nombres de los jugadores deben ser únicos',
    'error.empty.names': 'Los nombres de los jugadores no pueden estar vacíos',
    'error.min.players': 'Se requieren al menos 2 jugadores',
    'error.target.score': 'La puntuación objetivo debe ser un número positivo',
    'error.valid.scores': 'Todas las puntuaciones deben ser números válidos',
    'error.one.score': 'Al menos un jugador debe tener puntuación',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('es');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'es' ? 'en' : 'es');
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};