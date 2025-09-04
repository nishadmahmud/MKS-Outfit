import React, { Suspense } from 'react';
import { userId } from '../(home)/page';
import HeaderUi from './HeaderUi';

const Header = async() => {
   const res = await fetch(`${process.env.NEXT_PUBLIC_API}/public/categories/${userId}`,{next: {revalidate : 360}});
  const data = await res.json();
  return (
    <div>
      <Suspense>
        <HeaderUi data={data}/>
      </Suspense>
    </div>
  );
};

export default Header;