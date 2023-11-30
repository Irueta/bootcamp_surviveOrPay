// Modal.jsx
import React from 'react';

const Modal = ({ isOpen, onClose, level, onAddTime, onAddLevel }) => {
  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <button onClick={onClose}>Cerrar</button>
        <h2>¿Has superado la semana {level -1}, aguantarás la proxima?</h2>
        {level % 2 === 0 ? (
        <h3>Bonificadores:</h3>
          ) : null}
          {level % 2 === 0 ? (
          <button onClick={onAddTime}>Tiempo extra</button>
          ) : null}
          {level % 2 === 0 ? (
          <button onClick={onAddLevel}>Añadir nivel al personaje</button>
          ) : null}
          <div>

          </div>
      </div>
    </div>
  );
};

export default Modal;
