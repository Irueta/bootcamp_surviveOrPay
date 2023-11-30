// GameScreen.jsx
import React, { useState, useEffect } from 'react';
import CharacterCard from './CharacterCard';
import ComputerGameScreen from './ComputerGameScreen';
import Modal from './Modal';
// ...

const GameScreen = ({ player, onNextLevel, onGameOver, onQuit }) => {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [showComputerGame, setShowComputerGame] = useState(false);
  const [error, setError] = useState('');
  const [level, setLevel] = useState(1);
  const [pointsRequired, setPointsRequired] = useState(100);
  const [countdown,setCountdown] = useState(15);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [bonusTime, setBonusTime] = useState(0);


  useEffect(() => {
    const charactersData = [
      { id: 1, name: 'Ohol Atz', frontend: 1, backend: 1, css: 3, motivacion: 0.5 },
      { id: 2, name: 'Vic Thor', frontend: 7, backend: 3, css: 9, motivacion: 1 },
      { id: 3, name: 'Ahal Ex', frontend: 6, backend: 7, css: 6, motivacion: 1 },
      { id: 4, name: 'Estré', frontend: 7, backend: 3, css: 8, motivacion: 2 },
      { id: 5, name: 'Michel In', frontend: 7, backend: 7, css: 5, motivacion: 1 },
      { id: 6, name: 'Dan Bis', frontend: 7, backend: 4, css: 8, motivacion: 1 },
      { id: 7, name: 'Andrey Seo', frontend: 6, backend: 8, css: 5, motivacion: 1 },
      { id: 8, name: 'Yo Hon', frontend: 5, backend: 7, css: 5, motivacion: 3 }
    ];

    setCharacters(charactersData);
  }, []);



  const handleCharacterClick = (character, isChecked) => {
    if (isChecked ) {
      setSelectedCharacter(character);
      setShowComputerGame(true);
    } else {
      setSelectedCharacter(null);
    }
  };


const addLevelCharacter = () => {
  const updatedCharacter = {
    ...selectedCharacter,
    frontend: selectedCharacter.frontend + 1,
    backend: selectedCharacter.backend + 1,
    css: selectedCharacter.css + 1,
  };
  setSelectedCharacter(updatedCharacter);
};

  const handleSurvived = (timeLeft) => {
    // Actualiza el nivel y los puntos requeridos
    setCountdown(timeLeft);
    setLevel((prevLevel) => prevLevel + 1);
    setPointsRequired((prevPointsRequired) => prevPointsRequired + 100);

    
  };
  

  useEffect(() => {
    if (level > 1) {
      openModal();
    }
  }, [level]);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleAddLevel = () => {
    addLevelCharacter();
    alert(`Tus cualidades han mejorado en 1 punto!`);
    setModalIsOpen(false);
  };

  const handleAddTime = () => { 
      setBonusTime(true);
      alert(`Has tenido suerte! El TA te regala más tiempo para entregar la tarea`);
    setModalIsOpen(false);
    
  };

useEffect(() => {
  setBonusTime(false);
}, [level]);

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
       <Modal
        isOpen={modalIsOpen}
        onClose={closeModal}
        level={level}
        onAddTime={handleAddTime}
        onAddLevel={handleAddLevel}
      />
      {showComputerGame ? (
        <ComputerGameScreen
          player={selectedCharacter}
          onSurvived={handleSurvived}
          onFailed={handleFailed}
          onQuit={handleQuit}
          level={level}
          pointsRequired={pointsRequired}
          maxTime={countdown}
          modalIsOpen={modalIsOpen}
          bonusTime={bonusTime}
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

        </>
      )}
    </div>
  );
};



export default GameScreen;
