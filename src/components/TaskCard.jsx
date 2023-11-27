// TaskCard.js
import React from 'react';

const TaskCard = ({ taskType, level, onClick }) => (
  <div className="task-card">
    <p>Tipo: {taskType}</p>
    <p>Nivel: {level}</p>
    <button onClick={onClick}>A picar código</button>
  </div>
);

export default TaskCard;
