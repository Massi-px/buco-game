import React from 'react';
import { Platform } from 'react-native';
import { Routes, Route, Navigate } from 'react-router';
import { NativeRouter } from 'react-router-native';
import { BrowserRouter } from 'react-router-dom';
import { SplashPage } from '../routes/SplashPage';
import { MenuPage } from '../routes/MenuPage';
import { GamePage } from '../routes/GamePage';
import { GameOverPage } from '../routes/GameOverPage';

const WebRouter: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <BrowserRouter>{children}</BrowserRouter>
);
const NativeRouterWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <NativeRouter>{children}</NativeRouter>
);

export const AppRouter: React.FC = () => {
  const R = Platform.OS === 'web' ? WebRouter : NativeRouterWrapper;
  return (
    <R>
      <Routes>
        <Route path="/" element={<Navigate to="/splash" replace />} />
        <Route path="/splash" element={<SplashPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/gameover" element={<GameOverPage />} />
        <Route path="*" element={<Navigate to="/splash" replace />} />
      </Routes>
    </R>
  );
};
