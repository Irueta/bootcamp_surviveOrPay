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
          <p>Personaje utilizado:</p>
          <ul>
            <li>Personaje: {getCharacter().name}</li>
            <li>Frontend: {getCharacter().frontend}</li>
            <li>Backend: {getCharacter().backend}</li>
            <li>CSS: {getCharacter().css}</li>
            <li>Motivación: {getCharacter().motivacion}</li>
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
