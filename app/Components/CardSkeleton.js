import React from "react";

const CardSkeleton = () => {
  return (
    <div className="w-full max-w-xs mx-auto">
      <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
        {/* Image Skeleton */}
        <div className="aspect-[3/4] w-full animate-pulse rounded-lg bg-gray-200" />

        {/* Title Skeleton */}
        <div className="mt-3 h-5 w-2/3 animate-pulse rounded bg-gray-200 mx-auto" />

        {/* Price & Wishlist Skeleton */}
        <div className="mt-3 flex items-center justify-between">
          <div className="h-5 w-16 animate-pulse rounded bg-gray-300" />
          <div className="h-5 w-5 animate-pulse rounded-full bg-gray-300" />
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;
