import { solidShirtCategory } from '@/lib/categoryWiseProduct';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import React from 'react';
import SolidShirtUi from './SolidShirtUi';

const SolidTshirt = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey : ['CategoryWiseProduct'],
    queryFn : solidShirtCategory
  })
  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SolidShirtUi />
      </HydrationBoundary>
    </div>
  );
};

export default SolidTshirt;