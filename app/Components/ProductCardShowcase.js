"use client"

import Image from "next/image"
import Link from "next/link"
const noImg = "/no-image.jpg"

const ProductCardShowcase = ({ product }) => {
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

    const discountedPrice = product?.discount
        ? product?.discount_type === "Percentage"
            ? (product.retails_price - (product.retails_price * product.discount) / 100).toFixed(0)
            : (product.retails_price - product.discount).toFixed(0)
        : product?.retails_price

    return (
        <Link
            href={`/products/${sanitizeSlug(product?.brand_name || product?.name)}/${product?.id}`}
            className="group relative block w-full aspect-square overflow-hidden rounded-md bg-gray-100"
        >
            <Image
                unoptimized
                src={product?.image_path || noImg}
                alt={product?.name || "Product image"}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
            />

            {/* Floating Price Pill */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-max max-w-[90%] z-10">
                <div className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg flex items-center gap-2 border border-gray-100">
                    {product?.discount ? (
                        <>
                            <span className="text-sm font-bold text-gray-900">
                                ৳{discountedPrice}
                            </span>
                            <span className="text-[10px] text-gray-500 line-through">
                                ৳{product.retails_price}
                            </span>
                        </>
                    ) : (
                        <span className="text-sm font-bold text-gray-900">
                            ৳{product?.retails_price || 0}
                        </span>
                    )}
                </div>
            </div>

            {/* Overlay on hover (optional, adds depth) */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 pointer-events-none"></div>
        </Link>
    )
}

export default ProductCardShowcase
