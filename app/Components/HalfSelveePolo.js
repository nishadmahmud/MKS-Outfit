"use client";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import Loader from "@/app/Components/Loader";
import ProductCard from "@/app/Components/ProductCard";
import CardSkeleton from "./CardSkeleton";
import Heading from "../CustomHooks/heading";
import { fetcher } from "../(home)/page";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const HalfSelveePolo = () => {
  const halfSelveePoloCategoryId = 6797;

  const {
    data: halfSelvePolo,
    error,
    isLoading,
  } = useSWR(
    `${process.env.NEXT_PUBLIC_API}/public/categorywise-products/${halfSelveePoloCategoryId}&limit=12`,
    fetcher
  );

  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    if (halfSelvePolo?.data?.length > 0) {
      const limited = halfSelvePolo.data.slice(0, 12);
      setFilteredItems(limited);
    }
  }, [halfSelvePolo]);

  return (
    <div className="lg:mt-20 my-10 md:w-10/12 w-11/12 mx-auto">
      <Heading title={"Half Sleeve Polo"} />

      {isLoading ? (
        <div className="grid grid-cols-2 mt-5 md:grid-cols-3 xl:grid-cols-5 lg:grid-cols-4 gap-3">
          {Array.from({ length: 6 }).map((_, idx) => (
            <CardSkeleton key={idx} />
          ))}
        </div>
      ) : error ? (
        <p className="text-red-500 text-center mt-5 col-span-full">
          Failed to load products
        </p>
      ) : filteredItems.length > 0 ? (
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
          {filteredItems.map((product) => (
            <SwiperSlide key={product.id || product._id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-black text-center mt-5 col-span-full">
          No products found
        </p>
      )}
    </div>
  );
};

export default HalfSelveePolo;
