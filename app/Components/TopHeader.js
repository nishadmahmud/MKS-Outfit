import { PhoneCall } from "lucide-react";
import Link from "next/link";
import React from "react";

const TopHeader = () => {
  return (
    <div className="bg-white h-8 hidden lg:block text-black">
      <div className="flex pt-1.5  justify-between w-11/12 mx-auto items-center">
        <div className="flex items-center text-xs gap-3">
          <Link className="hover:font-semibold hover:scale-105 transition ease-in-out" href="//order-tracking" >Order Tracking</Link>
          <Link  className="hover:font-semibold hover:scale-105 transition ease-in-out"  href="/offer" >Offer Details</Link>
          <Link  className="hover:font-semibold hover:scale-105 transition ease-in-out"  href="/blogs" >Blogs</Link>
          
        </div>

        <div className="flex items-center text-xs">
          <PhoneCall size={15}></PhoneCall>
          +880189946232564
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
