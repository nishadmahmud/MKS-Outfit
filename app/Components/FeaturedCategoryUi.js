"use client"
import Image from "next/image"
import Link from "next/link"
import noImg from "/public/no-image.jpg"
import { use } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import { useRef } from "react"
import "swiper/css"
import "swiper/css/navigation"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6"

const FeaturedCategoryUi = ({ categories }) => {
  const categoriesData = use(categories)
  const prevRef = useRef(null)
  const nextRef = useRef(null)

  return (
    <div className="bg-white">
      <div className="w-11/12 mx-auto md:pb-16 mb-10 md:pt-14 relative group">
        {/* Swiper Slider */}
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={3}
          breakpoints={{
            0: { slidesPerView: 1.2, spaceBetween: 12 },
            640: { slidesPerView: 2, spaceBetween: 16 },
            1024: { slidesPerView: 3, spaceBetween: 20 },
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current
            swiper.params.navigation.nextEl = nextRef.current
            swiper.navigation.init()
            swiper.navigation.update()
          }}
        >
          {categoriesData?.data?.map((category, index) => (
            <SwiperSlide key={index}>
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
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <button
          ref={prevRef}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
        >
          <FaChevronLeft className="w-5 h-5 text-gray-700" />
        </button>
        <button
          ref={nextRef}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
        >
          <FaChevronRight className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* Custom CSS for vertical text */}
      <style jsx>{`
        .writing-mode-vertical {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          letter-spacing: 1px;
        }
      `}</style>
    </div>
  )
}

export default FeaturedCategoryUi
