import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

interface QuizTimerProps {
  initialTime: number; // in seconds
  onTimeUp: () => void;
  isRunning: boolean;
}

export default function QuizTimer({ initialTime, onTimeUp, isRunning }: QuizTimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="quiz-timer text-red-600 font-semibold flex items-center">
      <Clock className="w-4 h-4 mr-2" />
      <span>
        {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
      </span>
    </div>
  );
}
