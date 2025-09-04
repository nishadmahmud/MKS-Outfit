"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { userId } from "../(home)/page";
import toast from "react-hot-toast";

const RegisterForm = ({setIsRegistered,isRegistered,isLoginModal}) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...formData, user_id: String(userId)};
  
    axios
      .post(`${process.env.NEXT_PUBLIC_API}/customer-registration`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const customerId = res?.data?.data?.id
        // Update formData with customer_id before saving it
        const updatedFormData = { ...formData, customer_id: customerId };
        setFormData(updatedFormData);
        
        setIsRegistered(!isRegistered);
        toast.success("Register Successful!");
  
        // Save the updated formData to localStorage
        localStorage.setItem("user", JSON.stringify(updatedFormData));
      })
      .catch((error) => toast.error("Invalid Register Credentials!"));
  };
  
  return (
    <div className="">
      <form className="lg:w-full w-11/12 mx-auto space-y-3 bg-transparent relative" onSubmit={handleSubmit}>
        {/* First Name */}
        <div className="flex flex-col relative">
          <label className="absolute font-nunito text-xs text-[#102048] -top-[10px] left-[12px] bg-white px-1 font-semibold">First Name</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            placeholder="First Name"
             className="input input-bordered border-[#C1CFEF] border-[1px] w-full mb-[10px] focus:outline-none rounded-md bg-white dark:bg-white"
          />
        </div>

        {/* Last Name */}
        <div className="flex flex-col relative">
          <label className="absolute font-nunito text-xs text-[#102048] -top-[10px] left-[12px] bg-white px-1 font-semibold">Last Name</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            placeholder="Last Name"
             className="input input-bordered border-[#C1CFEF] border-[1px] w-full mb-[10px] focus:outline-none rounded-md bg-white dark:bg-white"
          />
        </div>
        <div className="flex flex-col relative">
          <label className="absolute font-nunito text-xs text-[#102048] -top-[10px] left-[12px] bg-white px-1 font-semibold">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="input  input-bordered border-[#C1CFEF] border-[1px] w-full mb-[10px] focus:outline-none rounded-md bg-white dark:bg-white"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col relative">
          <label className="absolute font-nunito text-xs text-[#102048] -top-[10px] left-[12px] bg-white px-1 font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="input  input-bordered border-[#C1CFEF] border-[1px] w-full mb-[10px] focus:outline-none rounded-md bg-white dark:bg-white"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col relative">
          <label className="absolute font-nunito text-xs text-[#102048] -top-[10px] left-[12px] bg-white px-1 font-semibold">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="input  input-bordered border-[#C1CFEF] border-[1px] w-full mb-[10px] focus:outline-none rounded-md bg-white dark:bg-white"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-[#115e59] text-white rounded-lg transition ease-in-out hover:font-semibold"
        >
          Register
        </button>
        {
             !isLoginModal ?
                <p className='text-black text-center'>Do Not Have an Account? <Link onClick={() => setIsRegistered(!isRegistered)} href={'/register'} className='hover:text-[#115e59] hover:underline'>Register</Link></p>
              : <p className='text-black text-center'>Already Have an Account? <span onClick={() => setIsRegistered(!isRegistered)}  className='hover:text-[#115e59] cursor-pointer hover:underline font-semibold'>Login</span></p>
              
        }
      </form>
    </div>
  );
};

export default RegisterForm;
