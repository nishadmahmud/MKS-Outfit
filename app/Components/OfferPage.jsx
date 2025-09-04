'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const OfferPage = ({categories}) => {
  const baseDate = new Date('2025-06-11T00:00:00');
  const cycleDuration = 2 * 24 * 60 * 60 * 1000; 

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const elapsed = now - baseDate;
      const cyclesPassed = Math.floor(elapsed / cycleDuration);
      const nextDeadline = new Date(baseDate.getTime() + (cyclesPassed + 1) * cycleDuration);
      const diff = nextDeadline - now;

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown(); // Run immediately on mount

    const interval = setInterval(updateCountdown, 1000); // Run every second

    return () => clearInterval(interval);
  }, []);

  const categoryList = categories?.data ?? [];


  return (
    <div className="relative w-full">
      {/* Image for mobile (static positioning) */}
      <div className="md:hidden mt-10 w-full h-[300px] relative">
        <Image
          src="/banner-04.jpg"
          alt="Roland Grand White Shirt"
          layout="fill"
          objectFit="cover"
        />
      </div>

      {/* Desktop image with overlay text */}
      <div className="hidden md:block relative h-screen w-full">
        <Image
          src="/banner-04.jpg"
          alt="Roland Grand White Shirt"
          layout="fill"
          objectFit="cover"
          className="z-0"
        />

        <div className="absolute inset-0 bg-gray-800/20 flex items-center justify-end z-10">
          <div className="text-black w-full md:w-1/2 px-10 space-y-6 text-center md:text-left">
            <p className="uppercase text-sm text-black  tracking-wide font-semibold">Deal of the week</p>
            <h2 className="text-4xl md:text-5xl font-medium leading-snug">
             Ralph Lauren Beige <br></br> & Peach Stripe Shirt
            </h2>
            <p className="text-black max-w-lg mx-auto md:mx-0">
              Ralph Lauren&apos;s beige and peach stripe shirt blends classic elegance with modern comfort.
            </p>
            <div className="flex justify-center md:justify-start space-x-4 text-xl font-medium">
              <div>{timeLeft.days}<span className="text-sm">d</span></div>
              <div>:</div>
              <div>{timeLeft.hours.toString().padStart(2, '0')}<span className="text-sm">h</span></div>
              <div>:</div>
              <div>{timeLeft.minutes.toString().padStart(2, '0')}<span className="text-sm">m</span></div>
              <div>:</div>
              <div>{timeLeft.seconds.toString().padStart(2, '0')}<span className="text-sm">s</span></div>
            </div>
            {categoryList?.[3] && (
  <div>
     <Link href={`category/6749?category=Stripe%20Pattern%20Shirt&total=${encodeURIComponent(categoryList[3]?.product_count)}`} className="bg-black text-white px-6 py-3 text-sm hover:bg-gray-800 transition">Shop Now</Link>
  </div>
)}
           
            <p className="text-xs space-x-2 text-black pt-6">
              Limited time offer. The deal will expires on <span className="bg-yellow-200 px-2 py-1 font-semibold text-black">June 11, 2025</span> HURRY UP!
            </p>
          </div>
        </div>
      </div>

      {/* Mobile text section (stacked below image) */}
      <div className="md:hidden px-4 py-8 space-y-6 text-center text-black bg-[#f9f8f6]">
        <p className="uppercase text-sm tracking-wide font-semibold">Deal of the week</p>
        <h2 className="text-3xl leading-snug font-medium">
          Ralph Lauren Beige <br></br> & Peach Stripe Shirt
        </h2>
        <p className="text-white max-w-md mx-auto">
          Ralph Lauren&apos;s beige and peach stripe shirt blends classic elegance with modern comfort.
        </p>
        <div className="flex justify-center space-x-4 text-xl font-medium">
          <div>{timeLeft.days}<span className="text-sm">d</span></div>
          <div>:</div>
          <div>{timeLeft.hours.toString().padStart(2, '0')}<span className="text-sm">h</span></div>
          <div>:</div>
          <div>{timeLeft.minutes.toString().padStart(2, '0')}<span className="text-sm">m</span></div>
          <div>:</div>
          <div>{timeLeft.seconds.toString().padStart(2, '0')}<span className="text-sm">s</span></div>
        </div>
        {categoryList?.[4] && (
  <div>
     <Link href={`category/6749?category=Stripe%20Pattern%20Shirt&total=${encodeURIComponent(categoryList[3]?.product_count)}`} className="bg-black text-white px-6 py-3 text-sm hover:bg-gray-800 transition">Shop Now</Link>
  </div>
)}
        <p className="text-xs space-x-2 text-black pt-6">
          Limited time offer. The deal will expires on <span className="bg-yellow-200 text-black px-2 py-1 font-semibold">June 11, 2025</span> HURRY UP!
        </p>
      </div>
    </div>
  );
};

export default OfferPage;
