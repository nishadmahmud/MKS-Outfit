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
import { ArrowRight } from "lucide-react";

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch h-[90vh]">
        <div className="space-y-4">
          {/* Left big box - Text */}
          <div className="bg-gray-200 h-[65vh] flex flex-col justify-center p-6 px-10 rounded-2xl">
            <h2 className="text-3xl md:text-5xl font-bold leading-tight text-gray-900">
              <span className="flex items-center gap-2">
                FOR <ArrowRight size={30}></ArrowRight>
              </span>
              <span className="text-black">EVERYONE BUT</span> <br />
              <span className="text-black">NOTANYONE</span>
            </h2>
            <p className="text-gray-600 mt-4 max-w-lg">
              We establish personal relationships with our boutiques, to make
              sure each is vetted for a stress-free shopping experience.
            </p>
          </div>

          {/* bottom category box */}
          <div className="flex items-center justify-between gap-4">
            <div className="h-40 w-1/2 bg-gray-200 rounded-2xl overflow-hidden relative flex items-end cursor-pointer">
              <Image
                src="/slider-11.jpg"
                alt="men category"
                width={500}
                height={500}
                className="object-cover w-full h-full"
              />
              {/* Black Overlay */}
              <div className="absolute inset-0 bg-black/30 transition duration-300 ease-in-out"></div>

              <span className="absolute bottom-3 left-3 text-white font-bold text-lg">
                Men
              </span>
            </div>

            <div className="h-40 w-1/2 bg-gray-200 rounded-2xl relative overflow-hidden flex items-end cursor-pointer">
              <Image
                src="/womencat.jpg"
                alt="women category"
                width={500}
                height={500}
                className="object-cover w-full h-full"
              />
              {/* Black Overlay */}
              <div className="absolute inset-0 bg-black/50 transition duration-300 ease-in-out"></div>

              <span className="absolute bottom-3 left-3 text-white font-bold text-lg">
                Women
              </span>
            </div>
          </div>
        </div>

        {/* Right big box - Swiper Slider */}
        <div className="relative h-[40vh] md:h-full rounded-2xl overflow-hidden">
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
              slider?.data.length > 0 &&
              slider?.data[0]?.image_path?.map((img, idx) => {
                const product = slider?.data[0]?.products?.[0];
                if (!product) return null;

                const slug = sanitizeSlug(product?.brand_name || product?.name);
                const productId = product?.id;
                const productLink = `/products/${slug}/${productId}`;

                return (
                  <SwiperSlide key={idx} className="relative w-full h-full">
                    <Link href={productLink}>
                      <Image
                        src={img}
                        priority={idx === 0}
                        alt={product?.name || "slider-image"}
                        fill
                        quality={100}
                        className="cursor-pointer object-cover"
                      />
                      <button className="absolute bottom-4 left-4 bg-white text-black px-4 py-2 rounded-full text-sm font-medium shadow-md">
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
