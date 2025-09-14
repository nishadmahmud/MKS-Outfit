import React, { Suspense } from 'react';
import FeaturedCategoryUi from './FeaturedCategoryUi';
import { userId } from '../(home)/page';

const FeaturedCategories = async () => {
  const categoriesRes = await fetch(`${process.env.NEXT_PUBLIC_API}/public/categories/${userId}`,{
      cache: 'no-store'
    });
    const categories = categoriesRes.json();
  return (
    <div>
      <Suspense>
        <FeaturedCategoryUi categories={categories}/>
      </Suspense>
    </div>
  );
};

export default FeaturedCategories;