// ProgressBar.js
import React from 'react';

const ProgressBar = ({ value, max }) => (
  <div className="progress-bar">
    <progress value={value} max={max}></progress>
  </div>
);

export default ProgressBar;
