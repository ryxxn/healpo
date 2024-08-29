// StopwatchComponent.tsx
import React from 'react';
import { useCounter } from './counter.hook';
import { useParams } from 'react-router-dom';
import { useExercise } from '../../../../apis';
import { Pause, Play, RotateCcw } from 'lucide-react';

const playSound = () => {
  const audio = new Audio('/assets/beep.mp3');
  audio.play();
};

const Counter = () => {
  const { id } = useParams();

  const { data } = useExercise({ id: id!, enabled: false });

  const [playCount, setPlayCount] = React.useState(0);
  const [isEnd, setIsEnd] = React.useState(false);

  const sets = data?.sets ?? [];

  const {
    time,
    isRunning,
    //
    stop,
    start,
    reset,
  } = useCounter();

  const formatTime = (time: number): string => {
    const getSeconds = `0${time % 60}`.slice(-2);
    const minutes = Math.floor(time / 60);
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(time / 3600)}`.slice(-2);

    return `${getHours}:${getMinutes}:${getSeconds}`;
  };

  const getStackedTime = (index: number) => {
    const stackedTime = sets
      ?.slice(0, index + 1)
      .reduce((acc, cur) => acc + Number(cur.time), 0);

    return stackedTime;
  };

  const checkPoint = (time: number) => {
    if (time <= 0) return;
    const stackedTime = getStackedTime(playCount);

    if (time === stackedTime) {
      playSound();
      setPlayCount(playCount + 1);
    }
  };

  const restart = () => {
    reset();
    start();
    setIsEnd(false);
    setPlayCount(0);
  };

  React.useEffect(() => {
    if (!isRunning) return;

    if (time >= getStackedTime(sets.length)) {
      stop();
      playSound();
      setIsEnd(true);
      return;
    }

    checkPoint(time);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time, isRunning]);

  return (
    <div className="p-4">
      <div className="">
        {isEnd ? (
          <div>종료</div>
        ) : (
          <div className="flex flex-col text-gray-500">
            <div>이번 세트 : {sets[playCount]?.name}</div>
            <div>다음 알림 시간 : {getStackedTime(playCount)}s</div>
          </div>
        )}
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-5xl text-center">
        {formatTime(time)}
      </div>
      <div className="w-full p-12 fixed bottom-0 left-0 flex justify-center">
        {isEnd ? (
          <button onClick={restart}>
            <RotateCcw size="32" />
          </button>
        ) : !isRunning ? (
          <button onClick={start}>
            <Play fill="black" size="32" />
          </button>
        ) : (
          <button onClick={stop}>
            <Pause fill="black" size="32" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Counter;
