import { MapPin, Settings2, Store } from 'lucide-react';
import { MessageCircle, MonitorPlay, Settings, Smartphone } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const OurFeatures = () => {
    const services = [
      
        {
          icon: Store,
          title: "Store Locator",
          description: "Find Store for Your Gadgets",
          link : '/store'
        },
        {
          icon: MonitorPlay,
          title: "Complain/Advice",
          description: "We Value your Feedback",
          link : 'https://www.facebook.com/share/18oagGM1az/?mibextid=wwXIfr'
        },
        {
          icon: MessageCircle,
          title: "Online Support",
          description: "Get Support on WhatsApp",
          link : 'https://wa.me/+8801898931468'
        },
        {
          icon: MapPin,
          title: "Order Tracking",
          description: "Track your order",
          link : '//order-tracking'
        }
       
      ]
    return (
    <section className="lg:py-7 lg:mt-4 w-11/12 mx-auto py-1 pb-8 lg:pt-0 pt-4">
      <div className="grid md:gap-6 gap-3 grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
        {services.map((service, index) => (
         <Link 
         href={service.link} 
         key={index}
         className="block group"
       >
         <div className="flex items-center gap-2 rounded-full border bg-[#ffffff] p-3 lg:p-6 hover:shadow-md shadow-sm transition-all duration-200  hover:scale-[1.02]">
           <div className="rounded-full p-2 text-black shrink-0  group-hover:text-white transition-colors bg-[#115e59]">
             <service.icon className="h-5 w-5 text-[#ffffff]" />
           </div>
           <div className="flex-1">
             <h3 className="font-semibold text-[#000000] lg:line-clamp-1 text-xs md:text-lg ">{service.title}</h3>
             <p className="text-sm hidden lg:block text-black line-clamp-2">{service.description}</p>
           </div>
         </div>
       </Link>
          
        ))}
      </div>
    </section>
    );
};

export default OurFeatures;