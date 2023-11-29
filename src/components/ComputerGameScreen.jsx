// ComputerGameScreen.jsx
import React, { useState, useEffect } from 'react';
import ProgressBar from './ProgressBar';

const ComputerGameScreen = ({ player, onSurvived, onFailed, onQuit, level, pointsRequired, maxTime }) => {
  const [inProgress, setInProgress] = useState(false);
  const [task, setTask] = useState({});
  const [taskPoints, setTaskPoints] = useState(0);
  const [progress, setProgress] = useState(0);
  const [countdown, setCountdown] = useState(10* player.motivacion);

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
    if (inProgress && countdown > 0) {
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
    if (level % 3=== 0) {
      setCountdown((prevCountdown) => prevCountdown + 10);
      alert(`Has tenido suerte! El TA te regala 10 segundos extra`);
    }
  }, [level]);

  const handleComputerClick = () => {
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
      <div className="computer-game-screen">
    <div className="game-info">
      <p id="level" className="info-text">Level: {task.level}</p>
      <p className="info-text">Task: {task.type}</p>
      <p className="info-text">Points required: {taskPoints}</p>
      <p className="info-text">Progress: <ProgressBar value={progress} max={taskPoints} /></p>
      <p className="info-text">Time remaining: {countdown} seconds</p>
    </div>
    <div className="computer-image" onClick={handleComputerClick}>
      <img id="chatGPTbutton"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/1200px-ChatGPT_logo.svg.png"
        alt="Computer"
        style={{ cursor: 'pointer' }}
      />
    </div>
    <button className="quit-button" onClick={handleQuit}>
      Abandonar bootcamp
    </button>
  </div>

  );
};

export default ComputerGameScreen;
