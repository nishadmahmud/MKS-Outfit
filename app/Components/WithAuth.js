'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const WithAuth = (WrappedComponent) => {

   const Wrapper = (props) => {
    const router  = useRouter();

    useEffect(() => {
        // const intendedUrl = window.location.pathname;
        const token = localStorage.getItem('token');
        if(!token){
            router.push('/login')
        } 
    },[router])

    return <WrappedComponent {...props}/>
   }

   return Wrapper;
};

export default WithAuth;