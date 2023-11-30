// Modal.jsx
import React from 'react';

const Modal = ({ isOpen, onClose, level, onAddTime, onAddLevel }) => {
  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <h2>¡Felicitaciones!</h2>
        <p>Has alcanzado el nivel {level}.</p>
        {level % 3 === 0 ? (
          <button onClick={onAddTime}>Añadir Tiempo</button>
          ) : null}
          {level % 3 === 0 ? (
          <button onClick={onAddLevel}>Añadir Nivel al personaje</button>
          ) : null}
          
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default Modal;
