"use client";

import Image from 'next/image';
import { useState, useRef } from 'react';
import noImage from '/public/no-image.jpg';

const CursorImageZoom = ({
  src,
  alt,
  className = "",
  zoomScale = 2.5
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const imageRef = useRef(null);

  const isLargeDevice = () => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth >= 1024; // Tailwind's "lg" breakpoint
  };

  const handleMouseEnter = () => {
    if (isLargeDevice()) {
      setIsZoomed(true);
    }
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
  };

  const handleMouseMove = (e) => {
    if (!isLargeDevice() || !imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setMousePosition({ x, y });
  };

  return (
    <div
      ref={imageRef}
      className={`relative overflow-hidden ${isLargeDevice() ? 'cursor-zoom-in' : ''} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <Image
        fill
        src={src || noImage}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-200 ease-out"
        style={{
          transform: isZoomed ? `scale(${zoomScale})` : 'scale(1)',
          transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
        }}
        loading="lazy"
        draggable={false}
      />
    </div>
  );
};

export default CursorImageZoom;
