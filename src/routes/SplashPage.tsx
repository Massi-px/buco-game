import React, { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { SplashScreen } from '../app/authentication/screen/SplashScreen/SplashScreen';

export const SplashPage: React.FC = () => {
  const navigate = useNavigate();
  const onFinish = useCallback(() => navigate('/menu'), [navigate]);
  return <SplashScreen onFinish={onFinish} />;
};
