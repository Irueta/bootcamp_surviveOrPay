// CharacterCard.js
import React, { useState } from 'react';

const CharacterCard = ({ character, onCharacterClick }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    onCharacterClick(character, !isChecked);
  };

  return (
    <div className="character-card">
      <img src={`imagen-${character.id}.png`} alt={character.name} />
      <p>Nombre: {character.name}</p>
      <p>Frontend: {character.frontend}</p>
      <p>Backend: {character.backend}</p>
      <p>CSS: {character.css}</p>
      <p>Motivación: {character.motivacion}</p>
      <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
    </div>
  );
};

export default CharacterCard;
