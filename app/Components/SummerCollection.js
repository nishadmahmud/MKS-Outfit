'use client';
import React from 'react';
import Heading from '../CustomHooks/heading';
import useSWR from 'swr';
import { fetcher } from '../(home)/page';
import CardSkeleton from './CardSkeleton';
import ProductCard from './ProductCard';

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const SummerCollection = () => {
  const summerCollections = 6785;

  const { data: menCollection, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API}/public/categorywise-products/${summerCollections}&limit=12`,
    fetcher
  );

  return (
    <div className="mt-12 w-11/12 md:w-10/12 mx-auto">
      <Heading title={'Summer Collections'} />

      <Swiper
        spaceBetween={20}
        slidesPerView={4}
        slidesPerGroup={4}
        loop={true}
        speed={800}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
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
        className="mt-7"
      >
        {isLoading
          ? Array.from({ length: 4 }).map((_, idx) => (
              <SwiperSlide className='grid grid-cols-1' key={idx}>
                <CardSkeleton />
              </SwiperSlide>
            ))
          : menCollection?.data?.length > 0
          ? menCollection.data.slice(0, 12).map((product, index) => (
              <SwiperSlide key={product.id || index}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))
          : (
              <div className="w-full text-center col-span-6">
                <p className="text-black">No products found</p>
              </div>
            )}
      </Swiper>
    </div>
  );
};

export default SummerCollection;
