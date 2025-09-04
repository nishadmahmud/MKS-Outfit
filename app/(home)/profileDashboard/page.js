"use client";

import WithAuth from "@/app/Components/WithAuth";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { House, Mail, Phone, RefreshCcw, User } from "lucide-react";

const PersonalInfo = () => {
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user"));

    if (userInfo) {
      setUser(userInfo);
      setEmail(userInfo?.email || "");
      setAddress(userInfo?.address || "");
      setMobileNumber(userInfo?.mobile_number || "");

      const fullName = userInfo?.name || "";
      const nameParts = fullName.split(" ");
      setFirstName(nameParts[0] || ""); 
      setLastName(nameParts.slice(1).join(" ") || "");
    }
  }, []);

  const handleUpdate = async () => {
  setLoading(true);

  const token = localStorage.getItem("token"); 

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API}/customer/update-profile`,
      {
        id: user?.id,
       
        first_name: firstName,
        last_name: lastName,
        email,
        address,
        mobile_number: mobileNumber,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          
        },
      }
    );



    if (response.data) {
      toast.success("Customer info updated successfully!");
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...user,
           first_name: firstName,
        last_name: lastName,
          email,
          address,
          mobile_number: mobileNumber,
        })
      );
    }
  } catch (error) {
    console.error("Update error:", error);
    toast.error(error?.response?.data?.message || "An error occurred while updating.");
  } finally {
    setLoading(false);
  }
};


  return (
    <>
      <h2 className="text-xl font-bold mb-4 lg:mb-6 text-teal-800">Personal Info</h2>
      <div className="bg-white p-6 shadow-md rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
          <div className="flex gap-1 items-center">
            <User className="mb-1" color="gray" size={18}></User>
              <label className="block text-gray-700">
              First Name</label>
          </div>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full p-2 dark:bg-white border rounded text-black"
            />
          </div>
          <div>
            <label className="block text-gray-700">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full p-2 border dark:bg-white rounded text-black"
            />
          </div>
        </div>

        <div className="mt-4">
         <div className="flex gap-1.5 items-center">
            <Phone color="gray" size={17}></Phone>
              <label className="block text-gray-700">
              Mobile Number</label>
          </div>
          <input
            type="text"
            value={mobileNumber || "N/A"}
            onChange={(e) => setMobileNumber(e.target.value)}
            className="w-full p-2 border rounded dark:bg-white text-black"
          />
        </div>

        <div className="mt-4">
          <div className="flex gap-1.5 items-center">
            <Mail  color="gray" size={18}></Mail>
              <label className="block text-gray-700">
              Email</label>
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded dark:bg-white text-black"
          />
        </div>

        <div className="mt-4">
           <div className="flex gap-1.5 items-center">
            <House className="mb-1" color="gray" size={18}></House>
              <label className="block text-gray-700">
              Address</label>
          </div>
          <input
            type="text"
            value={address || "N/A"}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-2 border rounded dark:bg-white text-black"
          />
        </div>

        <button
          onClick={handleUpdate}
          disabled={loading}
          className="mt-6 px-4 flex justify-center items-center gap-1 w-full py-2 bg-teal-800 text-white rounded hover:bg-teal-900"
        >
          <RefreshCcw size={18}></RefreshCcw>
          {loading ? "Updating..." : "Update Info"}
        </button>
      </div>
    </>
  );
};

export default WithAuth(PersonalInfo);
