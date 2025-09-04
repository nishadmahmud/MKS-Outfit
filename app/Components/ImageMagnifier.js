import Image from "next/image";
import { useState, useRef } from "react";

const ImageMagnifier = ({ src, alt, zoom = 2 }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const imgRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!imgRef.current) return;

    const { left, top, width, height } = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setPosition({ x, y });
  };

  return (
    <div
      className="relative w-80 h-80 overflow-hidden border border-gray-300 rounded-lg"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Main Image */}
      <Image
      width={500}
      height={500}
        ref={imgRef}
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
      />

      {/* Magnifier */}
      {isHovering && (
        <div
          className="absolute top-0 left-0 w-full h-full bg-no-repeat pointer-events-none"
          style={{
            backgroundImage: `url(${src})`,
            backgroundSize: `${zoom * 100}%`,
            backgroundPosition: `${position.x}% ${position.y}%`,
          }}
        ></div>
      )}
    </div>
  );
};

export default ImageMagnifier;
