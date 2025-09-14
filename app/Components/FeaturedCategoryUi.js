"use client"
import Image from "next/image"
import Link from "next/link"
import noImg from "/public/no-image.jpg"
import { use } from "react"

const FeaturedCategoryUi = ({ categories }) => {
  const categoriesData = use(categories)
  console.log(categoriesData);
  return (
    <div className="bg-white">
      <div className="w-11/12 mx-auto md:pb-16 mb-10 md:pt-14">
       

        {/* Categories Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoriesData?.data?.map((category, index) => (
            <Link
              key={index}
              href={`category/${encodeURIComponent(category?.category_id)}?category=${encodeURIComponent(
                category?.name,
              )}&total=${encodeURIComponent(category?.product_count)}`}
              className="relative group overflow-hidden rounded-lg"
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
          ))}
        </div>
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
