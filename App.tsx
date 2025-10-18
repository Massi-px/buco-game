import React from 'react';
import { AppRouter } from './src/router/AppRouter';
import { GameProvider } from './src/app/game/state/GameContext';

function App() {
  return (
    <div className="w-full h-screen bg-black overflow-hidden">
      <GameProvider>
        <AppRouter />
      </GameProvider>
    </div>
  );
}

export default App;
