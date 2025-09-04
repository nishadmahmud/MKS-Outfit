"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { FaUsers } from "react-icons/fa6"
import Image from "next/image"
import Link from "next/link"
import { Gift, Heart, NotebookPen, ShoppingBag, ShoppingBagIcon, User } from "lucide-react"
import { IoCloseSharp, IoSearch } from "react-icons/io5"
import axios from "axios"
import noImg from "/public/no-image.jpg"
import Search from "./Search"
import useStore from "../CustomHooks/useStore"
import CartItems from "./CartItems"
import { useSearchParams } from "next/navigation"
import RegisterForm from "./RegisterForm"
import LoginForm from "./LoginForm"
import Modal from "./Modal"
import Navbar from "./Navbar"
import { userId } from "../(home)/page"

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
    country,
    wishlist,
    prices,
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

  const selectedCountry = JSON.parse(localStorage.getItem("selectedCountry"))

  const countrySign = selectedCountry?.value === "BD" ? "৳" : "$"

  // utils/pricing.js (or right above your component)
  const getPriceByCountry = (item, prices, country) => {
    const productPrice = prices?.[item?.id]

    if (country?.value === "BD") {
      // Base → retail → 0
      return productPrice?.basePrice ?? item?.retails_price ?? 0
    }

    // Wholesale → item wholesale → 1 000 (fallback)
    return productPrice?.wholesalePrice ?? item?.wholesale_price ?? 1_000
  }

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
                  className={`block w-5 h-0.5 bg-black transition-all duration-300 ${
                    isSidebarOpen ? "rotate-45 translate-y-1" : ""
                  }`}
                ></span>
                <span
                  className={`block w-5 h-0.5 bg-black my-1 transition-all duration-300 ${
                    isSidebarOpen ? "opacity-0" : ""
                  }`}
                ></span>
                <span
                  className={`block w-5 h-0.5 bg-black transition-all duration-300 ${
                    isSidebarOpen ? "-rotate-45 -translate-y-1" : ""
                  }`}
                ></span>
              </div>
            </button>

            <div className="hidden lg:block">
              <Link href={"/"}>
                <Image src='/mks-logo.png' width={500} height={500} className="w-10 md:w-16" alt="logo"></Image>
              </Link>
            </div>
          </div>

          <div className="lg:hidden absolute left-1/2 transform -translate-x-1/2 flex justify-center">
            <Link href={"/"}>
               <Image src='/mks-logo.png' width={500} height={500} className="w-10 md:w-20" alt="logo"></Image>
            </Link>
          </div>

          <div className="hidden lg:flex items-center justify-center flex-1 mx-8">
            <nav className="flex items-center space-x-8">
              {data?.data?.slice(0, 5).map((item, idx) => (
                <Link
                  key={idx}
                  href={`/category/${encodeURIComponent(item?.category_id || "")}?category=${encodeURIComponent(
                    item?.name || "",
                  )}&total=${encodeURIComponent(item?.product_count || 0)}`}
                  className="text-sm font-medium text-gray-700 hover:text-teal-600 transition-colors duration-200 whitespace-nowrap"
                >
                  {item?.name || `Category ${idx + 1}`}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right side icons */}
          <div className="flex items-center justify-end gap-2 md:gap-6">
            {/* Search icon */}
            <button
              onClick={toggleSearchSidebar}
              className="flex items-center transition ease-in-out text-black"
              aria-label="Search"
              data-sidebar-trigger="search"
            >
              <IoSearch size={23} />
            </button>

            <Link href="/wishlist" className="hidden md:flex flex-col items-center text-sm text-[#000000]">
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
            </Link>

            {/* Cart icon */}
            <Link href="/cart" className="flex items-center cursor-pointer" aria-label="Cart">
              <div className="relative">
                <ShoppingBag size={22} className="text-black" />
                {total > 0 && (
                  <span className="absolute -top-1 -right-0 bg-black text-white text-[8px] rounded-full w-3 h-3 flex items-center justify-center">
                    {total}
                  </span>
                )}
              </div>
            </Link>

            {/* User account */}
            {!user ? (
              <Link href="/login" className="hidden lg:flex items-center cursor-pointer" aria-label="Login">
                <User size={22} className="text-black" />
              </Link>
            ) : (
              <Link href="/profileDashboard" className="hidden lg:flex items-center cursor-pointer">
                <div className="w-6 h-6 rounded-full overflow-hidden">
                  <Image src="/userLogin.png" alt="User" width={32} height={32} />
                </div>
              </Link>
            )}

          </div>
        </div>

        {/* Mobile sidebar */}
        <div
          data-sidebar="mobile"
          className={`fixed top-0 left-0 w-4/5 max-w-xs h-full bg-white text-gray-800 z-50 transform transition-transform duration-300 ease-in-out shadow-lg ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b">
            <Link href="/" onClick={toggleSidebar} className="text-lg text-center font-semibold logoFont">
              Morshed Mart
            </Link>
            <button onClick={toggleSidebar} aria-label="Close sidebar">
              <IoCloseSharp size={24} className="text-gray-600 hover:text-red-500 transition" />
            </button>
          </div>

          {/* Categories */}
          <div className="p-4 overflow-y-auto h-[calc(100vh-120px)]">
            <Link className="flex items-center gap-1 mb-3" href="/">
              <ShoppingBagIcon color="gray" size={18}></ShoppingBagIcon>
              Shop Now
            </Link>
            <h3 className="text-sm font-semibold text-teal-700 mb-3">Categories</h3>

            <ul className="space-y-2">
              {data?.data?.map((item, idx) => (
                <li key={idx}>
                  <Link
                    onClick={toggleSidebar}
                    href={`/category/${encodeURIComponent(item?.category_id || "")}?category=${encodeURIComponent(
                      item?.name || "",
                    )}&total=${encodeURIComponent(item?.product_count || 0)}`}
                    className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-teal-50 transition"
                  >
                    <span className="text-sm font-medium">{item?.name || `Category ${idx + 1}`}</span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Divider */}
            <hr className="my-5 border-t" />

            {/* Navigation */}
            <div className="space-y-4">
              <Link
                onClick={toggleSidebar}
                className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-teal-50 transition"
                href="/offer"
              >
                <Gift size={18} className="text-teal-600" />
                <span className="text-sm font-medium">Latest Offer</span>
              </Link>
              <Link
                onClick={toggleSidebar}
                className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-teal-50 transition"
                href="/blogs"
              >
                <NotebookPen size={18} className="text-teal-600" />
                <span className="text-sm font-medium">Blog</span>
              </Link>
              <Link
                onClick={toggleSidebar}
                className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-teal-50 transition"
                href="/"
              >
                <FaUsers size={18} className="text-teal-600" />
                <span className="text-sm font-medium">About Us</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Search sidebar - slides from top */}
        <div
          data-sidebar="search"
          className={`fixed inset-0 top-0 bg-white text-black z-50 transform transition-transform duration-500 ease-in-out shadow-lg ${
            isSearchSidebarOpen ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="max-w-4xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-teal-700">🔍 Search Products</h2>
              <button onClick={toggleSearchSidebar} aria-label="Close search">
                <IoCloseSharp size={28} className="text-teal-800 hover:text-red-600 transition" />
              </button>
            </div>

            <div className="relative w-full mb-8">
              <input
                type="text"
                id="search"
                value={keyword}
                onChange={handleChange}
                placeholder=" "
                className="peer w-full py-3 pt-4 pl-12 pr-4 text-base border-b border-gray-500 bg-transparent text-black placeholder-transparent focus:outline-none focus:border-teal-600"
              />
              <label
                htmlFor="search"
                className={`absolute left-12 text-base text-gray-400 transition-all duration-200
    ${keyword ? "top-0 text-sm text-teal-600" : "top-4"}
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

            <div className="max-h-[calc(100vh-200px)] overflow-y-auto" data-search-results>
              {isSearching ? (
                <div className="text-center py-8">
                  <div className="w-10 h-10 mx-auto border-4 border-teal-600 border-r-transparent rounded-full animate-spin"></div>
                  <p className="mt-3 text-gray-500">Searching...</p>
                </div>
              ) : keyword && searchedItem?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchedItem.map((item, idx) => {
                    const sanitizeSlug = (str) =>
                      str
                        ?.toLowerCase()
                        .replace(/\s+/g, "-")
                        .replace(/[^a-z0-9-]/g, "")

                    return (
                      <Link
                        href={`/products/${sanitizeSlug(item?.brand_name || item?.name)}/${item?.id}`}
                        key={idx}
                        onClick={() => {
                          setKeyword("")
                          setSearchedItem([])
                          toggleSearchSidebar()

                          let recentViews = JSON.parse(localStorage.getItem("recentlyViewed") || "[]")
                          recentViews = recentViews.filter((p) => p.id !== item.id)
                          recentViews.unshift({
                            id: item.id,
                            name: item.name,
                            image: item.image_path || (item.images && item.images[0]) || noImg.src,
                            price: item.retails_price,
                            discount: item.discount || 0,
                          })
                          if (recentViews.length > 6) recentViews.pop()
                          localStorage.setItem("recentlyViewed", JSON.stringify(recentViews))
                        }}
                        className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition"
                      >
                        <div className="w-16 h-16 rounded-md overflow-hidden bg-gray-100">
                          <Image
                            src={
                              item.image_path || item.images?.[0] || noImg || "/placeholder.svg" || "/placeholder.svg"
                            }
                            alt={item.name}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 text-sm line-clamp-2">{item.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            {item?.data?.discount > 0 && (
                              <span className="text-gray-500 line-through text-sm">
                                {countrySign}
                                {getPriceByCountry(item, prices, country).toLocaleString("en-US")}
                              </span>
                            )}
                            <p className="text-teal-700 font-semibold">
                              {countrySign}
                              {getPriceByCountry(item, prices, country).toLocaleString("en-US")}
                            </p>
                            {!countrySign ? (
                              <>
                                {item.discount > 0 && (
                                  <p className="text-xs text-gray-500 line-through">
                                    {(item.retails_price - (item.retails_price * (item.discount || 0)) / 100).toFixed(
                                      2,
                                    )}
                                  </p>
                                )}
                              </>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </Link>
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
                  modal={true} // ✅ Added for consistency
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
