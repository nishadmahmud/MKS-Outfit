'use client'
import React from 'react';
import useSWR from 'swr';
import { fetcher, userId } from '../(home)/page';
import CardSkeleton from './CardSkeleton';
import ProductCard from './ProductCard';

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const NewArrivalUi = () => {
  const { data: newArrival, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API}/public/new-arrivals/${userId}`,
    fetcher
  );

  return (
    <div className="my-12 md:w-10/12 w-11/12 mx-auto">
      <h1 className='md:text-2xl text-lg text-center py-2 text-black font-semibold'>New Arrival</h1>
      <p className='text-center md:w-7/12 mx-auto text-gray-800'>
       Elevate your wardrobe with our New Arrivals—a curated collection designed to inspire confidence, comfort, and effortless style.
      </p>

      <div className="mt-7">
        <Swiper
          className='w-full'
          spaceBetween={12}
          slidesPerView={4}
          slidesPerGroup={4}
          // loop={true}
          // speed={1500}
          // autoplay={{
          //   delay: 4000,
          //   disableOnInteraction: false,
          // }}
          // modules={[Autoplay]}
          breakpoints={{
            320: {
              slidesPerView: 2,
              slidesPerGroup: 2,
            },
            768: {
              slidesPerView: 3,
              slidesPerGroup: 3,
            },
            1024: {
              slidesPerView: 4,
              slidesPerGroup: 4,
            },
          }}
        >
          {isLoading ? (
            Array.from({ length: 12 }).map((_, idx) => (
              <SwiperSlide key={`loading-${idx}`}>
                <div className="justify-center grid md:grid-cols-4 grid-cols-2">
                  <CardSkeleton />
                </div>
              </SwiperSlide>
            ))
          ) : newArrival?.data?.data?.length > 0 ? (
            newArrival?.data?.data.map((product) => (
              <SwiperSlide className='w-full' key={product.id}>
                <div>
                  <ProductCard product={product} />
                </div>
              </SwiperSlide>
            ))
          ) : (
            <div className='w-full text-center'>
              <p className='text-black'>No products found</p>
            </div>
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default NewArrivalUi;
