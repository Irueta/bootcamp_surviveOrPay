// TitleScreen.js
import React, { useState, useEffect } from 'react';
import ProgressBar from './ProgressBar';

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

  const handlePlay = () => {
    // Verificar si se ha ingresado un nombre antes de continuar
    if (name.trim() !== '') {
      onPlay(name);
    } else {
      alert('Por favor, ingresa un nombre antes de comenzar.');
    }
  };


  const getLevelsReached = () => { 
    const levelsReached = localStorage.getItem('levelsReached')|| 1;
    console.log('levelsReached', levelsReached)
    return levelsReached;
  }

const getCharacter = () => {
  const characterString = localStorage.getItem('character') || null;
  const character = JSON.parse(characterString);
  return character; 
};


  return (
    <div className="title-screen">
      <h1>powered by BBKK</h1>
      <img id="titulo" src="/titulo.png" alt="Bootcamp Survive" />
      {playerName ? (
        <>
          <p>Has hecho lo que has podido, {playerName}.</p>
          <p>Niveles alcanzados: {getLevelsReached()}</p>
          <p>Personaje utilizado, "{getCharacter().name}":</p>
          <ul>
            <li>Frontend:<ProgressBar value={getCharacter().frontend} max="10"/></li>
            <li>Backend: <ProgressBar value={getCharacter().backend} max="10"/></li>
            <li>CSS: <ProgressBar value={getCharacter().css} max="10"/></li>
            <li>Motivación: <ProgressBar value={getCharacter().motivacion} max="10"/></li>
          </ul>
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
          <button onClick={handlePlay}>Jugar</button>
        </>
      )}
    </div>
  );
};

export default TitleScreen;
