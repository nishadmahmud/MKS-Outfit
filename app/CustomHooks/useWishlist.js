import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useStore from "./useStore";

const useWishlist = () => {

  const { setWishlist, wishlist } = useStore();
  
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlist(stored);
  }, []);

  
  const isInWishlist = (id) => wishlist.some(item => item.id === id);
  const toggleWishlist = (product) => {
    const stored = JSON.parse(localStorage.getItem("wishlist") || "[]");
    let updated;

    if (stored.some(item => item.id === product.id)) {
      updated = stored.filter(item => item.id !== product.id);
      toast.error("Removed from wishlist");
    } else {
      updated = [...stored, {
        id: product.id,
        name: product.name,
        image: product.image_path || (product.images?.[0] || ""),
        price: product.retails_price,
        discount: product.discount || 0,
        brand_name: product.brand_name || ""
      }];
      toast.success("Added to wishlist");
    }

    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  return { wishlist, toggleWishlist, isInWishlist };
};

export default useWishlist;
