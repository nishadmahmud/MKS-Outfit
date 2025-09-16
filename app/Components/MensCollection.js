
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
import { fetcher, userId } from '../(home)/page';
import CardSkeleton from './CardSkeleton';
import ProductCard from './ProductCard';

const MensPanjabi = () => {

   const { data: menCollections, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API}/public/subcategorywise-products/7169`,
    fetcher,
   
  );

  
  console.log(menCollections, 'data from men collection');
   
  return (
    <div className='w-11/12 mx-auto mt-12'>

     <div className='mb-5'>
       <Title title="Men's Panjabi"></Title>

      {/* <p className='text-gray-600'>Fresh picks just in — discover the latest styles and products first.</p> */}
     </div>

      {/* Products grid */}
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-5">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, idx) => (
              <CardSkeleton key={idx} />
            ))
          ) : menCollections?.data.length > 0 ? (
            menCollections?.data.slice(0, 4).map((product, idx) => (
              <ProductCard key={idx} product={product} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">No products found</p>
          )}
        </div>
      
    </div>
  );
};

export default MensPanjabi;