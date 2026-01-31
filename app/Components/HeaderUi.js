"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { FaUsers } from "react-icons/fa6"
import Image from "next/image"
import Link from "next/link"
import { Gift, Heart, NotebookPen, ShoppingBag, ShoppingBagIcon, User } from "lucide-react"
import { IoCloseSharp, IoSearch } from "react-icons/io5"
import axios from "axios"
const noImg = "/no-image.jpg"
import Search from "./Search"
import useStore from "../CustomHooks/useStore"
import CartItems from "./CartItems"
import { useSearchParams } from "next/navigation"
import RegisterForm from "./RegisterForm"
import LoginForm from "./LoginForm"
import Modal from "./Modal"
import Navbar from "./Navbar"
import { userId } from "@/lib/constants"
import { ShoppingCart } from "lucide-react"
import ProductCard from "./ProductCard"
import { AnimatePresence, motion } from "framer-motion";


const HeaderUi = ({ data }) => {
  const {
    setOpenCart,
    openCart,
    isLoginModal,
    setIsLoginModal,
    setIsRegistered,
    isRegistered,
    setReload,
    getCartItems,
    userInfo,

  } = useStore()
  const [keyword, setKeyword] = useState("")
  const [searchedItem, setSearchedItem] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isSearchSidebarOpen, setIsSearchSidebarOpen] = useState(false)
  const debounceRef = useRef(null)
  const searchBarRef = useRef(null)

  // Mock user and cart data
  const user = typeof window !== "undefined" ? localStorage.getItem("user") : null
  const items = getCartItems()
  const total = items?.reduce((acc, curr) => (acc += curr.quantity), 0) || 0
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev)
  }

  const sidebarVariants = {
    hidden: { x: "-100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 80, damping: 18 },
    },
    exit: { x: "-100%", opacity: 0, transition: { duration: 0.3 } },
  };

  // Children container animation (for stagger)
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  // Each item animation
  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
  };

  // search api
  // useEffect(() => {
  //   if (keyword) {
  //     const timer = setTimeout(() => {
  //       setIsSearching(true);
  //     }, 600);

  //     return () => clearTimeout(timer);
  //   } else {
  //     setSearchedItem([]);
  //   }
  // }, [keyword]);

  const handleChange = (e) => {
    setKeyword(e.target.value)
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    debounceRef.current = setTimeout(() => {
      handleSearch(e.target.value)
    }, 600)
  }

  const handleSearch = async (value) => {
    setIsSearching(true)
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API}/public/search-product`, {
        keyword: value,
        user_id: userId,
      })
      const data = res.data
      setSearchedItem(data?.data?.data)
      setIsSearching(false)
    } catch (error) {
      console.log(error)
      setSearchedItem([])
      setIsSearching(false)
    }
  }

  const toggleSearchSidebar = () => {
    setIsSearchSidebarOpen(!isSearchSidebarOpen)
    setKeyword("")
    setSearchedItem([])
  }

  const handleClickOutside = useCallback(
    (event) => {
      if (
        isSidebarOpen &&
        !event.target.closest('[data-sidebar="mobile"]') &&
        !event.target.closest('[data-sidebar-trigger="mobile"]')
      ) {
        setIsSidebarOpen(false)
      }

      if (
        isSearchSidebarOpen &&
        !event.target.closest('[data-sidebar="search"]') &&
        !event.target.closest('[data-sidebar-trigger="search"]') &&
        !event.target.closest("[data-search-results]")
      ) {
        setIsSearchSidebarOpen(false)
      }
    },
    [isSidebarOpen, isSearchSidebarOpen],
  )

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [handleClickOutside])

  const pathname = useSearchParams()
  useEffect(() => {
    if (pathname.get("login") == "false") {
      setIsLoginModal(true)
    }
  }, [pathname, setIsLoginModal])

  const handleModalClose = () => setIsLoginModal(false)


  const [subcategories, setSubcategories] = useState({});
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const fetchSubcategories = async (categoryId) => {
    if (!subcategories[categoryId]) {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API}/public/category-wise-subcategory/${categoryId}`
        );
        const result = await res.json();

        if (result?.status === 200) {
          setSubcategories((prev) => ({
            ...prev,
            [categoryId]: result.data[0]?.sub_category || [],
          }));
        }
      } catch (err) {
        console.error("Error fetching subcategories:", err);
      }
    }
  };

  const [openCategory, setOpenCategory] = useState(null); // NEW

  const handleToggleCategory = async (categoryId) => {
    if (openCategory === categoryId) {
      setOpenCategory(null); // collapse
    } else {
      setOpenCategory(categoryId); // expand
      await fetchSubcategories(categoryId);
    }
  };

  return (
    <div>
      <style jsx global>{`
        .burger-menu span {
          transform-origin: center;
          transition: all 0.3s ease;
        }

        .burger-menu.open span:first-child {
          transform: translateY(0.25rem) rotate(45deg);
        }

        .burger-menu.open span:nth-child(2) {
          opacity: 0;
        }

        .burger-menu.open span:last-child {
          transform: translateY(-0.25rem) rotate(-45deg);
        }
      `}</style>
      <div className="w-full z-50 text-black transition-all duration-500 bg-white fixed mt-0">
        {/* Main header */}
        <div className="flex justify-between items-center  backdrop-blur-md text-black pb-2 pt-3.5 w-11/12 mx-auto">
          {/* Mobile menu button */}
          <div className="flex items-center lg:gap-3 gap-1">
            <button
              onClick={toggleSidebar}
              aria-label="Toggle menu"
              data-sidebar-trigger="mobile"
              className="relative z-50 w-8 h-8 flex items-center justify-center lg:hidden"
            >
              <div className={`burger-menu text-white bg-white ${isSidebarOpen ? "open" : ""}`}>
                <span
                  className={`block w-5 h-0.5 bg-black transition-all duration-300 ${isSidebarOpen ? "rotate-45 translate-y-1" : ""
                    }`}
                ></span>
                <span
                  className={`block w-5 h-0.5 bg-black my-1 transition-all duration-300 ${isSidebarOpen ? "opacity-0" : ""
                    }`}
                ></span>
                <span
                  className={`block w-5 h-0.5 bg-black transition-all duration-300 ${isSidebarOpen ? "-rotate-45 -translate-y-1" : ""
                    }`}
                ></span>
              </div>
            </button>

            <div className="hidden lg:flex gap-5">
              <div>
                <Link href={"/"}>
                  <Image unoptimized src='https://www.outletexpense.xyz/uploads/215-Rifat-Hasan/1762859683.png' width={500} height={500} className="w-8 md:w-14" alt="logo"></Image>
                </Link>
              </div>

              <div onClick={toggleSearchSidebar} className="flex items-center gap-0.5 text-base cursor-pointer">
                <IoSearch
                  size={18}
                  className=" text-gray-800 peer-focus:text-black transition-colors"
                /> Search
              </div>

            </div>
          </div>

          <div className="lg:hidden absolute left-1/2 transform -translate-x-1/2 flex justify-center">
            <Link href={"/"}>
              <Image unoptimized src='https://www.outletexpense.xyz/uploads/215-Rifat-Hasan/1762859683.png' width={500} height={500} className="w-10 md:w-20" alt="logo"></Image>
            </Link>
          </div>

          <div className="hidden lg:flex items-center justify-center flex-1 mx-8 pr-20">
            <nav className="flex items-center space-x-8 relative">
              {data?.data?.slice(0, 5).map((item, idx) => {
                const categoryHref = `/category/${encodeURIComponent(
                  item?.category_id || ""
                )}?category=${encodeURIComponent(item?.name || "")}&total=${encodeURIComponent(
                  item?.product_count || 0
                )}`;

                const isHovered = hoveredCategory === item?.category_id;
                const currentSubs = subcategories[item?.category_id] || [];

                return (
                  <div
                    key={item?.category_id}
                    className="relative"
                    onMouseEnter={() => {
                      setHoveredCategory(item?.category_id);
                      fetchSubcategories(item?.category_id);
                    }}
                    onMouseLeave={() => setHoveredCategory(null)}
                  >
                    {/* Category link */}
                    <Link
                      href={categoryHref}
                      className="text-sm font-medium text-gray-700 hover:text-gray-600 transition-colors duration-200 whitespace-nowrap"
                    >
                      {item?.name || `Category ${idx + 1}`}
                    </Link>

                    {/* Subcategories dropdown */}
                    {isHovered && currentSubs.length > 0 && (
                      <div className="absolute top-full -left-20 pt-2 z-[100]">
                        <div className="bg-white ring-1 ring-black ring-opacity-5 transition-all duration-200 ease-in-out">
                          <div className="py-2">
                            <div className="grid grid-cols-2 min-w-80 w-96 gap-1">
                              {currentSubs.map((sub) => (
                                <Link
                                  key={sub.id}
                                  href={`/subcategory/${sub.id}?subcategory=${encodeURIComponent(
                                    sub.name
                                  )}&categoryId=${encodeURIComponent(item?.category_id)}`}
                                  className="px-5 py-2 text-sm text-gray-700 hover:text-[#707070] transition-colors duration-150 ease-in-out text-start"
                                >
                                  {sub.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>

          {/* Right side icons */}
          <div className="flex items-center justify-end gap-2 md:gap-6">


            {/* Search icon */}
            <button
              onClick={toggleSearchSidebar}
              className="flex md:hidden items-center transition ease-in-out text-black"
              aria-label="Search"
              data-sidebar-trigger="search"
            >
              <IoSearch size={23} />
            </button>

            {/* <Link 
            href="/"
            // href="/wishlist"
             className="hidden md:flex flex-col items-center text-sm text-[#000000]">
              <div>
                <Heart className="text-xl" />
                {wishlist.length > 0 ? (
                  <p className="bg-[#000000]  z-[900] text-[#ffffff] text-[9px] rounded-full w-4 h-4 text-center absolute top-4">
                    {wishlist.length}
                  </p>
                ) : (
                  ""
                )}
              </div>
            </Link> */}

            {/* Cart icon */}
            <Link
              href="/cart"
              //  href="/" 
              className="items-center cursor-pointer hidden md:flex" aria-label="Cart">
              <div className="relative">
                <ShoppingCart size={22} className="text-black" />
                {total > 0 && (
                  <span className="absolute -top-1 -right-0 bg-black text-white text-[8px] rounded-full w-3 h-3 flex items-center justify-center">
                    {total}
                  </span>
                )}
              </div>
            </Link>

            {/* User account */}
            {!user ? (
              <Link
                // href="/" 
                href="/login"
                className="hidden lg:flex items-center cursor-pointer" aria-label="Login">
                <User size={22} className="text-black" />
              </Link>
            ) : (
              <Link

                // href="/"
                href="/profileDashboard"

                className="hidden lg:flex items-center cursor-pointer">
                <div className="w-6 h-6 rounded-full overflow-hidden">
                  <Image unoptimized src="/userLogin.png" alt="User" width={32} height={32} />
                </div>
              </Link>
            )}

          </div>
        </div>

        {/* Mobile sidebar */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              data-sidebar="mobile"
              key="sidebar"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={sidebarVariants}
              className="fixed top-0 left-0 w-4/5 max-w-xs h-full bg-white text-gray-800 z-50 shadow-lg"
            >
              {/* Header */}
              <div className="flex justify-between items-center p-4 border-b">
                <Link
                  href="/"
                  onClick={toggleSidebar}
                  className="text-lg text-center font-semibold logoFont"
                >
                  <Image
                    unoptimized
                    src="https://www.outletexpense.xyz/uploads/215-Rifat-Hasan/1762859683.png"
                    width={500}
                    height={500}
                    className="w-10 md:w-16"
                    alt="logo"
                  />
                </Link>
                <button onClick={toggleSidebar} aria-label="Close sidebar">
                  <IoCloseSharp
                    size={24}
                    className="text-gray-600 hover:text-red-500 transition"
                  />
                </button>
              </div>

              {/* Content with stagger */}
              <motion.div
                className="p-4 overflow-y-auto h-[calc(100vh-120px)]"
                variants={container}
                initial="hidden"
                animate="show"
              >




                <motion.ul className="space-y-2" variants={container}>
                  {data?.data?.map((itemData, idx) => {
                    const isOpen = openCategory === itemData?.category_id;
                    const currentSubs = subcategories[itemData?.category_id] || [];

                    return (
                      <motion.li key={idx} variants={item} className="border-b">
                        {/* Category row */}
                        <button
                          onClick={() => handleToggleCategory(itemData?.category_id)}
                          className="w-full flex items-center justify-between px-3 py-2 rounded-md hover:bg-gray-50 transition"
                        >
                          <span className="text-sm font-medium">
                            {itemData?.name || `Category ${idx + 1}`}
                          </span>
                          <span className="text-xs text-gray-500">
                            {isOpen ? "−" : "+"}
                          </span>
                        </button>

                        {/* Subcategories accordion */}
                        {isOpen && currentSubs.length > 0 && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            transition={{ duration: 0.3 }}
                            className="pl-5 flex flex-col"
                          >
                            {currentSubs.map((sub) => (
                              <Link
                                key={sub.id}
                                onClick={toggleSidebar}
                                href={`/subcategory/${sub.id}?subcategory=${encodeURIComponent(
                                  sub.name
                                )}&categoryId=${encodeURIComponent(itemData?.category_id)}`}
                                className="px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#373838] transition rounded"
                              >
                                {sub.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </motion.li>
                    );
                  })}
                </motion.ul>




                <hr className="my-5 border-t" />

                <motion.div className="space-y-4" variants={container}>
                  <motion.div variants={item}>
                    <Link
                      className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-50 transition"
                      href="/"
                    >
                      <Gift size={18} className="text-gray-600" />
                      <span className="text-sm font-medium">Latest Offer</span>
                    </Link>
                  </motion.div>

                  <motion.div variants={item}>
                    <Link
                      onClick={toggleSidebar}
                      className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-50 transition"
                      href="/"
                    >
                      <NotebookPen size={18} className="text-gray-600" />
                      <span className="text-sm font-medium">Blog</span>
                    </Link>
                  </motion.div>

                  <motion.div variants={item}>
                    <Link
                      onClick={toggleSidebar}
                      className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-50 transition"
                      href="/"
                    >
                      <FaUsers size={18} className="text-gray-600" />
                      <span className="text-sm font-medium">About Us</span>
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search sidebar - slides from top */}
        <div
          data-sidebar="search"
          className={`fixed inset-0 top-0 bg-white text-black z-50 transform transition-transform duration-500 ease-in-out shadow-lg ${isSearchSidebarOpen ? "translate-y-0" : "-translate-y-full"
            }`}
        >
          <div className="max-w-11/12 mx-auto p-6">
            <div className="grid grid-cols-3 justify-center items-center mb-6">

              <div></div>

              <div onClick={toggleSearchSidebar} className="w-24 mx-auto cursor-pointer">
                <Image className="w-24" src='https://www.outletexpense.xyz/uploads/215-Rifat-Hasan/1762859683.png' width={500} height={500} alt="logo"></Image>
              </div>

              <div className="flex items-end justify-end justify-items-end">
                <button onClick={toggleSearchSidebar} aria-label="Close search">
                  <IoCloseSharp size={25} className="text-gray-800 hover:text-red-600 transition" />
                </button>
              </div>
            </div>

            <div className="relative w-full mb-8 max-w-5xl mx-auto">
              <input
                type="text"
                id="search"
                value={keyword}
                onChange={handleChange}
                placeholder=" "
                className="peer w-full py-3 pt-4 pl-12 pr-4 text-base border rounded-full border-gray-300 bg-transparent text-black placeholder-transparent focus:outline-none focus:border-gray-600"
              />
              <label
                htmlFor="search"
                className={`absolute left-12 text-base text-gray-400 transition-all duration-200
    ${keyword ? "top-0 text-sm text-gray-600" : "top-4"}
  `}
              >
                Search for a product
              </label>

              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
            </div>

            <div className="max-h-[calc(100vh-200px)] overflow-y-auto md:w-9/12 mx-auto" data-search-results>
              {isSearching ? (
                <div className="text-center py-8">
                  <div className="w-10 h-10 mx-auto border-4 border-gray-600 border-r-transparent rounded-full animate-spin"></div>
                  <p className="mt-3 text-gray-500">Searching...</p>
                </div>
              ) : keyword && searchedItem?.length > 0 ? (
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {searchedItem.map((item, idx) => {
                    const sanitizeSlug = (str) =>
                      str
                        ?.toLowerCase()
                        .replace(/\s+/g, "-")
                        .replace(/[^a-z0-9-]/g, "")

                    return (
                      <div key={idx} onClick={toggleSearchSidebar}>

                        <ProductCard product={item} />
                      </div>
                    )
                  })}
                </div>
              ) : keyword ? (
                <div className="text-center py-8 text-gray-500">No products found matching &ldquo;{keyword}&rdquo;</div>
              ) : (
                <div className="text-center py-8 text-gray-400">Start typing to search for products</div>
              )}
            </div>
          </div>
        </div>

        <Navbar
          setIsLoginModal={setIsLoginModal}
          openCart={openCart}
          setOpenCart={setOpenCart}
          data={data}
          user={userInfo}
        />

        {/* Mobile search results */}
        {keyword && searchedItem?.length > 0 && !isSearchSidebarOpen && (
          <div className="lg:hidden">
            <Search
              searchedItem={searchedItem}
              setSearchText={setKeyword}
              setSearchedItem={setSearchedItem}
              searchBarRef={searchBarRef}
            />
          </div>
        )}

        {openCart && (
          <div className="fixed inset-0 bg-black bg-opacity-30 z-40">
            <CartItems />
          </div>
        )}

        {/* Overlay for sidebar */}
        {(isSidebarOpen || isSearchSidebarOpen) && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ease-in-out"
            onClick={() => {
              if (isSidebarOpen) toggleSidebar()
              if (isSearchSidebarOpen) toggleSearchSidebar()
            }}
          />
        )}

        {isLoginModal && (
          <Modal
            isOpen={isLoginModal}
            onClose={handleModalClose}
            title={isRegistered ? "Sign In" : "Sign Up"}
            content={
              isRegistered ? (
                <LoginForm
                  isLoginModal={isLoginModal}
                  onClose={handleModalClose}
                  setIsRegistered={setIsRegistered}
                  setReload={setReload}
                  isRegistered={isRegistered}
                  modal={true}
                />
              ) : (
                <RegisterForm
                  setIsRegistered={setIsRegistered}
                  isLoginModal={isLoginModal}
                  onClose={handleModalClose}
                  isRegistered={isRegistered}
                  setReload={setReload}
                  modal={true}
                />
              )
            }
          />
        )}
      </div>
    </div>
  )
}

export default HeaderUi
