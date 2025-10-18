import React, { createContext, useContext, useMemo, useRef, useState } from 'react';

export type GameState = {
  holeSize: number;
  isPlaying: boolean;
  isMuted: boolean;
  objectsCount: number;
};

export type GameActions = {
  startGame: () => void;
  restartGame: () => void;
  toMenu: () => void;
  pause: () => void;
  resume: () => void;
  toggleMute: () => void;
  setObjectsCount: (n: number) => void;
  setHoleSize: (n: number) => void;
};

export type GameContextType = GameState & GameActions;

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [holeSize, setHoleSize] = useState(50);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [objectsCount, setObjectsCount] = useState(0);
  const gameStartTimeRef = useRef<number>(0);

  const startGame = () => {
    setHoleSize(50);
    setIsPlaying(true);
    setObjectsCount(0);
    gameStartTimeRef.current = Date.now();
  };

  const restartGame = () => startGame();
  const toMenu = () => setIsPlaying(false);
  const pause = () => setIsPlaying(false);
  const resume = () => setIsPlaying(true);
  const toggleMute = () => setIsMuted(v => !v);

  const value = useMemo<GameContextType>(
    () => ({
      holeSize,
      isPlaying,
      isMuted,
      objectsCount,
      startGame,
      restartGame,
      toMenu,
      pause,
      resume,
      toggleMute,
      setObjectsCount,
      setHoleSize,
    }),
    [holeSize, isPlaying, isMuted, objectsCount, restartGame]
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
};
