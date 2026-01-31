
"use client"

import Image from "next/image"
import Link from "next/link"
import ProductCardShowcase from "./ProductCardShowcase"
import { FaArrowRight } from "react-icons/fa6"
import noImg from "/public/no-image.jpg"

// Dummy Product Data for fallback - More accurate South Asian Context
const dummyProducts = [
    {
        id: 101,
        name: "Premium Cotton Panjabi",
        retails_price: 2500,
        discount: 0,
        discount_type: "Percentage",
        image_path: "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?auto=format&fit=crop&q=80&w=500&h=500",
        brand_name: "MKS"
    },
    {
        id: 102,
        name: "Embroidered Salwar Kameez",
        retails_price: 3500,
        discount: 10,
        discount_type: "Percentage",
        image_path: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&q=80&w=500&h=500",
        brand_name: "MKS"
    },
    {
        id: 103,
        name: "Elegant Silk Sharee",
        retails_price: 5500,
        discount: 0,
        discount_type: "Percentage",
        image_path: "https://images.unsplash.com/photo-1610189012906-47833870f074?auto=format&fit=crop&q=80&w=500&h=500",
        brand_name: "MKS"
    },
    {
        id: 104,
        name: "Classic Beige Kurti",
        retails_price: 1800,
        discount: 5,
        discount_type: "Percentage",
        image_path: "https://images.unsplash.com/photo-1589810635657-232948472d98?auto=format&fit=crop&q=80&w=500&h=500",
        brand_name: "MKS"
    },
    {
        id: 105,
        name: "Printed Lawn Suit",
        retails_price: 2200,
        discount: 0,
        discount_type: "Percentage",
        image_path: "https://images.unsplash.com/photo-1564859228273-274232fdb516?auto=format&fit=crop&q=80&w=500&h=500",
        brand_name: "MKS"
    },
    {
        id: 106,
        name: "Designer Georgette Gown",
        retails_price: 4500,
        discount: 15,
        discount_type: "Percentage",
        image_path: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=500&h=500",
        brand_name: "MKS"
    },
    {
        id: 107,
        name: "Casual Black Tunic",
        retails_price: 1200,
        discount: 0,
        discount_type: "Percentage",
        image_path: "https://images.unsplash.com/photo-1503342217505-b0815a0de1ca?auto=format&fit=crop&q=80&w=500&h=500",
        brand_name: "MKS"
    },
    {
        id: 108,
        name: "Festive wear collection",
        retails_price: 6000,
        discount: 0,
        discount_type: "Percentage",
        image_path: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=500&h=500",
        brand_name: "MKS"
    }
]

const CategoryShowcase = ({
    title = "Category Name",
    bannerImage = "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format&fit=crop", // Placeholder vertical
    products = dummyProducts,
    categoryLink = "/products"
}) => {

    // Ensure we have exactly 8 items or fill with dummy if empty
    const displayProducts = products && products.length > 0 ? products.slice(0, 8) : dummyProducts;

    return (
        <div className="w-11/12 mx-auto my-16">
            {/* Mobile Header */}
            <div className="flex justify-between items-end mb-6 lg:hidden">
                <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-wide border-b-2 border-black pb-1">
                    {title}
                </h2>
                <Link href={categoryLink} className="text-sm font-medium text-gray-600 hover:text-black flex items-center gap-1">
                    View All <FaArrowRight />
                </Link>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">

                {/* Left Banner - Spans 2 columns on large screens to be square-ish match with 2 rows of products */}
                <div className="col-span-1 hidden lg:block relative w-full h-full rounded-lg overflow-hidden group cursor-pointer lg:col-span-2">
                    <Link href={categoryLink} className="block w-full h-full relative">
                        <Image
                            unoptimized
                            src={bannerImage}
                            alt={title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* Overlay Text */}
                        <div className="absolute bottom-4 left-0 w-full text-center z-10">
                            <h3 className="text-3xl font-bold text-white uppercase drop-shadow-md mb-4">{title}</h3>
                            <span className="inline-block bg-white text-black px-6 py-2 font-semibold uppercase text-sm tracking-wider hover:bg-black hover:text-white transition-colors duration-300">
                                View More
                            </span>
                        </div>
                        {/* Dark Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
                    </Link>
                </div>

                {/* Right Product Grid - Spans 4 columns */}
                <div className="col-span-1 lg:col-span-4 flex flex-col justify-between">
                    {/* Desktop Header aligned with grid */}
                    <div className="hidden lg:flex justify-between items-end mb-4">
                        <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-wide">
                            {title}
                        </h2>
                        <Link href={categoryLink} className="text-xs font-bold text-gray-900 border-b border-gray-900 hover:text-gray-600 hover:border-gray-600 transition-colors">
                            VIEW ALL PRODUCTS
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 h-full">
                        {displayProducts.map((product, index) => (
                            <ProductCardShowcase key={index} product={product} />
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CategoryShowcase

