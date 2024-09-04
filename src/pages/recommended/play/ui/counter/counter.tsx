import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Pause, Play, RotateCcw } from 'lucide-react';
import { formatTime } from './countet.util';
import { useCounter } from './counter.hook';
import { recommendedSets } from '../../../../../constants';

const createAudioContext = () => {
  return new (window.AudioContext || (window as any).webkitAudioContext)();
};

const playBeep = (audioCtx: AudioContext | null) => {
  if (!audioCtx) return;
  const oscillator = audioCtx.createOscillator(); // 사운드 소스 생성
  oscillator.type = 'square'; // 사운드 타입 설정
  oscillator.frequency.setValueAtTime(1000, audioCtx.currentTime); // 주파수 설정
  oscillator.connect(audioCtx.destination); // 연결
  oscillator.start(); // 재생 시작

  setTimeout(() => {
    oscillator.stop(); // 재생 종료
  }, 250); // 0.25초 동안 사운드 재생
};

const Counter = () => {
  const { id } = useParams();
  const data = recommendedSets.find((set) => set.id === id);

  const [playCount, setPlayCount] = useState(0);
  const [isEnd, setIsEnd] = useState(false);

  const sets = data?.sets ?? [];
  const audioCtxRef = useRef<AudioContext | null>(null);

  const { time, start, stop, reset, isRunning } = useCounter();

  const getStackedTime = (index: number) => {
    return sets
      ?.slice(0, index + 1)
      .reduce((acc, cur) => acc + Number(cur.time), 0);
  };

  const checkPoint = (currentTime: number) => {
    if (currentTime <= 0) return;
    const stackedTime = getStackedTime(playCount);

    if (currentTime === stackedTime) {
      playBeep(audioCtxRef.current); // 알림음 재생
      setPlayCount((prevCount) => prevCount + 1);
    }
  };

  useEffect(() => {
    if (isRunning) {
      const totalDuration = getStackedTime(sets.length);
      if (time >= totalDuration) {
        stop();
        playBeep(audioCtxRef.current); // 운동 종료 시 알림음
        setIsEnd(true);
        return;
      }

      checkPoint(time);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time, isRunning, sets, playCount]);

  const handleStart = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = createAudioContext(); // AudioContext 생성
    }
    start();
    playBeep(audioCtxRef.current); // 사용자 상호작용 시점에 오디오 재생
  };

  const handleRestart = () => {
    reset();
    start();
    setIsEnd(false);
  };

  return (
    <div className="p-4">
      <div>
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
          <button onClick={handleRestart}>
            <RotateCcw size="32" />
          </button>
        ) : !isRunning ? (
          <button onClick={handleStart}>
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
