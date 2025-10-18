import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { MenuScreen } from '../app/menu/screen/HomeScreen/HomeScreen';
import { useGame } from '../app/game/state/GameContext';

export const MenuPage: React.FC = () => {
  const navigate = useNavigate();
  const { startGame } = useGame();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    try { checkMobile(); } catch {}
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }
  }, []);

  const onPlay = useCallback(() => {
    startGame();
    navigate('/game');
  }, [navigate, startGame]);

  return <MenuScreen onPlay={onPlay} isMobile={isMobile} canDownload={isMobile} />;
};
