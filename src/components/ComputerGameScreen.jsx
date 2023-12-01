// ComputerGameScreen.jsx
import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import ProgressBar from './ProgressBar';

const ComputerGameScreen = ({ player, onSurvived, onFailed, onQuit, level, pointsRequired, maxTime, modalIsOpen, bonusTime }) => {
  const [inProgress, setInProgress] = useState(false);
  const [task, setTask] = useState({});
  const [taskPoints, setTaskPoints] = useState(0);
  const [progress, setProgress] = useState(0);
  const [countdown, setCountdown] = useState(maxTime);
  const [isShaking, setShaking] = useState(false);

  useEffect(() => {
    setCountdown(maxTime*player.motivacion);
  }, []);

  useEffect(() => {
    const generateRandomTask = () => {
      if (!inProgress) {
        const taskTypes = ['frontend', 'backend', 'css'];
        const randomTaskType = taskTypes[Math.floor(Math.random() * taskTypes.length)];
        setTask({ type: randomTaskType, level: level });
        setTaskPoints((progress + 1) * pointsRequired);
      }
    };
  
    generateRandomTask();
  }, [inProgress, progress, level, pointsRequired]);

  useEffect(() => {
    if (inProgress && countdown > 0 && level !==1) {
      const countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      return () => clearInterval(countdownInterval);
    } else if (countdown === 0) {
      setInProgress(false);
      onFailed();
    } 
  }, [inProgress, countdown, onFailed, level]);

  useEffect(() => {
    if (bonusTime === true) {
      setCountdown((prevCountdown) => prevCountdown + (5*player.motivacion));
      
    }
  }, [bonusTime]);

  const handleComputerClick = () => {
    setShaking(true);
    setTimeout(() => {
      setShaking(false);
    }, 50); 

    if (!inProgress) {
      setInProgress(true);
    }

    setProgress((prevProgress) => {
      const newProgress = prevProgress + player[task.type];
      if (newProgress >= taskPoints) {
        setInProgress(false);
        setProgress(0);
        onSurvived(countdown);
        
      }
      return newProgress;
    });
  };

  const handleQuit = () => {
    setInProgress(false);
    onQuit('title');
  };

  return (
    <>
    <img id="preguntaleChatGPTImage" src="/chatGPT.png" alt="" />
      <div className="computer-game-screen">
    <div className="game-info">
      <p id="level" className="info-text">Semana: {task.level}</p>
      <p className="info-text">Tarea: {task.type}</p>
      <p className="info-text">Puntos requeridos: {taskPoints}</p>
      <p className="info-text">Progreso: <ProgressBar value={progress} max={taskPoints} /></p>
      <p className="info-text">Tiempo restante: {countdown} segundos</p>
    </div>
    <div className="computer-image" onClick={handleComputerClick}>
      <img id="chatGPTbutton"
        src="/ChatGPT-3D-Icon.png"
        alt="Computer"
        className={`container ${isShaking ? 'shake' : ''}`} style={{ cursor: 'pointer' }}
      />
    </div>
    <button className="quit-button" onClick={handleQuit}>
      Abandonar bootcamp
    </button>
  </div>
  </>
  );
};

export default ComputerGameScreen;
