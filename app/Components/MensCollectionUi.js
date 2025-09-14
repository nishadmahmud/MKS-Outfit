// 'use client';
// import React from 'react';
// import ProductCard from '@/app/Components/ProductCard';
// import CardSkeleton from './CardSkeleton';
// import Heading from '../CustomHooks/title';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay } from 'swiper/modules';
// import 'swiper/css';
// import { useQuery } from '@tanstack/react-query';
// import { solidShirtCategory } from '@/lib/categoryWiseProduct';

// const MensTshirtUi = () => {

// const {data,isLoading,isError} = useQuery({
//     queryKey : ['CategoryWiseProduct'],
//     queryFn : ()=> solidShirtCategory()
// })

//   console.log(data);

//   return (
//     <div className="lg:my-16 my-10 md:w-11/12 w-11/12 mx-auto">
//       <Heading title={'Men Collection'} />

//       {isLoading ? (
//         <div className="grid grid-cols-2 mt-5 md:grid-cols-3 xl:grid-cols-4 lg:grid-cols-4 gap-3">
//           {Array.from({ length: 4 }).map((_, idx) => (
//             <CardSkeleton key={idx} />
//           ))}
//         </div>
//       ) : isError ? (
//         <p className="text-red-500 text-center col-span-full mt-5">
//           Failed to load products
//         </p>
//       ) : data?.data?.length > 0 ? (
//         <Swiper
//           spaceBetween={20}
//           slidesPerView={4}
//           slidesPerGroup={4}
//           loop={true}
//           speed={800}
//           autoplay={{
//             delay: 2000,
//             disableOnInteraction: false,
//           }}
//           modules={[Autoplay]}
//           breakpoints={{
//             320: {
//               slidesPerView: 2,
//               slidesPerGroup: 2,
//             },
//             768: {
//               slidesPerView: 3,
//               slidesPerGroup: 3,
//             },
//             1024: {
//               slidesPerView: 4,
//               slidesPerGroup: 4,
//             },
//           }}
//           className="mt-7"
//         >
//           {data.data.map((product) => (
//             <SwiperSlide key={product.id || product._id}>
//               <ProductCard product={product} />
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       ) : (
//         <p className="text-black text-center mt-5 col-span-full">
//           No products found
//         </p>
//       )}
//     </div>
//   );
// };

// export default MensTshirtUi;


'use client';
import React from 'react';
import ProductCard from '@/app/Components/ProductCard';
import CardSkeleton from './CardSkeleton';
import { useQuery } from '@tanstack/react-query';
import { mensTShirtCategory } from '@/lib/categoryWiseProduct';
import Title from '../CustomHooks/title';

const MensCollectionUi = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['CategoryWiseProduct'],
    queryFn: () => mensTShirtCategory(),
  });

  console.log(data);

  return (
    <div className="lg:my-16 my-10 md:w-11/12 w-11/12 mx-auto">
      <div className='mb-5'>
       <Title title='Men Collection'></Title>

      <p className='text-gray-600'>Timeless essentials for the modern man.</p>
     </div>

      {isLoading ? (
        <div className="grid grid-cols-2 mt-5 md:grid-cols-3 xl:grid-cols-4 lg:grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, idx) => (
            <CardSkeleton key={idx} />
          ))}
        </div>
      ) : isError ? (
        <p className="text-red-500 text-center col-span-full mt-5">
          Failed to load products
        </p>
      ) : data?.data?.length > 0 ? (
        <div className="grid grid-cols-2 mt-7 md:grid-cols-3 xl:grid-cols-4 lg:grid-cols-4 gap-3">
          {data.data.slice(0, 4).map((product) => (
            <ProductCard key={product.id || product._id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-black text-center mt-5 col-span-full">
          No products found
        </p>
      )}
    </div>
  );
};

export default MensCollectionUi;

