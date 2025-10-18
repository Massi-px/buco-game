import React, { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { GameOverScreen } from '../app/game/screen/GameOverScreen/GameOverScreen';
import { useGame } from '../app/game/state/GameContext';

export const GameOverPage: React.FC = () => {
  const navigate = useNavigate();
  const { objectsCount, restartGame } = useGame();

  const onRestart = useCallback(() => {
    restartGame();
    navigate('/game');
  }, [navigate, restartGame]);

  const onMenu = useCallback(() => {
    navigate('/menu');
  }, [navigate]);

  return <GameOverScreen score={objectsCount} onRestart={onRestart} onMenu={onMenu} />;
};
