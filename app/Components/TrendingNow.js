'use client'
import React from 'react';
import Title from '../CustomHooks/title';
import useSWR from 'swr';
import { fetcher, userId } from '../(home)/page';
import CardSkeleton from './CardSkeleton';
import ProductCard from './ProductCard';

const TrendingNow = () => {

// TODO: Api change kora lagbe
   const { data: newArrivals, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API}/public/new-arrivals/${userId}`,
    fetcher,
   
  );
   
  return (
    <div className='w-11/12 mx-auto mt-16'>

     <div className='mb-5'>
       <Title title='🔥Trending Now'></Title>

      <p className='text-gray-600'>See what’s hot and loved by everyone right now.</p>
     </div>

      {/* Products grid */}
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-5">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, idx) => (
              <CardSkeleton key={idx} />
            ))
          ) : newArrivals?.data?.data.length > 0 ? (
            newArrivals?.data?.data.slice(0, 4).map((product, idx) => (
              <ProductCard key={idx} product={product} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">No products found</p>
          )}
        </div>
      
    </div>
  );
};

export default TrendingNow;