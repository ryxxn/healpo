// StopwatchComponent.tsx
import React from 'react';
import { useStopwatch } from './stopwatch.hook';

const playSound = () => {
  const audio = new Audio('/assets/beep.mp3');
  audio.play();
};

const Stopwatch = () => {
  const {
    time,
    isRunning,
    //
    start,
    stop,
    reset,
    restart,
  } = useStopwatch();

  const formatTime = (time: number): string => {
    const getSeconds = `0${time % 60}`.slice(-2);
    const minutes = Math.floor(time / 60);
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(time / 3600)}`.slice(-2);

    return `${getHours}:${getMinutes}:${getSeconds}`;
  };

  const checkPoint = (time: number) => {
    if (time % 5 === 0) {
      playSound();
    }
  };

  React.useEffect(() => {
    checkPoint(time);
  }, [time]);

  return (
    <div className="">
      <div className="display-time">{formatTime(time)}</div>
      <div className="controls">
        {!isRunning ? (
          <button onClick={start}>Start</button>
        ) : (
          <button onClick={stop}>Stop</button>
        )}
        <button onClick={reset}>Reset</button>
        <button onClick={restart}>Restart</button>
      </div>
    </div>
  );
};

export default Stopwatch;
