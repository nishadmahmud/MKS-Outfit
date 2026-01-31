'use client';
import React, { useRef } from 'react';
import useSWR from 'swr';
import { fetcher, userId } from '../(home)/page';
import CardSkeleton from './CardSkeleton';
import ProductCard from './ProductCard';
import Link from 'next/link';
import { IoArrowBack, IoArrowForward } from 'react-icons/io5';

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const NewArrivalUi = () => {
  const { data: newArrival, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API}/public/new-arrivals/${userId}`,
    fetcher
  );

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  // Filter out products that have no images or valid data if necessary
  // For now, we assume data is good or we render what we have.

  return (
    <div className="my-16 md:w-11/12 w-full mx-auto relative ">
      {/* Header Section */}
      <div className="flex flex-col items-center mb-8 px-4">
        <h1 className="text-3xl md:text-4xl text-black font-bold mb-3 outfit uppercase tracking-wide">
          New Arrivals
        </h1>
        <div className="h-1 w-16 bg-black mb-4"></div>
        <p className="text-center text-gray-600 max-w-2xl text-sm md:text-base poppins">
          Discover the latest trends and fresh styles just landed in our collection.
        </p>
      </div>

      {/* Slider Section */}
      <div className="relative px-2 md:px-6">
        {/* Custom Navigation Buttons */}
        <button
          ref={prevRef}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-gray-800 hover:bg-black hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 disabled:opacity-0"
          aria-label="Previous slide"
        >
          <IoArrowBack size={20} />
        </button>

        <button
          ref={nextRef}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-gray-800 hover:bg-black hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 disabled:opacity-0"
          aria-label="Next slide"
        >
          <IoArrowForward size={20} />
        </button>

        <Swiper
          className="w-full !pb-8 !px-1"
          modules={[Navigation, Autoplay, FreeMode]}
          spaceBetween={16}
          slidesPerView={2}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }}
          freeMode={true}
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 16,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
            1280: {
              slidesPerView: 5,
              spaceBetween: 24,
            },
          }}
        >
          {isLoading ? (
            Array.from({ length: 8 }).map((_, idx) => (
              <SwiperSlide key={`loading-${idx}`}>
                <CardSkeleton />
              </SwiperSlide>
            ))
          ) : newArrival?.data?.data?.length > 0 ? (
            newArrival?.data?.data.map((product) => (
              <SwiperSlide key={product.id} className="h-auto">
                <ProductCard product={product} />
              </SwiperSlide>
            ))
          ) : (
            <div className="w-full text-center py-10 col-span-full">
              <p className="text-gray-500">No new arrivals found at the moment.</p>
            </div>
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default NewArrivalUi;
