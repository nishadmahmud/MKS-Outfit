'use client';
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const VideoSection = () => {
  const videoRef = useRef(null);
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      if (inView) {
        video.play();
      } else {
        video.pause();
      }
    }
  }, [inView]);

  return (
    <div
      ref={inViewRef}
      className="relative w-full h-[35vh] md:h-[80vh] lg:h-screen overflow-hidden"
    >
      {/* Animated Overlay Text */}
      {inView && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center px-4"
        >
          <h1 className="text-3xl jost md:text-4xl lg:text-5xl font-bold drop-shadow-lg">
            Morshed Mart
          </h1>
          <p className="mt-2 text-base md:text-lg lg:text-xl drop-shadow-md">
            Your signature look, redefined
          </p>
        </motion.div>
      )}

      {/* Background Video */}
      <video
        ref={videoRef}
        src="/video.mp4"
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default VideoSection;
