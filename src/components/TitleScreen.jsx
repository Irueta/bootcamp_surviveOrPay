// TitleScreen.js
import React, { useState, useEffect } from 'react';

const TitleScreen = ({ playerName, levelsReached, onPlay, onReset }) => {
  const [name, setName] = useState(playerName || '');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleReset = () => {
    // Lógica para reiniciar el juego y borrar la información del localStorage
    localStorage.removeItem('playerName');
    localStorage.removeItem('levelsReached');
    onReset();
  };


  const getLevelsReached = () => { 
    const levelsReached = localStorage.getItem('levelsReached');
    console.log('levelsReached', levelsReached)
    return levelsReached;
  }

  return (
    <div className="title-screen">
      <h1>Bootcamp Survive</h1>
      {playerName ? (
        <>
          <p>Bienvenido de nuevo, {playerName}.</p>
          <p>Niveles alcanzados: {getLevelsReached()}</p>
          <button onClick={handleReset}>Volver a pagar el bootcamp</button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={handleNameChange}
          />
          <button onClick={() => onPlay(name)}>Jugar</button>
        </>
      )}
    </div>
  );
};

export default TitleScreen;
