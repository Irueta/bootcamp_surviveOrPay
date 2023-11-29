// CharacterCard.js
import React, { useState } from 'react';
import ProgressBar from './ProgressBar';
const CharacterCard = ({ character, onCharacterClick }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    onCharacterClick(character, !isChecked);
  };

  return (
    <div className="character-card">
      <img src={`/characters/imagen-${character.id}.gif`} alt={character.name} />
      <p id="nombre">Nombre: {character.name}</p>
      <p>Frontend: <ProgressBar value={character.frontend} max={10} /></p>
      <p>Backend: <ProgressBar value={character.backend} max={10} /></p>
      <p>CSS: <ProgressBar value={character.css} max={10} /></p>
      <p>Motivación: <ProgressBar value={character.motivacion} max={4} /></p>
      <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
    </div>
  );
};

export default CharacterCard;
