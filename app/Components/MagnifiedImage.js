"use client"

import  NextImage from "next/image";
import { useState } from "react"


const MagnifiedImage= ({ image_path,alt }) => {
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })
  const [isZooming, setIsZooming] = useState(false);
  const handleMouseMove = (e) => {
    setIsZooming(true)
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100
    setZoomPosition({ x, y })
  }

  



  return (
    <div className="flex relative items-center gap-5">
      {/* Image Container */}
      <div className="relative w-[350px] border rounded-md p-1 h-[400px]" onMouseLeave={() => setIsZooming(false)} onMouseMove={handleMouseMove} onMouseUp={() => setIsZooming(true)}>
        <NextImage 
        
        src={image_path}
        alt={alt}
        fill={true}
        style={{objectFit : 'cover'}}
        className="p-2"
        priority={true}
        />
      </div>

      {/* Magnifier Container */}
      {
        isZooming && <div className="w-[350px] absolute -right-[349px] top-0 h-[300px] overflow-hidden border border-gray-300 bg-white">
        <div
          className="w-[400px] h-[400px]"
        >
        <div
          className="w-[900px] h-[900px] relative"
          style={{
            transform: `translate(-${zoomPosition.x }%, -${zoomPosition.y - 10}%)`,
          }}
        > 
        <NextImage 
        
          src={image_path}
          alt={alt}
          style={{objectFit : 'cover'}}
          fill={true}
          quality={100}
          />
        </div>
        </div>
      </div>
      }
      
    </div>
  )
}

export default MagnifiedImage

