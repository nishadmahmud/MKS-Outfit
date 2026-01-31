"use client";

import Image from "next/image";
import React from "react";
const noImg = "/no-image.jpg"

const Banner2 = ({ banner }) => {

  console.log(banner);
  const image1 = banner?.data?.[2]?.image_path || noImg;

  return (
    <div className="w-11/12 mx-auto mt-10">
      {/* Banner 1 */}
      <div className="relative w-full  overflow-hidden h-full rounded-md">
        <Image
          unoptimized
          src={image1}
          alt="Mens Banner 1"
          width={2000}
          height={2000}
          className="md:object-contain md:h-full h-32 object-cover"

        />
      </div>

    </div>
  );
};

export default Banner2;
