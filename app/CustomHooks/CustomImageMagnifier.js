import Image from 'next/image';
import React, { useState } from 'react';

const CustomImageMagnifier = ({ smallImageSrc, largeImageSrc, altText, smallImageWidth = 300, smallImageHeight = 300 }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ top: 0, left: 0 });

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const offsetX = e.clientX - left;
    const offsetY = e.clientY - top;

    setMousePosition({
      left: (offsetX / width) * 500,
      top: (offsetY / height) * 100,
    });
  };

  return (
    <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
      {/* Small image container */}
      <div
        style={{
          position: 'relative',
          display: 'inline-block',
          cursor: 'zoom-in',
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onMouseMove={handleMouseMove}
      >
        <Image
          src={smallImageSrc}
          alt={altText}
          width={smallImageWidth}
          height={smallImageHeight}
          style={{
            objectFit: 'cover',
          }}
        />
      </div>

      {/* Magnified image container */}
      {isHovering && (
        <div
          style={{
            position: '',
            left:'10rem',
            width: '300px', // fixed width of magnified image
            height: '300px', // fixed height of magnified image
            backgroundImage: `url(${largeImageSrc})`,
            backgroundSize: '200% 200%', // zoom in effect
            backgroundPosition: `${mousePosition.left}% ${mousePosition.top}%`, // move with the mouse
            border: '2px solid #ccc',
            overflow: 'hidden',
            borderRadius: '10px',
            pointerEvents: 'none',
            zIndex: 10,
          }}
        />
      )}
    </div>
  );
};

export default CustomImageMagnifier;
