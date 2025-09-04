"use client"

import Countdown from "react-countdown";
import { FlipCard } from "./FlipCard";
import { useEffect, useState } from "react";

function padNumber(num) {
  return num.toString().padStart(2, "0");
}

function TimeDisplay({ days, hours, minutes, seconds }) {
  return (
    <div className="flex flex-col items-start lg:justify-start justify-center gap-[6px] mb-5 lg:mb-0">
      <div className="flex items-center gap-1 lg:gap-[7px]">
        {/* Days */}
        <div className="flex gap-[6px]">
          <FlipCard digit={padNumber(days)[0]} />
          <FlipCard digit={padNumber(days)[1]} />
        </div>

        {/* Separator */}
        <div className="relative h-10 bg-red-600 rounded-md shadow-lg overflow-hidden">
          
          <div className="absolute inset-x-0 top-[45%] h-[2px] bg-red-800/20" />
          <div className="absolute inset-x-0 top-[45%] h-[2px] bg-white/10" />
        </div>

        {/* Hours */}
        <div className="flex gap-[6px]">
          <FlipCard digit={padNumber(hours)[0]} />
          <FlipCard digit={padNumber(hours)[1]} />
        </div>

        {/* Separator */}
        <div className="relative h-10 bg-red-600 rounded-md shadow-lg overflow-hidden">
         
          <div className="absolute inset-x-0 top-[45%] h-[2px] bg-red-800/20" />
          <div className="absolute inset-x-0 top-[45%] h-[2px] bg-white/10" />
        </div>

        {/* Minutes */}
        <div className="flex gap-[6px]">
          <FlipCard digit={padNumber(minutes)[0]} />
          <FlipCard digit={padNumber(minutes)[1]} />
        </div>

        {/* Separator */}
        <div className="relative h-10 bg-red-600 rounded-md shadow-lg overflow-hidden">
          
          <div className="absolute inset-x-0 top-[45%] h-[2px] bg-red-800/20" />
          <div className="absolute inset-x-0 top-[45%] h-[2px] bg-white/10" />
        </div>

        {/* Seconds */}
        <div className="flex gap-[6px]">
          <FlipCard digit={padNumber(seconds)[0]} />
          <FlipCard digit={padNumber(seconds)[1]} />
        </div>
      </div>

      {/* Labels */}
      <div className="grid grid-cols-4 place-items-center gap-[2rem] text-red-600 font-bold w-full">
        <span className="ml-4 block">DAYS</span>
        <span className="ml-4 block">HRS</span>
        <span className="ml-2 block">MINS</span>
        <span className="ml-2 block">SECS</span>
      </div>
    </div>
  );
}

export default function Counter() {
  const [targetTime, setTargetTime] = useState(Date.now() + 86400 * 1000);

  useEffect(() => {
    const storedTime = localStorage.getItem("countdownTargetTime");
    if (storedTime) {
      setTargetTime(parseInt(storedTime, 10));
    } else {
      const initialTargetTime = Date.now() + 5000;
      setTargetTime(initialTargetTime);
      localStorage.setItem("countdownTargetTime", initialTargetTime);
    }
  }, []);

  const handleComplete = () => {
    const newTargetTime = Date.now() + 86400 * 1000;
    localStorage.setItem("countdownTargetTime", newTargetTime);
    setTargetTime(newTargetTime);
  };

  const renderer = ({ days, hours, minutes, seconds }) => (
    <TimeDisplay days={days} hours={hours} minutes={minutes} seconds={seconds} />
  );

  return (
    <div className="flex ">
      <Countdown date={targetTime} renderer={renderer} onComplete={handleComplete} />
    </div>
  );
}
