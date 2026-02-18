import { useState, useEffect, useRef } from "react";

interface TimerProps {
  isTimerOn: boolean;
  isSolved: boolean;
  setStoreTime: Function;
}

export default function Timer({
  isTimerOn,
  isSolved,
  setStoreTime,
}: TimerProps) {
  const [time, setTime] = useState(0);
  const timerInterval = useRef(0);
  const isSolvedChangedCounter = useRef(0);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const formattedTime =
    minutes.toString().padStart(2, "0") +
    ":" +
    seconds.toString().padStart(2, "0");

  useEffect(() => {
    // Start/Stop timer when toggling on/off
    if (isTimerOn) {
      timerInterval.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerInterval.current);
    }

    // Set store final time and reset the timer
    if (isSolved) {
      setStoreTime(time);
      isSolvedChangedCounter.current += 1;
    }
    // Check if game is solved and restarted, if it is reset timer
    else if (
      isSolvedChangedCounter.current &&
      isSolvedChangedCounter.current % 2 === 1
    ) {
      isSolvedChangedCounter.current += 1;
      setTime(0);
    }

    return () => {
      clearInterval(timerInterval.current);
    };
  }, [isTimerOn]);

  return (
    <div className="">
      <p className="text-base text-gray-800 font-counter">{formattedTime}</p>
    </div>
  );
}
