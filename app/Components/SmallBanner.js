import React from 'react';
import noImg from '/public/no-image.jpg';

const SmallBanner = ({ banner }) => {
  const imageUrl = banner?.data?.[0]?.image_path || noImg.src;

  return (
    <div className="w-full bg-gray-100 h-[25vh] md:h-[55vh] mt-10 lg:mt-20">
      {banner?.data?.[0] && (
        <div
          className="
            w-full
            aspect-[3/1] md:aspect-[4/1] h-[25vh] md:h-[55vh] lg:aspect-[5/1]
            md:bg-fixed bg-cover bg-center object-cover
          "
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      )}
    </div>
  );
};

export default SmallBanner;
