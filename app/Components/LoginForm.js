"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import useStore from "../CustomHooks/useStore";
import toast from "react-hot-toast";
import { userId } from "../(home)/page";

const LoginForm = ({ isRegistered,setIsRegistered, isLoginModal,onClose,setReload }) => {
  const userData = JSON.parse(localStorage.getItem("user"));
 
  const customer_id = userData?.customer_id;
  const first_name = userData?.first_name;
  const last_name = userData?.last_name;
  const phone = userData?.phone;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    user_id : String(userId)
  });


   const {setToken} = useStore();
   const router = useRouter(); 
   const searchParams = useSearchParams();
   const intendedUrl = searchParams.get('redirect');


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${process.env.NEXT_PUBLIC_API}/customer-login`, formData)
      .then((res) => {
        if (res.data.token) {
          const updatedFormData = { ...formData, customer_id, first_name, last_name, phone };
          setFormData(updatedFormData);
          setReload(true)
          if(intendedUrl){
            router.push(intendedUrl);
          }else{
            router.push('/');
            toast.success("Login Successful!")
          }
          onClose();
          setToken(res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.customer));
          localStorage.setItem("token", res.data.token);
          
        }
      })
      .catch((error) => 
      toast.error("Invalid Login Credentials!")
      );
  };
  return (
    <div>
      <form
        className="w-full space-y-4 bg-transparent"
        onSubmit={handleSubmit}
      >
        {/* Email */}
        <div className="flex flex-col relative">
          <label className="absolute font-nunito text-xs text-[#102048] -top-[10px] left-[12px] bg-white px-1 font-semibold">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="input p-2 input-bordered  border-[#C1CFEF] border-[1px] w-full mb-[10px] focus:outline-none rounded-xl bg-white"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col relative">
          <label className="absolute font-nunito text-xs text-[#102048] -top-[10px] left-[12px] bg-white px-1 font-semibold">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="input p-2 input-bordered border-[#C1CFEF] border-[1px] w-full mb-[10px] focus:outline-none rounded-xl bg-white"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-[#115e59] text-white rounded-lg "
        >
          Login
        </button>
        {!isLoginModal ? (
          <p className="text-black text-center">
            Do Not Have an Account?{" "}
            <Link
              onClick={() => setIsRegistered(!isRegistered)}
              href={"/register"}
              className="hover:text-[#115e59]"
            >
              Register
            </Link>
          </p>
        ) : (
          <p className="text-black text-center">
            Do Not Have an Account?{" "}
            <span
              onClick={() => setIsRegistered(!isRegistered)}
              className="hover:text-[#115e59] cursor-pointer"
            >
              Register
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginForm;
