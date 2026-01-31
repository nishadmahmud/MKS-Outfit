
// import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
// import React from 'react';
// import { mensTShirtCategory } from '@/lib/categoryWiseProduct';
// import MensCollectionUi from './MensCollectionUi';

// const MensCollection = async () => {
//   const queryClient = new QueryClient();
//   await queryClient.prefetchQuery({
//     queryKey : ['CategoryWiseProduct'],
//     queryFn : mensTShirtCategory
//   })
//   return (
//     <div>
//       <HydrationBoundary state={dehydrate(queryClient)}>
//         <MensCollectionUi />
//       </HydrationBoundary>
//     </div>
//   );
// };

// export default MensCollection;

'use client'
import React from 'react';
import Title from '../CustomHooks/title';
import useSWR from 'swr';
import { fetcher, userId } from '@/lib/constants';
import CardSkeleton from './CardSkeleton';
import ProductCard from './ProductCard';
import Link from 'next/link';

const WinterCollection = () => {

   const { data: wintercollection, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API}/public/categorywise-products/7427`,
    fetcher,
   
  );

  
  console.log(wintercollection, 'data from men collection');
   
  return (
    <div className='w-11/12 mx-auto mt-12'>

     <div className='mb-5 flex justify-between
      items-center'>
       <Title title="Winter Collection❄️"></Title>

      {/* <p className='text-gray-600'>Fresh picks just in — discover the latest styles and products first.</p> */}

      <Link href={`/category/${encodeURIComponent(
          7427 || ""
        )}?category=${encodeURIComponent('Winter Collection' || "")}&total=${encodeURIComponent(
          1 || 0
        )}`} className='hover:underline text-black'>View all</Link>
     </div>

      {/* Products grid */}
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-5">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, idx) => (
              <CardSkeleton key={idx} />
            ))
          ) : wintercollection?.data.length > 0 ? (
            wintercollection?.data.slice(0, 4).map((product, idx) => (
              <ProductCard key={idx} product={product} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">No products found</p>
          )}
        </div>
      
    </div>
  );
};

export default WinterCollection;