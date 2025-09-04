"use client"

import Image from "next/image"
import noImg from "/public/no-image.jpg"
import Link from "next/link"
import { useEffect } from "react"
import { ShoppingCart } from "lucide-react"
import { FaHeart, FaRegHeart } from "react-icons/fa6"
import useWishlist from "../CustomHooks/useWishlist"
import useStore from "../CustomHooks/useStore"

const ProductCard = ({ product }) => {
  const { handleCart, handleBuy, prices, country, setProductPrice } = useStore()
  const { toggleWishlist, isInWishlist } = useWishlist()

  const selectedCountry = JSON.parse(localStorage.getItem("selectedCountry"))
  const countrySign = selectedCountry?.value === "BD" ? "৳" : "$"

  useEffect(() => {
    if (product?.id && product?.retails_price) {
      setProductPrice(product.id, product?.retails_price, product?.intl_retails_price || null)
    }
  }, [product.id, product.retails_price, product.intl_retails_price])

  const productPrice = prices[product.id]

  const getPriceByCountry = () => {
    if (country && country.value === "BD") {
      return productPrice?.basePrice || product?.retails_price || 0
    } else {
      return productPrice?.intl_retails_price  || product?.intl_retails_price || 0
    }
  }

  const discountedPrice = country?.value === "BD"?
    product?.discount
    ? product?.discount_type === "Percentage"
      ? (product.retails_price - (product.retails_price * product.discount) / 100).toFixed(0)
      : (product.retails_price - product.discount).toFixed(0)
    : null
  :  product?.intl_discount
    ? product?.discount_type === "Percentage"
      ? (product.intl_retails_price - (product.intl_retails_price * product.intl_discount) / 100).toFixed(0)
      : (product.intl_retails_price - product.intl_discount).toFixed(0)
    : null
  const discountSuffix = product?.discount_type === "Percentage" ? "%" : product?.discount_type === "Fixed" ? "Tk" : ""

  const updateRecentViews = () => {
    if (!product?.id) return

    let recentViews = JSON.parse(localStorage.getItem("recentlyViewed") || "[]")
    recentViews = recentViews.filter((p) => p.id !== product.id)
    recentViews.unshift({
      id: product.id,
      name: product.name,
      image: product.image_path || product.images?.[0] || noImg.src,
      price: product.retails_price,
      discount: product.discount || 0,
    })

    if (recentViews.length > 6) recentViews.pop()
    localStorage.setItem("recentlyViewed", JSON.stringify(recentViews))
  }

  const sanitizeSlug = (str) => {
    return str
      ?.toLowerCase()
      .split(" ")
      .slice(0, 2)
      .join(" ")
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
  }

  

  return (
    <div
      className="
      group bg-white rounded-lg overflow-hidden
      transition-all duration-300 mx-auto w-full max-w-sm
      flex flex-col h-full
      sm:max-w-xs md:max-w-sm lg:max-w-xs xl:max-w-sm
    "
    >
      {/* Image Container */}
      <div
        className="
        relative aspect-square w-full overflow-hidden bg-gray-50
        sm:aspect-[4/5] md:aspect-square lg:aspect-[4/5]
      "
      >
        <Link
          href={`/products/${sanitizeSlug(product?.brand_name || product?.name)}/${product?.id}`}
          onClick={updateRecentViews}
          className="block w-full h-full"
        >
          <Image
            src={product?.image_path || noImg}
            alt={product?.name || "Product image"}
            fill
            className="object-cover transition-all duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          {/* Hover Image */}
          {product?.image_path1 && (
            <Image
              src={product.image_path1 || "/placeholder.svg"}
              alt={`${product?.name} alternate view`}
              fill
              className="
                object-cover absolute inset-0 opacity-0 
                group-hover:opacity-100 transition-opacity duration-500
                hidden sm:block
              "
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          )}
        </Link>

        {/* Discount Badge */}
      {
        !countrySign ? <>
          {product?.discount && (
          <div className="absolute top-2 left-2 z-10 sm:top-3 sm:left-3">
            <span
              className="
              bg-red-500 text-white text-xs font-bold 
              py-1 px-2 rounded-full shadow-lg
              sm:py-1.5 sm:px-2.5
            "
            >
              -{product.discount}
              {discountSuffix}
            </span>
          </div>
        )}
        </> : ""
      }


       
      </div>

      {/* Product Info */}
      <div className="py-3 space-y-2 flex-1 flex flex-col  sm:space-y-3">
        {/* Brand Name */}
        {product?.brand_name && (
          <h5
            className="
            text-xs text-start font-medium text-gray-800 uppercase tracking-wide 
            truncate sm:text-xs
          "
          >
            {product.brand_name}
          </h5>
        )}

        {/* Product Name */}
        <Link
          href={`/products/${sanitizeSlug(product?.brand_name || product?.name)}/${product?.id}`}
          onClick={updateRecentViews}
          className="flex-1 xl:w-56 w-40"
        >
          <h3
            className="
            font-medium xl:w-56 w-40 text-gray-900 hover:text-gray-600
            transition-colors duration-200 
            text-sm leading-tight truncate line-clamp-1
            sm:text-base sm:max-w-xs md:max-w-sm lg:max-w-xs xl:max-w-sm sm:line-clamp-2
            md:text-sm lg:text-base text-start
          "
          >
            {product?.name || "N/A"}
          </h3>
        </Link>

        {/* Price and Cart Section */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex flex-col justify-between gap-1">
            {discountedPrice ? (
              <div className="flex items-start gap-2 flex-wrap">
                <span
                  className="
                  text-base font-bold text-gray-900
                  sm:text-lg md:text-base lg:text-lg
                "
                >
                  {countrySign}
                  {discountedPrice}
                </span>
                <p
                  className="
                  text-xs text-gray-500 
                  sm:text-sm md:text-xs text-start lg:text-sm
                "
                >
                  {countrySign}
                  {getPriceByCountry()}
                </p>
              </div>
            ) : (
              <span
                className="
                text-base font-bold text-gray-900
                sm:text-lg md:text-base lg:text-lg
              "
              >
                {countrySign}
                {getPriceByCountry()}
              </span>
            )}
          </div>


          
        {/* Wishlist Button */}
        <button
          className="
            flex p-1.5 rounded-full hover:bg-gray-100 
              text-gray-600 hover:text-gray-900 transition-all duration-200
              sm:p-2
          "
          onClick={(e) => {
            e.stopPropagation()
            toggleWishlist(product)
          }}
          title={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
        >
          {isInWishlist(product.id) ? (
            <FaHeart className="w-4 h-4 text-teal-600 sm:w-5 sm:h-5" />
          ) : (
            <FaRegHeart className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors sm:w-5 sm:h-5" />
          )}
        </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
