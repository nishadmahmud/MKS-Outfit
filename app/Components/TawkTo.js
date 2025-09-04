'use client'

import { useEffect } from 'react';

const TawkTo = () => {
 <div className='relative bg-red-500 p-10 cursor-pointer lg:bottom-20 bottom-32 right-5'>
    { useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://embed.tawk.to/67e1460a669fe61904e0739b/1in3vj75e';
    script.charset = 'UTF-8';
    script.async = true;
    script.setAttribute('crossorigin', '*');

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); 
    };
  }, [])}
 </div>

  return null;
};

export default TawkTo;
