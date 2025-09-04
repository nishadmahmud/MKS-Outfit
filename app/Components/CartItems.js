"use client";
import React, { useEffect, useState } from "react";
import useStore from "../CustomHooks/useStore";
import { IoClose } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { ShoppingBag } from "lucide-react";

import { FaArrowDown, FaArrowUp } from "react-icons/fa6";
import { GiNotebook } from "react-icons/gi";
import toast from "react-hot-toast";

const CartItems = () => {
  const {
    getCartItems,
    setOpenCart,
    openCart,
    refetch,
    handleIncQuantity,
    handleDncQuantity,
    setRefetch,
    handleCartItemDelete,
  } = useStore();
  const [items, setItems] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setItems(getCartItems());
    if (refetch) {
      setItems(getCartItems());
      setRefetch(false);
    }
  }, [refetch, getCartItems, setRefetch]);

  const handleRedirect = () => {
    isChecked
      ? (router.push("/checkout"), setOpenCart(!openCart))
      : toast.error("Please Accept Terms & Conditions First");
  };



  return (
    <motion.div 
    initial={{ x: "100%" }} 
      animate={{ x: 0 }} 
      exit={{ x: "100%" }} 
      transition={{ duration: 0.3, ease: "easeInOut" }} 

      className="fixed top-0 right-0 lg:w-96 w-72  h-full bg-white shadow-lg z-50 p-4"

    >
      {
        items.length > 0 ? <>
        <div
        className={`overlay z-[70] ${openCart ? "active " : ""}`}
        onClick={() => setOpenCart(!openCart)}
      ></div>

      <div className=" fixed bg-white text-black lg:max-w-96 max-w-72 top-0 right-0 flex flex-col h-screen overflow-y-scroll z-[9999]">
        <div className="bg-[#ffffff] text-black flex p-3 items-center">
          <IoClose
            onClick={() => setOpenCart(!openCart)}
            className="text-red-500 bg-white rounded-md p-0.5 text-xl cursor-pointer"

          />
          <p className="text-center flex-1 font-bold">Mini Cart</p>
        </div>
        <div className="p-5 border-b-2 h-1/3 overflow-y-auto space-y-4 flex flex-col gap-y-4">
          {
            items?.map((item, idx) => {
              return (

                <div key={idx} className="flex lg:h-full h-16 gap-2 items-center md:pt-0 pt-5">

                  {
                    item?.image_path ? 
                    <Image
                    
                    src={item.image_path}
                    alt="cart-products"
                    height={80}
                    width={80}
                  />
                    :  
                    item?.images.length > 0 ? 
                    <Image
                    
                    src={item.images[0]}
                    alt="cart-products"
                    height={80}
                    width={80}
                  /> :
                    <Image
                    
                    src={'https://i.ibb.co.com/vwGWVVb/Pixel-7-Pro-Hazel-6784.jpg'}
                    height={80}
                    width={80}
                    alt="mobile-phone"
                    quality={75}
                  />
                  }
                  
                  <div className="space-y-1 font-semibold">

                    <p className="lg:text-lg text-xs text-ellipsis line-clamp-1">{item?.name}</p>

                    <p className="md:text-sm text-xs text-[#115e59]">{item?.discount ? item?.retails_price - ((item?.retails_price * item.discount) / 100).toFixed(0) : item?.retails_price} ৳</p>
                    
                    <div className="flex items-center border border-gray-300 rounded md:h-auto h-10 w-fit">
                      <input
                        type="number"
                        value={item.quantity}
                        min={1}

                        className="lg:w-12 lg:h-10 h-3 w-6 text-center bg-white dark:bg-white border-none focus:outline-none no-arrows"

                      />
                      <div className="flex flex-col justify-between ">
                        <button
                          onClick={() =>
                            handleIncQuantity(item?.id, item.quantity)
                          }

                          className="md:p-2 px-2 md:py-1 py-0.5 border-b border-l border-gray-300 text-xs md:text-sm"
                        >
                          <FaArrowUp></FaArrowUp>

                        </button>
                        <button
                          onClick={() =>
                            item.quantity> 0 &&  handleDncQuantity(item?.id, item.quantity)
                          }

                          className="md:p-2 md:py-1 px-2 py-0.5 border-b border-l border-gray-300 text-xs md:text-sm"
                        >
                          <FaArrowDown></FaArrowDown> 

                        </button>
                      </div>
                    </div>
                  </div>
                  <div
                    onClick={() => handleCartItemDelete(item?.id)}
                    className="flex-1 flex justify-end cursor-pointer"
                  >
                    <IoClose className="text-xl bg-white text-red-500" />
                  </div>
                </div>
              );
            })
           }
        </div>
        <div className="p-5 pt-2 h-[60vh]">
          <p className="flex items-center gap-1 mb-2"> <GiNotebook size={25}></GiNotebook> Special instructions for seller</p>
          <textarea rows={3} className="border outline-none bg-white p-2 rounded-sm dark:bg-white w-full"></textarea>

          <h5 className="flex justify-between items-center text-black font-bold md:text-lg text-sm">
            Subtotal :{" "}
            <span className="text-[#115e59] font-semibold">
              {" "}
              {(items.reduce(
              (prev, curr) => prev + ((curr?.discount ?  (curr?.retails_price - ((curr?.retails_price * curr.discount) / 100).toFixed(0)) * curr.quantity  : curr?.retails_price * curr.quantity)),
              0
            )).toFixed(2)}

              ৳
            </span>
          </h5>
          <Link href={"/cart"}>

          
            <button
              onClick={() => setOpenCart(!openCart)}
              className="py-2 w-full bg-[#4d5959] text-white mt-3 felx rounded-md items-center"
            >

              View Cart
            </button>
          </Link>
          <div className="flex gap-2 mt-3">
            <input
              onChange={(e) => setIsChecked(e.target.checked)}
              type="checkbox"
              className="cursor-pointer bg-white dark:bg-white"
            />
            <label>I agree with the terms and conditions.</label>
          </div>
          <button
            onClick={() => {
              handleRedirect();
            }}

            className="py-2 w-full bg-[#115e59] text-white mt-3 mb-6 rounded-md"
          >

            Check Out
            
          </button>
          <Image
            src={
              "https://www.custommacbd.com/cdn/shop/files/SSL_Commerz_Pay_With_logo_All_Size-01_320x.png?v=1614930139"
            }
            height={100}
            width={500}
            
            className="mt-3"
            alt="ssl-commerce"
          />
        </div>
      </div>
      </> 
      : <>
        <div
        className={`overlay z-20 ${openCart ? "active" : ""}`}
        onClick={() => setOpenCart(!openCart)}
      ></div>
      <div className="fixed lg:max-w-96 max-w-72 bg-white text-black w-96  top-0 right-0 flex flex-col h-screen overflow-y-scroll z-50">
      <div className="bg-[#ffffff] border-b text-black flex p-5 items-center justify-between">
         
          <div className="flex items-center gap-2">
            <ShoppingCart size={22}></ShoppingCart>
          <p className="text-center flex-1  font-semibold">Mini Cart</p>
          </div>

          <IoClose
          size={22}
            onClick={() => setOpenCart(!openCart)}

            className="text-red-600 text-lg cursor-pointer rounded-full"

          />
        </div>
        <div className="flex flex-col justify-center items-center h-[80vh]">

            <div className="bg-[#ffffff] p-4 rounded-full text-red-500">
              <ShoppingBag size={25}></ShoppingBag>
            </div>
        <p className="text-xl font-bold text-center text-gray-900">Your cart is empty</p>

        <p className="text-sm text-center text-gray-500 w-72">No items added in your cart. Please add product to your cart list.</p>

        </div>
      </div>
      </> 
      }
      
    </motion.div>
  );
};

export default CartItems;
