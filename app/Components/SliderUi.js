"use client";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import "../globals.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRef } from "react";
import "swiper/css";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css/pagination";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { FiLink } from "react-icons/fi"

const sanitizeSlug = (str) => {
  return str
    ?.toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};

const SliderUi = ({ slider }) => {
  const swiperRef = useRef(null);

  return (
    <div className="pt-[3.5rem] w-11/12 mx-auto relative py-5">
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 items-stretch md:h-[90vh]">
        <div className="space-y-4">
          {/* Left big box - Text */}
          <div className="bg-gray-200 h-[65vh] flex-col justify-center p-6 px-10 rounded-2xl hidden md:flex">
            <h2 className="text-3xl md:text-5xl font-bold leading-10 text-gray-900">
              <span className="flex items-center gap-2 heroTitle">
                FOR <ArrowRight size={30}></ArrowRight>
              </span>
              <span className="text-black heroTitle">EVERYONE BUT</span> <br />
              <span className="text-black heroTitle">NOTANYONE</span>
            </h2>
            <p className="text-gray-600 mt-4 max-w-lg poppins text-base">
              We establish personal relationships with our boutiques, to make
              sure each is vetted for a stress-free shopping experience.
            </p>
          </div>

          {/* bottom category box */}
          <div className="flex items-center justify-between gap-4">
            <div className="h-40 w-1/2 bg-gray-200 rounded-2xl overflow-hidden relative flex items-end cursor-pointer group">
      <Image
        unoptimized
        src="/slider-11.jpg"
        alt="men category"
        width={500}
        height={500}
        className="object-cover w-full h-full"
      />

      {/* Base Black Overlay */}
      <div className="absolute inset-0 bg-black/30 transition duration-300 ease-in-out"></div>

      {/* Hover Overlay with Icon */}
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-300 ease-in-out">
        <Link
          href="/category/7346"
          className="text-white text-3xl p-3 bg-white/20 rounded-full backdrop-blur-md hover:bg-white/40 transition"
        >
          <ExternalLink />
        </Link>
      </div>

      {/* Text Label */}
      <span className="absolute bottom-3 left-3 text-white font-bold text-lg">
        Men
      </span>
    </div>
           


            <div className="h-40 w-1/2 bg-gray-200 rounded-2xl overflow-hidden relative flex items-end cursor-pointer group">
      <Image
        unoptimized
        src="https://www.outletexpense.xyz/uploads/230-Motiur-Rahman/1758518602.jpg"
        alt="men category"
        width={500}
        height={500}
        className="object-cover w-full h-full"
      />

      {/* Base Black Overlay */}
      <div className="absolute inset-0 bg-black/30 transition duration-300 ease-in-out"></div>

      {/* Hover Overlay with Icon */}
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-300 ease-in-out">
        <Link
          href="/category/7347"
          className="text-white text-3xl p-3 bg-white/20 rounded-full backdrop-blur-md hover:bg-white/40 transition"
        >
          <ExternalLink />
        </Link>
      </div>

      {/* Text Label */}
      <span className="absolute bottom-3 left-3 text-white font-bold text-lg">
        Women
      </span>
    </div>

            
            
          </div>
        </div>

        {/* Right big box - Swiper Slider */}
        <div className="relative h-[40vh] md:h-full rounded-2xl overflow-hidden md:order-last order-first">
          <Swiper
            pagination={{ clickable: true }}
            ref={swiperRef}
            slidesPerView={1}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            speed={500}
            modules={[Autoplay, Pagination]}
            className="w-full h-full"
          >
            {slider.status === 200 &&
              slider?.data?.length > 0 &&
              slider?.data[0]?.image_path?.map((img, idx) => {
                const product = slider?.data[0]?.products?.[0];
                // if (!product) return null;

                const slug = sanitizeSlug(product?.brand_name || product?.name);
                const productId = product?.id;
                const productLink = `/products/${slug}/${productId}`;

                return (
                  <SwiperSlide key={idx} className="relative w-full h-full">
                    <Link href={productLink}>
                      <Image
                      unoptimized
                        src={img}
                        priority={idx === 0}
                        alt={product?.name || "slider-image"}
                        fill
                        quality={100}
                        className="cursor-pointer object-cover"
                      />
                      <button className="absolute bottom-4 left-4 bg-black/20 poppins border border-white text-white px-10 py-2 rounded-full text-sm font-medium shadow-md backdrop-blur-sm flex items-center gap-2">
                      <ExternalLink size={20} />
                        SHOP NOW
                      </button>
                    </Link>
                  </SwiperSlide>
                );
              })}
          </Swiper>

          {/* Navigation Buttons */}
          <div
            onClick={() => swiperRef.current.swiper.slidePrev()}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white opacity-80 cursor-pointer rounded-full lg:p-3 p-2 z-10"
          >
            <FaChevronLeft className="text-black lg:text-xl text-sm" />
          </div>
          <div
            onClick={() => swiperRef.current.swiper.slideNext()}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white opacity-80 cursor-pointer rounded-full lg:p-3 p-2 z-10"
          >
            <FaChevronRight className="text-black lg:text-xl text-sm" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SliderUi;
