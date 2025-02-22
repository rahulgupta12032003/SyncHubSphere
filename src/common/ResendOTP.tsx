import React, { useState, useEffect } from "react";

interface ResendOTPProps {
  onResend: () => void;
  resendTime?: number;
  maxAttempts?: number;
  className?: string;
}

interface TimerDisplayProps {
  seconds: number;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ seconds }) => (
  <span className="text-[#8c9097] text-sm">
    {`${Math.floor(seconds / 60)}:${(seconds % 60)
      .toString()
      .padStart(2, "0")}`}
  </span>
);

const ResendOTP: React.FC<ResendOTPProps> = ({
  onResend,
  resendTime = 30,
  maxAttempts = 3,
  className = "",
}) => {
  const [timer, setTimer] = useState<number>(resendTime);
  const [attempts, setAttempts] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(true);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setIsActive(false);
            if (interval) clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timer]);

  const handleResendClick = () => {
    if (attempts < maxAttempts && !isActive) {
      setAttempts((prev) => prev + 1);
      setTimer(resendTime);
      setIsActive(true);
      onResend();
    }
  };

  const isDisabled = isActive || attempts >= maxAttempts;
  const attemptsLeft = maxAttempts - attempts;

  return (
    <div className={`flex flex-col  space-y-2 ${className}`}>
      <div className="flex items-center space-x-2">
        <button
          onClick={handleResendClick}
          disabled={isDisabled}
          className={`text-sm font-medium ${
            isDisabled
              ? "text-[#8c9097] cursor-not-allowed"
              : "text-[#2563eb] hover:text-[#1d4ed8] cursor-pointer"
          }`}
        >
          Resend OTP
        </button>
        {timer > 0 && <TimerDisplay seconds={timer} />}
      </div>

      {attempts > 0 && attemptsLeft > 0 && (
        <p className="text-[#8c9097] text-xs">
          ({attemptsLeft} {attemptsLeft === 1 ? "attempt" : "attempts"} left)
        </p>
      )}

      {attemptsLeft === 0 && (
        <p className="text-[#dc2626] text-xs">
          Maximum attempts reached. Please try again later.
        </p>
      )}
    </div>
  );
};
export default ResendOTP;
