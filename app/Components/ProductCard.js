"use client"

import Image from "next/image"
const noImg = "/no-image.jpg"
import Link from "next/link"
import { useEffect } from "react"
import { FaHeart, FaRegHeart, FaCartPlus, FaBagShopping } from "react-icons/fa6"
import useWishlist from "../CustomHooks/useWishlist"
import useStore from "../CustomHooks/useStore"

const ProductCard = ({ product }) => {
  const { handleCart, handleBuy, prices, setProductPrice } = useStore()
  const { toggleWishlist, isInWishlist } = useWishlist()

  useEffect(() => {
    if (product?.id && product?.retails_price) {
      setProductPrice(product.id, product?.retails_price, product?.intl_retails_price || null)
    }
  }, [product.id, product.retails_price, product.intl_retails_price, setProductPrice])

  // const productPrice = prices[product.id] // Not currently used directly for display logic needing country switch, keeping simple for now

  const discountedPrice = product?.discount
    ? product?.discount_type === "Percentage"
      ? (product.retails_price - (product.retails_price * product.discount) / 100).toFixed(0)
      : (product.retails_price - product.discount).toFixed(0)
    : product?.retails_price;

  const discountSuffix = product?.discount_type === "Percentage" ? "%" : product?.discount_type === "Fixed" ? "Tk" : ""

  const updateRecentViews = () => {
    try {
      if (!product?.id) return

      let recentViews = JSON.parse(localStorage.getItem("recentlyViewed") || "[]")
      recentViews = recentViews.filter((p) => p.id !== product.id)
      recentViews.unshift({
        id: product.id,
        name: product.name,
        image: product.image_path || product.images?.[0] || noImg,
        price: product.retails_price,
        discount: product.discount || 0,
      })

      if (recentViews.length > 6) recentViews.pop()
      localStorage.setItem("recentlyViewed", JSON.stringify(recentViews))
    } catch (error) {
      console.error("Error updating recent views:", error)
    }
  }

  const sanitizeSlug = (str) => {
    if (!str) return "item";
    const slug = str
      .toLowerCase()
      .split(" ")
      .slice(0, 2)
      .join(" ")
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")

    return slug || "item"
  }

  return (
    <div
      className="
      group bg-white overflow-hidden
      transition-all duration-300 mx-auto w-full max-w-sm
      flex flex-col h-full rounded-md
    "
    >
      {/* Image Container */}
      <div
        className="
        relative aspect-[4/5] w-full overflow-hidden bg-gray-50 rounded-md
      "
      >
        <Link
          href={`/products/${sanitizeSlug(product?.brand_name || product?.name)}/${product?.id}`}
          onClick={updateRecentViews}
          className="block w-full h-full"
        >
          <Image
            unoptimized
            src={product?.image_path || noImg}
            alt={product?.name || "Product image"}
            fill
            className="object-cover transition-all duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          {/* Hover Image */}
          {product?.image_path1 && (
            <Image
              unoptimized
              src={product.image_path1 || noImg}
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
        {product?.discount && (
          <div className="absolute top-2 left-2 z-20">
            <span className="bg-red-600 text-white text-[10px] font-bold py-0.5 px-2 rounded-sm shadow-sm">
              -{product.discount}{discountSuffix}
            </span>
          </div>
        )}

        {/* Wishlist Button - Image Top Right (Show on Hover) */}
        <button
          className="
            absolute top-2 right-2 z-30
            p-1.5 rounded-full bg-white/80 backdrop-blur-sm
            text-gray-600 hover:text-red-500 hover:bg-white transition-all duration-200
            shadow-sm opacity-0 group-hover:opacity-100 focus:opacity-100
          "
          onClick={(e) => {
            e.stopPropagation()
            toggleWishlist(product)
          }}
          title={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
        >
          {isInWishlist(product.id) ? (
            <FaHeart className="w-3.5 h-3.5 text-red-500" />
          ) : (
            <FaRegHeart className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      {/* Product Info - Compacted */}
      {/* Product Info - Clean Layout */}
      <div className="pt-3 pb-2 flex-1 flex flex-col px-1">

        {/* Product Name */}
        <Link
          href={`/products/${sanitizeSlug(product?.brand_name || product?.name)}/${product?.id}`}
          onClick={updateRecentViews}
          className="w-full mb-1"
        >
          <h3
            className="
            font-bold text-gray-900 hover:text-gray-700 text-start
            transition-colors duration-200 
            text-sm sm:text-base leading-tight line-clamp-1
          "
          >
            {product?.name || "N/A"}
          </h3>
        </Link>

        {/* Price and Actions Section */}
        <div className="flex items-center justify-between mt-1">
          {/* Price */}
          <div className="flex items-center gap-2">
            {product?.discount ? (
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-x-1.5">
                <span className="text-base sm:text-lg font-bold text-gray-900">
                  ৳{discountedPrice}
                </span>
                <span className="text-xs text-gray-500 line-through">
                  ৳{product.retails_price}
                </span>
              </div>
            ) : (
              <span className="text-base sm:text-lg font-bold text-gray-900">
                ৳{product?.retails_price || 0}
              </span>
            )}
          </div>

          {/* Actions (Always Visible) */}
          <div className="flex items-center gap-5">
            {/* Add to Cart */}
            <button
              className="text-gray-700 hover:text-black transition-colors duration-200"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleCart(product);
              }}
              title="Add to Cart"
            >
              <FaCartPlus className="w-5 h-5" />
            </button>

            {/* Buy Now */}
            <button
              className="text-gray-700 hover:text-[#033D7D] transition-colors duration-200"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleBuy(product);
              }}
              title="Buy Now"
            >
              <FaBagShopping className="w-5 h-5" />
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ProductCard
