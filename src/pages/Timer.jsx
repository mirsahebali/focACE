import React, { useState, useEffect } from "react";
import styles from "@/styles/Timer.module.css"
const PomodoroTimer = () => {
  const [time, setTime] = useState(1500);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    if (!isRunning || isPaused) {
      return;
    }
    const id = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);
    setIntervalId(id);

    return () => {
      clearInterval(id);
    };
  }, [isRunning, isPaused]);

  const startTimer = () => {
    setIsRunning(true);
    setIsPaused(false);
  };

  const pauseTimer = () => {
    setIsPaused(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
    setIsPaused(false);
    setTime(1500);
    clearInterval(intervalId);
  };

  const resetTimer = () => {
    setTime(1500);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div className={styles.pomodoro_timer}>
      <div className={styles.timer_display}>
        <div className={styles.timer_circle}>
          <h1>{formatTime(time)}</h1>
        </div>
      </div>
      <div className={styles.timer_controls}>
        <button onClick={startTimer}>Start</button>
        <button onClick={pauseTimer}>Pause</button>
        <button onClick={stopTimer}>Stop</button>
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
