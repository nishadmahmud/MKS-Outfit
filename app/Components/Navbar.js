"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { LogIn, NotebookPen, ShoppingCart } from "lucide-react";
import { House } from "lucide-react";
import { Gift } from "lucide-react";
import useStore from "../CustomHooks/useStore";
import Image from "next/image";
const loginLogo = "/user.png";
import { IoNewspaperOutline } from "react-icons/io5";
import GlobeModalButton from "./GlobeModalButton";
import { Heart } from "lucide-react";
import { ShoppingBag } from "lucide-react";

const Navbar = ({ data, openCart, setOpenCart, setIsLoginModal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const categoryRef = useRef(null);
  const [showCategory, setShowCategory] = useState(false);
  //   const loggedInUser = JSON.parse(localStorage.getItem('user'))
  const [loggedInUser, setLoggedInUser] = useState(null);

  const { getCartItems, refetch, setRefetch, country, wishlist } = useStore();
  const handleCategoryClose = (event) => {
    if (categoryRef.current && !categoryRef.current.contains(event.target)) {
      setShowCategory(false);
    }
  };

  const user = typeof window !== "undefined" ? localStorage.getItem("user") : null


  useEffect(() => {
    document.addEventListener("click", handleCategoryClose);
    return () => document.removeEventListener("click", handleCategoryClose);
  }, []);

  // const handleMobileCategory = () => {
  //     setIsHovered(!isHovered)
  // }
  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        setLoggedInUser(user);
      }
    }
  }, []);

  useEffect(() => {
    getCartItems();
    if (refetch) {
      getCartItems();
      setRefetch(false);
    }
  }, [refetch, getCartItems, setRefetch]);

  const items = getCartItems();
  const total = items?.reduce((acc, curr) => (acc += curr.quantity), 0) || 0;

  return (
    <div className="relative">
      {/* desktop menu */}


      {/* mobile & tablet menu */}
      <div className="relative">
        <div className="fixed border-t -bottom-1 left-0 right-0 bg-[#f9f9f9] pt-1 z-50 shadow-lg lg:hidden">
          <div className="flex justify-around items-center py-2">
            <Link
              href="/"
              className="flex flex-col items-center text-sm text-[#242424]"
            >
              <House className="text-2xl" />
              <span className="text-black">Home</span>
            </Link>

            <Link
              href='/wishlist'

              className="flex flex-col items-center text-sm text-[#242424]"
            >
              <div>
                <Heart className="text-2xl" />
                {wishlist.length ? (<p className="bg-[#242424] z-[900] h-fit text-[#ffffff] w-fit px-1 text-xs rounded-full absolute top-2">
                  {wishlist.length}
                </p>) : ""}
              </div>
              <span className="text-black">Wishlist</span>
            </Link>

            <Link
              href='/cart'

              className="flex flex-col items-center text-sm text-[#242424]"
            >
              <div>
                <ShoppingBag className="text-2xl" />
                {total ? (<p className="bg-[#242424] z-[900] h-fit text-[#ffffff] w-fit px-1 text-xs rounded-full absolute top-2">
                  {total}
                </p>) : ""}
              </div>
              <span className="text-black">Cart</span>
            </Link>
            {user ? (
              <Link
                href="/"
                className="flex flex-col items-center text-sm text-[#242424]"
              >
                <Image

                  className="border-2 p-0.5 border-[#242424] rounded-full"
                  src={loginLogo}
                  alt="navLogo"
                  width={30}
                  height={30}
                />
                <span className="text-black">Account</span>
              </Link>
            ) : (
              <Link
                href="/"

                className="flex flex-col items-center text-sm text-[#242424] cursor-pointer"
              >
                <LogIn className="text-2xl" />
                <span className="text-black">Login</span>
              </Link>
            )}


          </div>


        </div>
        {isOpen && (
          <div className="bg-white flex flex-col space-y-3 text-white p-5 transition ease-in-out">
            {data?.data.slice(0, 7).map((item, idx) => {
              return (
                <Link
                  key={idx}
                  onClick={() => setIsOpen(false)}
                  href={`/category/${encodeURIComponent(
                    item?.category_id
                  )}?category=${encodeURIComponent(
                    item?.name
                  )}&total=${encodeURIComponent(item?.product_count)}`}
                  className={`text-black text-sm text-nowrap font-semibold flex items-center gap-1 `}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        )}

      </div>

      {/*all categories */}
      {/* {isHovered && <CategoryPopup isHovered={isHovered} setIsHovered={setIsHovered}/>} */}
      {/* {isHovered && <CategoryPopup isHovered={isHovered} setIsHovered={setIsHovered}/>} */}
    </div>
  );
};

export default Navbar;
