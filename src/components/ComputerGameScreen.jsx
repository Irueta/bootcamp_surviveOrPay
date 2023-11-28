// ComputerGameScreen.jsx
import React, { useState, useEffect } from 'react';

const ComputerGameScreen = ({ player, onSurvived, onFailed, onQuit, level, pointsRequired }) => {
  const [inProgress, setInProgress] = useState(false);
  const [task, setTask] = useState({});
  const [taskPoints, setTaskPoints] = useState(0);
  const [progress, setProgress] = useState(0);
  const [countdown, setCountdown] = useState(10 * player.motivacion);

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
    if (level === 3) {
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
        onSurvived();
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
        <p>Task: {task.type}</p>
        <p>Level: {task.level}</p>
        <p>Points required: {taskPoints}</p>
        <p>Progress: {progress}</p>
        <p>Time remaining: {countdown} seconds</p>
      </div>
      <div className="computer-image" onClick={handleComputerClick}>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWKJUMjYDYwgiCkYkUgp_k1I5Tg6YrW5RLEuzTqFJStQ&s"
          alt="Computer"
          style={{ cursor: 'pointer' }}
        />
      </div>
      <button onClick={handleQuit}>Abandonar bootcamp</button>
    </div>
  );
};

export default ComputerGameScreen;
