// App.js
import React, { useState } from 'react';
import TitleScreen from './components/TitleScreen';
import GameScreen from './components/GameScreen';

const App = () => {
  const [playerName, setPlayerName] = useState(localStorage.getItem('playerName') || '');
  const [levelsReached, setLevelsReached] = useState(() => {
    const storedLevels = localStorage.getItem('levelsReached');
    return storedLevels ? Number(storedLevels) : 0;
  });
  const [gameStarted, setGameStarted] = useState(false);

  const handlePlay = (name) => {
    setPlayerName(name);
    setGameStarted(true);
  };

  const handleReset = () => {
    setPlayerName('');
    setLevelsReached(0);
    localStorage.removeItem('playerName');
    localStorage.removeItem('levelsReached');
  };

  const handleGameOver = () => {
    setGameStarted(false);
  };

  const handleNextLevel = () => {
    setLevelsReached((prevLevels) => {
      const newLevels = prevLevels + 1;
      localStorage.setItem('levelsReached', newLevels);
      return newLevels;
    });
  };

  return (
    <div className="app">
      {gameStarted ? (
        <GameScreen player={playerName} onNextLevel={handleNextLevel} onGameOver={handleGameOver} />
      ) : (
        <TitleScreen playerName={playerName} levelsReached={levelsReached} onPlay={handlePlay} onReset={handleReset} />
      )}
    </div>
  );
};

export default App;
