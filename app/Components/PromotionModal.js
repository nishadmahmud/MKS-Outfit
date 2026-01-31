'use client'
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import useStore from "../CustomHooks/useStore";
import { IoClose } from 'react-icons/io5';
import { FadeLoader } from 'react-spinners';
import useSWR from 'swr';
import { fetcher, userId } from '@/lib/constants';
import { X } from 'lucide-react';

const PromotionModal = () => {
    const { isOpenPromoBanner, setIsOpenPromoBanner } = useStore();
    const [isFirstVisit, setIsFirstVisit] = useState(false);
    
    // Fetching the offers data
    const { data: offers, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API}/latest-ecommerce-offer-list/${userId}`, fetcher);

    const offer = offers?.data;

    console.log(offer);

 useEffect(() => {
    const hasSeenModal = sessionStorage.getItem("hasSeenPromoBanner");

    if (!hasSeenModal && offer?.length > 0) {
      // Only show the modal if offers exist
      setIsFirstVisit(true);
      setIsOpenPromoBanner(true);
      sessionStorage.setItem("hasSeenPromoBanner", "true");
    }
  }, [offer, setIsOpenPromoBanner]);

    const handleClose = () => {
        setIsOpenPromoBanner(false);
    };

    const lastImage = offer?.length ? offer[offer.length - 1].image : null;
// console.log("Promo Image URL:", lastImage);


    return (
        <div className={`modal-overlay fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center z-[9999] items-center px-4 ${isOpenPromoBanner && isFirstVisit && offer?.length > 0 ? '' : 'hidden'}`}>
            <dialog
                open
                className="relative rounded-lg flex flex-col justify-center bg-white text-black w-auto h-auto"
            >
                {/* Close Button */}
               <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-30 bg-red-500 hover:bg-red-600 p-1.5 rounded-full shadow-lg transition-all duration-200 hover:scale-110 group focus:outline-none focus:ring-2 focus:ring-red-300"
          aria-label="Close promotion"
        >
          <X className="w-4 h-4 text-white group-hover:text-gray-100 transition-colors duration-200" />
        </button>

                {/* Image Container */}
                <div className="relative h-full flex justify-center items-center md:w-[20rem] w-80">
                    {lastImage ? (
                        <Image
                        className='rounded-md' 
                        src={lastImage}
                        quality={100}
                        width={1000}
                        height={1000}
                        alt='promo' 
                        style={{ objectFit: 'cover' }} />
                    ) : (
                        <div>
                            <FadeLoader color='#115e59' />
                        </div>
                    )}
                </div>
            </dialog>
        </div>
    );
};

export default PromotionModal;
