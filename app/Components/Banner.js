"use client";

import Image from "next/image";
import React from "react";
const noImg = "/no-image.jpg";

const Banner = ({ banner }) => {

  console.log(banner);
  const image1 = banner?.data?.[0]?.image_path || noImg;
  const image2 = banner?.data?.[1]?.image_path || noImg;

  return (
    <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
      {/* Banner 1 */}
      <div className="relative w-full aspect-square overflow-hidden rounded-lg">
        <Image
          unoptimized
          src={image1}
          alt="Mens Banner 1"
          width={2000}
          height={2000}
          className="object-cover"
          quality={100}
        />
      </div>

      {/* Banner 2 */}
      <div className="relative w-full aspect-square overflow-hidden rounded-lg">
        <Image
          unoptimized
          src={image2}
          alt="Mens Banner 2"
          width={2000}
          height={2000}
          className="object-cover"
          quality={100}
        />
      </div>
    </div>
  );
};

export default Banner;
