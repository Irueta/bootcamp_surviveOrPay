import React from 'react';

const Modal = ({ isOpen, onClose, level }) => {
  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <h2>¡Felicitaciones!</h2>
        <p>Has alcanzado el nivel {level}.</p>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default Modal;




/* const Modal = (addLevel, addTime) => {

    
    
return(
    <div>
        <button onClick= {addTime}>1</button>
        <button onClick={addLevel}>2</button>
        <h1>Algo</h1>

    </div>
)
}
export default Modal; */