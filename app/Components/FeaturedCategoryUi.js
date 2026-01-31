"use client"
import Image from "next/image"
import Link from "next/link"
const noImg = "/no-image.jpg"
import { use, useRef } from "react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6"

const FeaturedCategoryUi = ({ categories }) => {
  const categoriesData = use(categories)
  const sliderRef = useRef(null)

  const scroll = (direction) => {
    if (!sliderRef.current) return
    const { clientWidth, scrollLeft } = sliderRef.current
    const scrollAmount = clientWidth * 0.9 // scroll almost 1 screen
    sliderRef.current.scrollTo({
      left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
      behavior: "smooth",
    })
  }

  return (
    <div className="bg-white">
      <div className="w-11/12 mx-auto md:pb-16 mb-10 md:pt-14 relative ">
        {/* Custom Slider */}
        <div
          ref={sliderRef}
          className="flex gap-5 overflow-x-auto scroll-smooth no-scrollbar"
        >
          {categoriesData?.data?.map((category, index) => (
            <div key={index} className="min-w-[80%] sm:min-w-[45%] lg:min-w-[30%]">
              <Link
                href={`category/${encodeURIComponent(category?.category_id)}?category=${encodeURIComponent(
                  category?.name,
                )}&total=${encodeURIComponent(category?.product_count)}`}
                className="relative group overflow-hidden rounded-lg block"
              >
                {/* Image */}
                <div className="relative w-full h-52 md:h-[400px]">
                  <Image
                    unoptimized
                    src={category.image_url || noImg}
                    alt={category.name || "category"}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Vertical Text */}
                <div className="absolute top-1/2 -translate-y-1/2 right-0">
                  <span className="md:text-lg text-sm font-medium text-black bg-white writing-mode-vertical group-hover:opacity-80 transition md:py-5 py-3 md:px-1 px-0.5">
                    {category.name}
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Custom Navigation Buttons */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
        >
          <FaChevronLeft className="w-5 h-5 text-gray-700" />
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
        >
          <FaChevronRight className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* Custom CSS for vertical text + hide scrollbar */}
      <style jsx>{`
        .writing-mode-vertical {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          letter-spacing: 1px;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}

export default FeaturedCategoryUi
