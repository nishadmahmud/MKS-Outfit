'use client'
import React from 'react';
import Heading from '../CustomHooks/heading';
import useStore from '../CustomHooks/useStore';
import Link from 'next/link';
import SubHeading from '../CustomHooks/subHeading';
import Image from 'next/image';
import useSWR from 'swr';
import { fetcher, userId } from '../(home)/page';
import CardSkeleton from './CardSkeleton';
import ProductCard from './ProductCard';

const ReadyForOrder = () => {
    const { handleCart, handleBuy } = useStore();
    const { data: bestSellers, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API}/public/products/${userId}?page=1&limit=12`, fetcher);
    
    return (
        <div className="mt-12 w-11/12 mx-auto">
            <Heading title={'Ready for order'} />
            <div>
                {/* products */}
                <div className="grid grid-cols-2 md:grid-cols-3 md:gap-5 lg:gap-10 md:col-span-3 gap-4 lg:grid-cols-4 xl:grid-cols-6 mt-7">
                    {
                        isLoading ? (
                            <div className='col-span-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4'>
                                {
                                    Array.from({ length: 12 }).map((_, idx) => (
                                        <CardSkeleton key={idx} />
                                    ))
                                }
                            </div>
                        ) : bestSellers?.data?.length > 0 ? (
                            [...bestSellers.data, ...bestSellers.data].slice(0, 6).map((product, index) => (
                                <ProductCard product={product} key={index} />
                            ))
                        ) : (
                            <p className='text-black text-center col-span-6'>No products found</p>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default ReadyForOrder;
