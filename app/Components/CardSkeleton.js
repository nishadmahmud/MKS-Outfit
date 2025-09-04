import React from 'react';

const CardSkeleton = () => {
    return (
<div className='w-11/12 mx-auto'>

    
{/* <div className="flex lg:w-52 w-44 lg:gap-x-8 gap-x-5 h-[292px] flex-col gap-4 p-4 bg-gray-100 rounded-lg shadow-md">
            <div className="skeleton h-36 w-full bg-gray-300 rounded-md animate-pulse"></div>
            <div className="skeleton h-4 w-full bg-gray-300 rounded-md animate-pulse"></div>
            <div className="skeleton h-4 w-full bg-gray-300 rounded-md animate-pulse"></div>
            <div className="flex gap-2">
                <div className='skeleton h-4 w-full bg-gray-300 rounded-md animate-pulse'></div>
                <div className='skeleton h-4 w-full bg-gray-300 rounded-md animate-pulse'></div>

            </div>
        </div> */}
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      {/* Save Badge Skeleton */}
     

      {/* Image Skeleton */}
      <div className="mt-2 aspect-square w-full animate-pulse rounded-lg bg-gray-200" />

      {/* Title Skeleton */}
      <div className="mt-4 h-6 w-3/4 animate-pulse mx-auto text-center rounded bg-gray-200" />

      {/* Price Skeleton */}
      <div className="mt-4 flex items-center justify-center gap-2">
        
        <div className="h-5 w-24 animate-pulse rounded bg-gray-300" />
      </div>

      {/* Buttons Skeleton */}
      <div className="mt-4 flex gap-2">
        <div className="h-8 w-full animate-pulse rounded-lg bg-gray-200" />
        <div className="h-8 w-full animate-pulse rounded-lg bg-gray-300" />
      </div>
    </div>


</div>
    );
};


export default CardSkeleton;

