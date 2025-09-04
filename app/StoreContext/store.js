"use client";
import React, { createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import useSWR from "swr";
import { fetcher, userId } from "../(home)/page";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import auth from "@/firebase/config";

const countries = [
  { label: "United States", value: "USD", symbol: "$" },
  { label: "United Kingdom", value: "GBP", symbol: "£" },
  { label: "India", value: "INR", symbol: "₹" },
  { label: "Europe", value: "EUR", symbol: "€" },
  { label: "Bangladesh", value: "BDT", symbol: "৳" },
  { label: "Japan", value: "JPY", symbol: "¥" },
  { label: "Canada", value: "CAD", symbol: "C$" },
  { label: "Australia", value: "AUD", symbol: "A$" },
];



export const storeContext = createContext(null);
const StoreProvider = ({ children }) => {
  const [refetch, setRefetch] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isLoginModal, setIsLoginModal] = useState(false);
  const [token, setToken] = useState(null);
  const [hasToken, setHasToken] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isOpenPromoBanner, setIsOpenPromoBanner] = useState(false);
  const [isSelectRegion, setIsSelectRegion] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("Bangladesh");
  const [convertedPrice, setConvertedPrice] = useState(null);
  const [basePrice,setBasePrice] = useState(0);
  const [wholesalePrice,setWholesalePrice] = useState(0);
  const googleProvider = new GoogleAuthProvider();
  const [userInfo,setUserInfo] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [prices, setPrices] = useState({});
  const [country, setCountry] = useState("BD");
  const [wishlist, setWishlist] = useState([]);
  const [selectedSizeCart, setSelectedSizeCart] = useState("")
console.log(selectedSizeCart);

  const [isInCart, setIsInCart] = useState(false)
  const [selectedId, setSelectedId] = useState(null)
  // console.log(selectedId)

  // Setter to update price for a specific product
  const setProductPrice = (productId, basePrice, wholesalePrice) => {
    setPrices((prev) => ({
      ...prev,
      [productId]: {
        basePrice,
        wholesalePrice,
      },
    }));
  };

  


  useEffect(() => {
    setIsMounted(true);
  // const bangladesh = JSON.parse(localStorage.getItem("selectedCountry"))

  }, []);

  const router = useRouter();


// console.log(bangladesh);
  const getPriceByCountry = (basePrice, wholesalePrice) => {
  return selectedCountry.valueOf === "BD" ? basePrice : wholesalePrice;
};



  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setLoading(false);
      setToken(storedToken);
      setHasToken(true);
    } else {
      setToken(null);
      // setLoading(false);
    }
  }, []);

  useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if(user){
            setUserInfo(user);
        }
    },[])

 

  //   const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  //   const existingProduct = cartItems.find((product) => product.id === item.id);

  //   // Check stock
  //   const isInStock =
  //     (newItem.status && newItem.status.toLowerCase() !== "stock out") ||
  //     newItem.current_stock > 0;
  //   if (!isInStock) {
  //     toast.error("Out of stock!");
  //     return;
  //   }

  //   // Prevent duplicates
  //   if (existingProduct) {
  //     toast.error("Item already in cart");
  //     return;
  //   }

  //   const itemWithQty = { ...newItem, quantity };
  //   cartItems.push(itemWithQty);
  //   localStorage.setItem("cart", JSON.stringify(cartItems));
  //   toast.success("Item added to cart successfully");
  // };


 const handleCart = (item, quantity, variant_id) => {
   if (!selectedSizeCart) {
     toast.error("Please select a size first");
     return; 
   }
  if (!isMounted) return;


  setRefetch(true);

  const newItem = {
    ...item,
    retails_price: item.price ?? item.retails_price,
    currency_retail_price: convertedPrice,
    selectedSize: selectedSizeCart,
    selectedSizeId: selectedId, // make sure we have this for comparison
    product_variant_id: selectedId,
    variant_id,
    cartItemId: `${item.id}_${selectedId}`,
    quantity,
  };

  const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

  // Check if the exact product with selected size already exists
  const existingItemIndex = existingCart.findIndex(
    (cartItem) =>
      cartItem.id === item.id && cartItem.selectedSizeId === selectedId
  );

  // Check stock
  const isInStock =
    (newItem.status && newItem.status.toLowerCase() !== "stock out") ||
    newItem.current_stock > 0;

  if (!isInStock) {
    toast.error("Out of stock!");
    return;
  }

  // If item exists, show error
  if (existingItemIndex > -1) {
    toast.error("This product with the selected size is already in your cart!");
    return;
  }

  // Add new item to cart
  existingCart.push(newItem);
  localStorage.setItem("cart", JSON.stringify(existingCart));
  setCartItems(existingCart);
  setIsInCart(true);

  toast.success("Item added to cart successfully");
};


  const getCartItems = () => {
    if (!isMounted) return [];
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    return cartItems;
  };

  const handleCartUpdate = () => {
    setRefetch(true);
    const updatedItems = getCartItems();
    setCartItems(updatedItems);
  };

 const handleIncQuantity = (id, qty, selectedSize) => {
  const items = getCartItems();

  const updatedItems = items.map((item) => {
    if (item.id === id && item.selectedSize === selectedSize) {
      // Find the matching variant inside product_variants array
      const matchedVariant = item.product_variants?.find(
        (variant) => variant.name === selectedSize
      );

      // If stock limit reached, show toast and return original item
      if (matchedVariant && qty + 1 > matchedVariant.quantity) {
        toast.error(`Only ${matchedVariant.quantity} items in stock`);
        return item;
      }

      // Otherwise, increment quantity
      return { ...item, quantity: qty + 1 };
    }

    return item;
  });

  localStorage.setItem("cart", JSON.stringify(updatedItems));
  handleCartUpdate();
};


const handleDncQuantity = (id, qty, selectedSize) => {
  const items = getCartItems();
  let removedItemName = null;

  const updatedItems = items
    .map((item) => {
      if (item.id === id && item.selectedSize === selectedSize) {
        const newQty = qty - 1;
        if (newQty <= 0) {
          removedItemName = item.name;
          return null;
        }
        return { ...item, quantity: newQty };
      }
      return item;
    })
    .filter(Boolean); // Remove nulls

  localStorage.setItem("cart", JSON.stringify(updatedItems));
  handleCartUpdate();

  if (removedItemName) {
    toast.success(`${removedItemName} removed from cart`);
  }
};



  const handleCartItemDelete = (id) => {
    setRefetch(true);
    const items = getCartItems();
    const restItems = items.filter((item) => item.id !== id);
    localStorage.removeItem("cart");
    localStorage.setItem("cart", JSON.stringify(restItems));
  };

  const handleWishlist = (product) => {
    setRefetch(true);
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const isExist = wishlist.find((item) => item.title === product.title);
    if (!isExist) {
      wishlist.push(product);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    } else {
      alert("already in wishlist");
    }
  };

  const getWishList = () => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("wishlist")) || [];
    }
    return [];
  };

  const handleWishlistDelete = (title) => {
    setRefetch(true);
    const items = getWishList();
    const remainingItems = items.filter((item) => item.title !== title);
    localStorage.removeItem("wishlist");
    localStorage.setItem("wishlist", JSON.stringify(remainingItems));
  };

  
   const handleBuy = (item, quantity) => {
    if (!selectedSizeCart) {
    toast.error("Please select a size first");
    return; 
  }

    handleCart(item, quantity);

    const status = typeof item?.status === 'string' ? item.status.toLowerCase() : null;

    if ((status && status !== "stock out") || item?.current_stock) {
        router.push('/checkout');
    }
};


  const reload = (boolean) => {
    setRefetch(boolean);
  };

  const handlePromoBanner = () => {
    setIsOpenPromoBanner(true);
  };

  const handleClosePromo = () => {
    setIsOpenPromoBanner(false);
  };

  const handleSelectRegion = () => {
    setIsSelectRegion(true);
  };

  const handleCloseRegion = () => {
    setIsSelectRegion(false);
  };

  const googleLogin = () => {
       return signInWithPopup(auth,googleProvider);
    }


  const { data: blogs } = useSWR(
    `${process.env.NEXT_PUBLIC_API}/latest-ecommerce-blog-list/${userId}`,
    fetcher
  );

  const values = {
    handleCart,
     prices,
        setProductPrice,
    setIsSelectRegion,
    isSelectRegion,
    handleSelectRegion,
    handleCloseRegion,
    getCartItems,
    refetch,
    openCart,
    getPriceByCountry,
    googleLogin,
    setOpenCart,
    reload,
    handleIncQuantity,
    handleDncQuantity,
    cartItems,
    setRefetch,
    handleCartItemDelete,
    handleWishlist,
    selectedId,
    setSelectedId,
    getWishList,
    handleBuy,
    handleWishlistDelete,
    isLoginModal,
    setIsLoginModal,
    setWishlist,
    wishlist,
   
    token,
    setWholesalePrice,
    wholesalePrice,
    setToken,
    hasToken,
    setIsInCart,
    isInCart,
    setHasToken,
    loading,
    setLoading,
    setUserInfo,
    userInfo,
    isOpenPromoBanner,
    handleClosePromo,
    handlePromoBanner,
    setIsOpenPromoBanner,
    blogs,
    setSelectedCountry,
    selectedCountry,
    countries,
    convertedPrice,
    setSelectedSizeCart,
    selectedSizeCart,
    
    setConvertedPrice,
    setBasePrice,
    setCountry,
    country,
    setIsRegistered,
    basePrice,
    isRegistered
  };

  return (
    <storeContext.Provider value={values}>{children}</storeContext.Provider>
  );
};

export default StoreProvider;
