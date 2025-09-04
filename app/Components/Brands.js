'use client'

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Heading from '../CustomHooks/heading';

const Brands = ({ brands }) => {
    const [brandCount, setBrandCount] = useState(9); // Default: small device (9 brands)

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setBrandCount(8); // Large screen → 8 brands
            } else {
                setBrandCount(9); // Small screen → 9 brands
            }
        };

        handleResize(); // Set initial count
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div 
            style={{ backgroundImage: `url(https://i.ibb.co.com/Zp6Zwfzd/2e352a34f29bd02eadca4b5d39136fd9.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
            <div className="md:mt-20 mt-10 pt-4">
                <Heading title="Shop By Brands" />
                <div className='grid w-11/12 my-8 mx-auto gap-6 lg:grid-cols-4 grid-cols-3 items-center justify-center lg:w-8/12'>
                    {brands?.data && brands?.data.length > 0 ? (
                        brands.data.slice(0, brandCount).map((item) => (
                            <Link key={item.id} href={`/brands/${item.id}?brand=${item.name}`} className='bg-white rounded-sm xl:px-20 md:px-10 px-5 py-1'>
                                <Image
                                    
                                    alt={item.name}
                                    src={item.image_path}
                                    height={105}
                                    width={105}
                                    className='lg:w-36 w-16'
                                />
                            </Link>
                        ))
                    ) : (
                        <p>No Brands Available</p>
                    )}
                </div>

                <div className='pb-5 flex flex-col justify-center items-center'>
                    <Link
                        href="/brands"
                        className="text-[#115e59] hover:bg-[#115e59] text-nowrap lg:w-40 w-32 justify-center hover:text-white transition-all ease-in-out border rounded-2xl border-[#115e59] flex items-center gap-2 px-2 h-fit py-1 lg:text-md text-sm pl-2"
                    >
                        All Brands
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Brands;
