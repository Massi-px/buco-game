import React, { Fragment, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { GameScreen } from '../app/game/screen/GameScreen/GameScreen';
import { GameHUD } from '../app/game/components/GameHUD/GameHUD';
import { useGame } from '../app/game/state/GameContext';

export const GamePage: React.FC = () => {
  const navigate = useNavigate();
  const { isPlaying, holeSize, isMuted, pause, resume, toggleMute, toMenu } = useGame();

  const handleMenu = useCallback(() => {
    toMenu();
    navigate('/menu');
  }, [navigate, toMenu]);

  return (
    <Fragment>
      <GameScreen isPlaying={isPlaying} holeSize={holeSize} />
      <GameHUD
        isPlaying={isPlaying}
        isMuted={isMuted}
        onToggleMute={toggleMute}
        onPause={pause}
        onResume={resume}
        onMenu={handleMenu}
      />
    </Fragment>
  );
};
