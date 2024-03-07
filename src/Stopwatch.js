import React, { useState, useEffect } from "react";

const Stopwatch = () => {
  const [hoursInput, setHoursInput] = useState(0);
  const [minutesInput, setMinutesInput] = useState(0);
  const [secondsInput, setSecondsInput] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => {
        if (hours === 0 && minutes === 0 && seconds === 0) {
          setIsActive(false);
        } else {
          if (seconds === 0) {
            if (minutes === 0) {
              setHours((prevHours) => prevHours - 1);
              setMinutes(59);
              setSeconds(59);
            } else {
              setMinutes((prevMinutes) => prevMinutes - 1);
              setSeconds(59);
            }
          } else {
            setSeconds((prevSeconds) => prevSeconds - 1);
          }
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isActive, hours, minutes, seconds]);

  const handleStart = () => {
    setHours(hoursInput);
    setMinutes(minutesInput);
    setSeconds(secondsInput);
    setIsActive(true);
  };

  const handleStop = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setHoursInput(0);
    setMinutesInput(0);
    setSecondsInput(0);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  };

  return (
    <div>
      <div>
        <label>Hours:</label>
        <input
          type="number"
          value={hoursInput}
          onChange={(e) => setHoursInput(parseInt(e.target.value))}
        />
      </div>
      <div>
        <label>Minutes:</label>
        <input
          type="number"
          value={minutesInput}
          onChange={(e) => setMinutesInput(parseInt(e.target.value))}
        />
      </div>
      <div>
        <label>Seconds:</label>
        <input
          type="number"
          value={secondsInput}
          onChange={(e) => setSecondsInput(parseInt(e.target.value))}
        />
      </div>
      <div>
        <button onClick={handleStart} disabled={isActive}>
          Start
        </button>
        <button onClick={handleStop} disabled={!isActive}>
          Stop
        </button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <div>
        <h2>
          {`${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`}
        </h2>
      </div>
    </div>
  );
};

export default Stopwatch;
