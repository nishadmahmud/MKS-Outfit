"use client";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";
import { useEffect } from "react";
import useWishlist from "@/app/CustomHooks/useWishlist";
import useStore from "@/app/CustomHooks/useStore";
import { FaDeleteLeft } from "react-icons/fa6";
import { MdOutlineDelete } from "react-icons/md";

const WishlistPage = () => {
  const { handleCart, prices, country, setProductPrice } = useStore();
  const { wishlist, toggleWishlist } = useWishlist();

  useEffect(() => {
    wishlist.forEach((item) => {
      if (item?.id && item?.retails_price) {
        setProductPrice(
          item.id,
          item?.retails_price,
          item?.wholesale_price || null
        );
      }
    });
  }, [wishlist, setProductPrice]);

  const getPriceByCountry = (item) => {
    const productPrice = prices[item.id];
    if (country && country.value === "BD") {
      return productPrice?.basePrice || item?.retails_price || 0;
    } else {
      return productPrice?.intl_retails_price || item?.intl_retails_price || 0;
    }
  };


    const sanitizeSlug = (str) => {
    return str
      ?.toLowerCase()
      .split(" ")
      .slice(0, 2)
      .join(" ")
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  }

  return (
    <div className="p-5 h-screen pt-20 text-black w-11/12 mx-auto">
      <h2 className="text-2xl flex items-center gap-1 font-bold mb-4">
        <Heart /> My Wishlist
      </h2>
      {wishlist.length === 0 ? (
        <p>No items in wishlist.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {wishlist.map((item) => (
            <div key={item.id} className="bg-white border p-3 rounded-lg shadow-sm relative">
              <Link href={`/products/${sanitizeSlug(item?.brand_name || item?.name)}/${item?.id}`}>
                <Image
                  src={item.image || "/no-image.jpg"}
                  alt={item.name}
                  width={300}
                  height={200}
                  className="object-cover w-full h-40 rounded"
                  
                />
              </Link>
              <div className="mt-2">
                <h3 className="font-semibold text-sm line-clamp-1">{item.name}</h3>
                <p className="text-[#115e59] font-bold text-sm">
                  <span className="font-bangla">৳</span>
                  {item.discount
                    ? ((getPriceByCountry(item) - (getPriceByCountry(item) * item.discount) / 100).toFixed(0))
                    : getPriceByCountry(item)}
                </p>
              </div>

              <div className="absolute top-2 right-2 flex flex-row-reverse items-center gap-2">
                <button
                  onClick={(e) => {
             
              toggleWishlist(item);
            }}
                className="bg-white p-1 rounded-full"
                  aria-label="Add to cart"
                >
                  <MdOutlineDelete size={18} color="red"></MdOutlineDelete> 
                </button>
                <button
                  onClick={() => toggleWishlist(item)}
                  className=""
                  aria-label="Remove from wishlist"
                >
                  <Heart size={20} fill="white" color="teal" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
