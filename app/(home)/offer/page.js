'use client'

import Image from "next/image";
import { fetcher, userId } from "../page";
import Link from "next/link";
import useSWR from "swr";
import Loader from "@/app/Components/Loader";

const Page = () => {

  const {data : offers,isLoading} = useSWR(`${process.env.NEXT_PUBLIC_API}/latest-ecommerce-offer-list/${userId}`,fetcher)


  
  return (
    <div className="lg:h-screen lg:pt-20 pt-16">
    
    <div className="grid lg:grid-cols-3 md:grid-cols-2 w-11/12  gap-5 mx-auto pb-5">
        {isLoading ? <Loader />
        : offers?.data && offers?.data.length > 0 ? 
        offers.data.map((offer,idx)=>(
           <div key={idx} className="bg-gray-200 text-black shadow-lg rounded-lg overflow-hidden p-6 flex flex-col relative">
           <Image width={100} height={100} src={offer.image} alt={offer.title} className="w-full h-64 object-cover rounded-lg" />
           <h2 className="text-2xl font-bold mt-4">{offer.title}</h2>
           <div className="mt-4 text-gray-700 flex-grow" dangerouslySetInnerHTML={{ __html: offer.description }}></div>
         
           {/* Button Positioned at the Bottom */}
           <Link href={`/offer/${offer.brand_id}`} className="absolute bottom-0 left-0 right-0 bg-gray-200 p-4 flex justify-center">
             <button className="bg-teal-600 text-white px-4 py-2 rounded-md">Details</button>
           </Link>
         </div>
        )) : 
        <p className="text-red-500 font-semibold text-center pt-40">No offer available</p>
        }
    </div>
    
    </div>
  );
};

export default Page;
