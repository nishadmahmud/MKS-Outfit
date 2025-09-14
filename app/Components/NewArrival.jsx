'use client'
import React from 'react';
import Title from '../CustomHooks/title';
import useSWR from 'swr';
import { fetcher, userId } from '../(home)/page';
import CardSkeleton from './CardSkeleton';
import ProductCard from './ProductCard';

const NewArrival = () => {

   const { data: newArrivals, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API}/public/new-arrivals/${userId}`,
    fetcher,
   
  );

  console.log(newArrivals, 'data from new arrival');
   
  return (
    <div className='w-11/12 mx-auto'>

     <div className='mb-5'>
       <Title title='✨New Arrival'></Title>

      <p className='text-gray-600'>Fresh picks just in — discover the latest styles and products first.</p>
     </div>

      {/* Products grid */}
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-5">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, idx) => (
              <CardSkeleton key={idx} />
            ))
          ) : newArrivals?.data?.data.length > 0 ? (
            newArrivals?.data?.data.slice(0, 8).map((product, idx) => (
              <ProductCard key={idx} product={product} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">No products found</p>
          )}
        </div>
      
    </div>
  );
};

export default NewArrival;