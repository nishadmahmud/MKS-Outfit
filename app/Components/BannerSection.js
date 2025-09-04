import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa6";

const BannerSection = ({ banner, categories }) => {
  const categoryList = categories?.data ?? [];



  return (
    <section className="w-11/12 px-4 mx-auto flex flex-col lg:flex-row items-center justify-between py-16 lg:py-24 gap-12 lg:gap-20 text-black">
      {/* Left side - Images */}
      <div className="relative flex-1 flex justify-center items-center">
        {/* Foreground Image */}
        <div className="z-0">
          <div className="relative w-64 h-96 sm:w-80 sm:h-[28rem] lg:w-[27rem] lg:h-[70vh] rounded overflow-hidden">
            {banner?.data?.[4] ? (
              <Image
                src={banner.data[4].image_path}
                alt="Sub Model"
                fill
                className="object-cover rounded"
                loading="lazy"
              />
            ) : (
              <div className="bg-gray-200 w-full h-full" />
            )}
          </div>
        </div>

        {/* Background Image */}
        <div className="absolute right-0 bottom-[-3rem] sm:right-[-2rem] sm:bottom-[-5rem] w-48 h-56 sm:w-64 sm:h-80 rounded overflow-hidden z-30 border-[10px] border-white shadow-md">
          {banner?.data?.[3] ? (
            <Image
              src={banner.data[3].image_path}
              alt="Main Model"
              fill
              className="object-cover"
              
            />
          ) : (
            <div className="bg-gray-300 w-full h-full" />
          )}
        </div>
      </div>

      {/* Right side - Text */}
      <div className="flex-1 mt-10 lg:mt-0 max-w-xl text-center lg:text-left">
        <p className="text-sm sm:text-base font-semibold uppercase tracking-widest">
          New Collections
        </p>
        <h2 className="text-3xl sm:text-5xl font-semibold mt-2 mb-4 leading-tight">
          Best Solid Shirt <br className="hidden md:block" /> For Everyone!
        </h2>
        <p className="text-gray-600 text-base sm:text-lg mb-6">
          Experience comfort and style with our premium solid shirt, designed to
          suit all body types and every occasion. Made from soft, breathable
          fabric, it’s perfect for everyday wear.
        </p>

        {categoryList?.[3] && (
  <div className="mt-4">
    <Link
      className="inline-flex text-black items-center gap-2 border border-black px-5 py-2 font-medium hover:bg-black hover:text-white transition-all"
      href={`category/6750?category=Solid%20Shirts&total=${encodeURIComponent(categoryList[3]?.product_count)}`}
    >
      Shop Now <FaArrowRight />
    </Link>
  </div>
)}

      </div>
    </section>
  );
};

export default BannerSection;
