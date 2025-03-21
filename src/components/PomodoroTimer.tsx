import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addPomodoroTime } from '../redux/store';

interface TimerState {
  minutes: number;
  seconds: number;
  isRunning: boolean;
  isWork: boolean;
}

const PomodoroTimer: React.FC = () => {
  const [timer, setTimer] = useState<TimerState>({
    minutes: 0,
    seconds: 5,
    isRunning: false,
    isWork: true,
  });
  const [workDuration, setWorkDuration] = useState<number>(25);
  const [breakDuration, setBreakDuration] = useState<number>(5);
  const dispatch = useDispatch();
  const audioRef = useRef<HTMLAudioElement | null>(null); // Audio ob'ektini boshqarish uchun

  useEffect(() => {
    // Audio ob'ektini faqat bir marta yaratamiz
    if (!audioRef.current) {
      audioRef.current = new Audio('/alan-walker-fade-ncs-release.mp3');
    }

    let interval: NodeJS.Timeout | null = null;

    if (timer.isRunning) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev.seconds > 0) {
            return { ...prev, seconds: prev.seconds - 1 };
          } else if (prev.minutes > 0) {
            return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
          } else {
            // Sikl tugadi
            if (audioRef.current) {
              audioRef.current.pause(); // Avvalgi ijroni to‘xtatamiz
              audioRef.current.currentTime = 0; // Boshiga qaytaramiz
              audioRef.current.play(); // Yangi ijro boshlaymiz
            }
            dispatch(addPomodoroTime(prev.isWork ? workDuration : breakDuration));
            return {
              minutes: prev.isWork ? breakDuration : workDuration,
              seconds: 0,
              isRunning: false,
              isWork: !prev.isWork,
            };
          }
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer.isRunning, workDuration, breakDuration, dispatch]);

  const startTimer = () => {
    setTimer((prev) => ({ ...prev, isRunning: true }));
  };

  const stopTimer = () => {
    setTimer((prev) => ({ ...prev, isRunning: false }));
  };

  const resetTimer = () => {
    setTimer({
      minutes: workDuration,
      seconds: 0,
      isRunning: false,
      isWork: true,
    });
  };

  const formatTime = (minutes: number, seconds: number) =>
    `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <div className={`pomodoro-timer ${timer.isWork ? 'work-mode' : 'break-mode'}`}>
      <h2>{timer.isWork ? 'Ish Vaqti' : 'Dam olish'}</h2>
      <div className="timer-display">
        {formatTime(timer.minutes, timer.seconds)}
      </div>
      <div className="timer-settings">
        <label>
          Ish (daqiqa):
          <input
            type="number"
            value={workDuration}
            onChange={(e) => setWorkDuration(Math.max(1, Number(e.target.value)))}
            min="1"
            disabled={timer.isRunning}
          />
        </label>
        <label>
          Dam olish (daqiqa):
          <input
            type="number"
            value={breakDuration}
            onChange={(e) => setBreakDuration(Math.max(1, Number(e.target.value)))}
            min="1"
            disabled={timer.isRunning}
          />
        </label>
      </div>
      <div className="timer-controls">
        <button onClick={startTimer} disabled={timer.isRunning}>
          Boshlash
        </button>
        <button onClick={stopTimer} disabled={!timer.isRunning}>
          To‘xtatish
        </button>
        <button onClick={resetTimer}>Qayta boshlash</button>
      </div>
    </div>
  );
};

export default PomodoroTimer;