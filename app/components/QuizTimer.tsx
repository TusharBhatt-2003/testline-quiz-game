"use client"; // If you're using Next.js 13 and above

import { useState, useEffect } from "react";

// Define types for the props and state
interface QuizTimerProps {
  duration: number; // Duration in minutes
}

const QuizTimer = ({ duration }: QuizTimerProps) => {
  // Convert duration from minutes to seconds
  const [timeLeft, setTimeLeft] = useState<number>(duration * 60);
  const [isActive, setIsActive] = useState<boolean>(true);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(interval); // Cleanup interval on component unmount
    } else if (timeLeft === 0) {
      setIsActive(false); // Stop the timer when it reaches 0
    }
  }, [timeLeft, isActive]);

  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  return (
    <div className="flex justify-center items-center p-4">
      <div className="text-xl text-white font-light">
        {formatTime(timeLeft)}
      </div>
      {!isActive && timeLeft === 0 && (
        <div className="text-xl text-red-500 mt-4">Time's up!</div>
      )}
    </div>
  );
};

export default QuizTimer;
