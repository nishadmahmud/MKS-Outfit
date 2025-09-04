

import { GitCompare } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Compare = () => {
  
    return (
        <Link href='/compare' className="fixed cursor-pointer md:bottom-44 bottom-40 w-10 right-7 z-[9999] border-2 border-[#115e59] h-28 rounded-3xl lg:text-md text-xs flex justify-end pb-3 flex-col items-center gap-1 text-[#115e59] hover:bg-[#115e59] hover:text-white transition ease-in-out font-semibold">
            
          
           <div className='writing-mode-vertical-tp -rotate-90 mb-5'>Compare</div>
           <GitCompare size={22}></GitCompare>
           
           
        </Link>
    );
};

export default Compare;