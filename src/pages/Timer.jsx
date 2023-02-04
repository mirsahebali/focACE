import React, { useState, useEffect } from "react";
import styles from "@/styles/Timer.module.css";
const PomodoroTimer = () => {
  const [time, setTime] = useState(1500);
  const [focusTime, setFocusTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  useEffect(() => {
    if (!isRunning || isPaused) {
      return;
    }
    if (time === 0) {
      if (!isBreak) {
        setTime(breakTime * 60);
        setIsBreak(true);
      } else {
        setTime(focusTime * 60);
        setIsBreak(false);
      }
      return;
    }
    const id = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);
    setIntervalId(id);

    return () => {
      clearInterval(id);
    };
  }, [isRunning, isPaused, time, breakTime, focusTime, isBreak]);

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
    setTime(focusTime * 60);
    clearInterval(intervalId);
  };

  const resetTimer = () => {
    setTime(focusTime * 60);
    setIsBreak(false);
  };

  const addFocusTime = (minutes) => {
    setFocusTime((prevFocusTime) => prevFocusTime + minutes);
    setTime((prevTime) => prevTime + minutes * 60);
  };

  const addBreakTime = (minutes) => {
    setBreakTime((prevBreakTime) => prevBreakTime + minutes);
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
        <button onClick={(isRunning && !isPaused)? pauseTimer : startTimer}> {(isRunning && !isPaused)? "Pause": "Start"} </button>
        <button onClick={stopTimer}>Stop</button>
        <button onClick={resetTimer}>Reset</button>
        <br />
        <button onClick={() => addFocusTime(1)}>+1</button>
        <span>{focusTime}</span>
        <button onClick={() => addFocusTime(-1)}>-1</button>
        <button onClick={() => addBreakTime(1)}>+1</button>
        <span>{breakTime}</span>
        <button onClick={() => addBreakTime(-1)}>-1</button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
