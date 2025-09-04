import React from 'react';
import SliderUi from './SliderUi';
import { userId } from '../(home)/page';

const HeroSlider = async() => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/get-sliders/${userId}`,{next : {revalidate : 360}});
  const slider = await res.json();
  return (
    <div>
      <SliderUi slider={slider}/>
    </div>
  );
};

export default HeroSlider;