"use client";

import { useEffect, useState } from "react";

const TARGET_DATE = new Date("2026-12-18T00:00:00");

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(): TimeLeft {
  const difference = TARGET_DATE.getTime() - Date.now();

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor(
      (difference / (1000 * 60 * 60)) % 24
    ),
    minutes: Math.floor(
      (difference / (1000 * 60)) % 60
    ),
    seconds: Math.floor(
      (difference / 1000) % 60
    ),
  };
}

function pad(value: number) {
  return value.toString().padStart(2, "0");
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="mt-8 flex items-center gap-2 font-mono drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)] sm:mt-10 sm:gap-6"
      aria-label={`${timeLeft.days} days, ${timeLeft.hours} hours, ${timeLeft.minutes} minutes, and ${timeLeft.seconds} seconds remaining`}
    >
      <span className="text-2xl  font-medium text-foreground sm:text-4xl">
        {timeLeft.days}
      </span>

      <span className="text-2xl text-white/50 sm:text-4xl">:</span>

      <span className="text-2xl font-medium text-foreground sm:text-4xl">
        {pad(timeLeft.hours)}
      </span>

      <span className="text-2xl text-white/50 sm:text-4xl">:</span>

      <span className="text-2xl font-medium text-foreground sm:text-4xl">
        {pad(timeLeft.minutes)}
      </span>

      <span className="text-2xl text-white/50 sm:text-4xl">:</span>

      <span className="text-2xl font-medium text-foreground sm:text-4xl">
        {pad(timeLeft.seconds)}
      </span>
    </div>
  );
}