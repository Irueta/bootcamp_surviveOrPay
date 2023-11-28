// GameScreen.jsx
import React, { useState, useEffect } from 'react';
import CharacterCard from './CharacterCard';
import ComputerGameScreen from './ComputerGameScreen';

// ...

const GameScreen = ({ player, onNextLevel, onGameOver, onQuit }) => {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [showComputerGame, setShowComputerGame] = useState(false);
  const [error, setError] = useState('');
  const [level, setLevel] = useState(1);
  const [pointsRequired, setPointsRequired] = useState(100);

  useEffect(() => {
    const charactersData = [
      { id: 1, name: 'Hola T.Z', frontend: 1, backend: 1, css: 3, motivacion: 0.5 },
      { id: 2, name: 'Vi a Txor', frontend: 7, backend: 3, css: 9, motivacion: 1 },
      { id: 3, name: 'Ahal Ex', frontend: 6, backend: 7, css: 6, motivacion: 1 },
      { id: 4, name: 'Estré', frontend: 7, backend: 3.5, css: 8, motivacion: 1.5 },
      { id: 5, name: 'Michel In', frontend: 7, backend: 7, css: 5, motivacion: 1 },
      { id: 6, name: 'Dan Bis', frontend: 7, backend: 4, css: 8, motivacion: 1 },
      { id: 7, name: 'Andrey', frontend: 6, backend: 8, css: 5, motivacion: 1 },
      { id: 8, name: 'Yo Hon', frontend: 5, backend: 7, css: 5, motivacion: 3 }
    ];

    setCharacters(charactersData);
  }, []);

  const handleCharacterClick = (character, isChecked) => {
    if (isChecked) {
      setSelectedCharacter(character);
    } else {
      setSelectedCharacter(null);
    }
  };

  const handleCodeButtonClick = () => {
    if (selectedCharacter) {
      setShowComputerGame(true);
      setError('');
    } else {
      setError('Debes seleccionar un personaje antes de picar código');
    }
  };

  const handleSurvived = () => {
    // Actualiza el nivel y los puntos requeridos
    setLevel((prevLevel) => prevLevel + 1);
    setPointsRequired((prevPointsRequired) => prevPointsRequired + 100);
    alert(`¡Has alcanzado el nivel ${level + 1}!`);
    // Aumenta las cualidades del personaje cuando el nivel es 2
    if (level % 2 === 0) {
      const updatedCharacter = {
        ...selectedCharacter,
        frontend: selectedCharacter.frontend + 1,
        backend: selectedCharacter.backend + 1,
        css: selectedCharacter.css + 1,
      };
      setSelectedCharacter(updatedCharacter);
      alert(`Tus cualidades han mejorado en 1 punto!`);
    }
  };

  const handleFailed = () => {
    setShowComputerGame(false);
    onGameOver(level);
    localStorage.setItem('levelsReached', level)
    localStorage.removeItem('character');
    localStorage.setItem('character', JSON.stringify(selectedCharacter));
  };

  const handleQuit = () => {
    setShowComputerGame(false);
    setSelectedCharacter(null);
    onGameOver(level);
    localStorage.setItem('levelsReached', level)
    localStorage.removeItem('character');
    localStorage.setItem('character', JSON.stringify(selectedCharacter));
  };

  return (
    <div className="game-screen">
      {showComputerGame ? (
        <ComputerGameScreen
          player={selectedCharacter}
          onSurvived={handleSurvived}
          onFailed={handleFailed}
          onQuit={handleQuit}
          level={level}
          pointsRequired={pointsRequired}
        />
      ) : (
        <>
        <div className='selecPerson'>
          <img id="selecPerson" src="/selecPerson.png" alt="seleccion del personaje" />
        </div>
          {error && <p style={{ textAlign: "center", color: 'red' }}>{error}</p>}
          <div className="character-list">
            {characters.map((character) => (
              <CharacterCard
                key={character.id}
                character={character}
                onCharacterClick={handleCharacterClick}
              />
            ))}
          </div>
          <div id="picar">
          <button id="picarButton" onClick={handleCodeButtonClick}>A picar código</button>
          </div>
        </>
      )}
    </div>
  );
};



export default GameScreen;
