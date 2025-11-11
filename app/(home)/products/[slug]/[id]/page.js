// "use client";
// import {
//   Modal,
//   Box,
//   Tab,
//   Tabs,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
// } from "@mui/material";
// import { useEffect, useState } from "react";
// import Image from "next/image";
// import { IoIosDoneAll } from "react-icons/io";
// import Link from "next/link";
// import { Minus, Plus, ShoppingBag } from "lucide-react";
// import useSWR from "swr";
// import axios from "axios";
// import toast from "react-hot-toast";
// import noImg from "/public/no-image.jpg";
// import { htmlToText } from "html-to-text";
// import "react-inner-image-zoom/lib/styles.min.css";
// import useStore from "@/app/CustomHooks/useStore";
// import useWishlist from "@/app/CustomHooks/useWishlist";
// import { FaHeart, FaRegHeart } from "react-icons/fa6";
// import CursorImageZoom from "@/app/Components/CustomImageZoom";
// import { userId } from "@/app/(home)/page";

// // Fetcher function from the original code
// const fetcher = (url) => fetch(url).then((res) => res.json());

// const ProductPage = ({ params }) => {
//   const { id } = params;
//   const [quantity, setQuantity] = useState(1);
//   const [imageIndex, setImageIndex] = useState(0);
//   const [scroll, setScroll] = useState(0);
//   const [sizeQuantity, setSizeQuantity] = useState();
//   const [activeTab, setActiveTab] = useState("description");
//   const [cartItems, setCartItems] = useState([]);
//   const [relatedProducts, setRelatedProducts] = useState([]);
//   const [recentProducts, setRecentProducts] = useState([]);
//   const [imageArray, setImageArray] = useState([]);
//   const [selectedSize, setSelectedSize] = useState("");
//   const { toggleWishlist, isInWishlist } = useWishlist();
//   const {
//     handleCart,
//     convertedPrice,
//     selectedCountry,
//     getCartItems,
//     refetch,
//     setRefetch,
//     prices,
//     setIsInCart,
//     isInCart,
//     country,
//     setProductPrice,
//     handleBuy,
//     setSelectedSizeCart,
//     selectedSizeCart,
//     setSelectedId,
//     selectedId,
//     selectedSizeQuantity,
//   } = useStore();

//   // size guide modal
//   const [open, setOpen] = useState(false);
//   const [tab, setTab] = useState(0);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);
//   const handleTabChange = (event, newValue) => setTab(newValue);

//   const inches = [
//     ["CHEST", "40", "42", "44", "46", "48"],
//     ["LENGTH", "28", "29", "30", "31", "31.5"],
//     ["COLLAR", "15", "15.5", "16", "16.5", "17"],
//   ];

//   // console.log(sizeQuantity);

//   const { data: product, error } = useSWR(
//     id ? `${process.env.NEXT_PUBLIC_API}/public/products-detail/${id}` : null,
//     fetcher
//   );

//   useEffect(() => {
//     if (product?.data.id && product?.data.retails_price) {
//       setProductPrice(
//         product.data.id,
//         product?.data.retails_price,
//         product?.data.intl_retails_price || null
//       );
//     }
//   }, []);

//   const productPrice = prices[product?.data.id];

//   const getPriceByCountry = () => {
//     if (country && country.value === "BD") {
//       return productPrice?.basePrice || product?.data.retails_price || 0;
//     } else {
//       return (
//         productPrice?.intl_retails_price ||
//         product?.data.intl_retails_price ||
//         0
//       );
//     }
//   };

//   // --------------TODO: uncomment this----------------

//   useEffect(() => {
//     if (product?.data && product?.data?.product_variants.length) {
//       // setSelectedSize(product?.data?.product_variants[0].name)
//       setSelectedSizeCart(product?.data?.product_variants.name);
//       // setSelectedSizeQuantity(product?.data?.product_variants.quantity)
//       setSelectedId(product?.data?.product_variants.id);
//     }
//   }, [product?.data]);

//   const discountedPrice =
//     country?.value === "BD"
//       ? product?.data.discount_type === "Percentage"
//         ? product?.data?.discount
//           ? (
//               product?.data?.retails_price -
//               (product?.data?.retails_price * product?.data.discount) / 100
//             ).toFixed(0)
//           : null
//         : product?.data.retails_price - product?.data.discount
//       : product?.data.discount_type === "Percentage"
//       ? product?.data?.intl_discount
//         ? (
//             product?.data?.intl_retails_price -
//             (product?.data?.intl_retails_price * product?.data.intl_discount) /
//               100
//           ).toFixed(0)
//         : null
//       : product?.data.intl_retails_price - product?.data.intl_discount;

//   const fixedDiscount =
//     country?.value === "BD"
//       ? product?.data.discount_type === "Fixed"
//         ? "Tk"
//         : null
//       : product?.data.discount_type === "Fixed"
//       ? "$"
//       : null;
//   const percentageDiscount =
//     product?.data.discount_type === "Percentage" ? "%" : null;

//   useEffect(() => {
//     const getCartItems = () => {
//       const storedCart = localStorage.getItem("cart");
//       return storedCart ? JSON.parse(storedCart) : [];
//     };
//     setCartItems(getCartItems());
//     if (product?.data) {
//       // Check if product with selected size is in cart
//       const isProductInCart = getCartItems().find(
//         (item) =>
//           item?.id === product?.data.id && item?.selectedSizeId === selectedId
//       );
//       setIsInCart(!!isProductInCart);
//     }
//   }, [product?.data, selectedId]);

//   useEffect(() => {
//     const getCartItems = () => {
//       const storedCart = localStorage.getItem("cart");
//       return storedCart ? JSON.parse(storedCart) : [];
//     };
//     setCartItems(getCartItems());
//     if (product?.data) {
//       // Check if product with selected size is in cart
//       const isProductInCart = getCartItems().find(
//         (item) =>
//           item?.id === product?.data.id && item?.selectedSizeId === selectedId
//       );
//       setIsInCart(!!isProductInCart);
//     }
//   }, [product?.data, selectedId]);

//   useEffect(() => {
//     const fetchRelatedProducts = async () => {
//       if (!id) return;
//       try {
//         const response = await axios.post(
//           `${process.env.NEXT_PUBLIC_API}/public/get-related-products`,
//           {
//             product_id: id,
//             user_id: userId,
//           }
//         );
//         setRelatedProducts(response.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchRelatedProducts();
//   }, [id]);

//   useEffect(() => {
//     const storedProducts =
//       JSON.parse(localStorage.getItem("recentlyViewed")) || [];
//     if (storedProducts.length) {
//       const withoutThisProduct = storedProducts.filter((item) => item.id != id);
//       setRecentProducts(withoutThisProduct);
//     }
//   }, [id]);

//   useEffect(() => {
//     if (product?.data) {
//       if (
//         product.data?.have_variant === "1" &&
//         product.data?.imei_image &&
//         product?.data?.imei_image?.length > 0
//       ) {
//         setImageArray(product?.data?.imei_image);
//       } else {
//         setImageArray(product?.data?.images);
//       }
//     }
//   }, [product?.data]);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScroll(window.scrollY);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const countrySign = selectedCountry?.value === "BD" ? "৳" : "$";

//   const incrementQuantity = () => {
//     if (quantity < sizeQuantity) {
//       setQuantity((prev) => prev + 1);
//     } else {
//       toast.error(`Only ${sizeQuantity} items available in stock`);
//     }
//   };

//   const decrementQuantity = () => {
//     if (quantity > 1) {
//       setQuantity((prev) => prev - 1);
//     }
//   };

//   const sanitizeSlug = (str) => {
//     return str
//       ?.toLowerCase()
//       .replace(/\s+/g, "-")
//       .replace(/[^a-z0-9-]/g, "");
//   };

//   if (!product && !error) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="text-red-500">Failed to load product data</div>
//       </div>
//     );
//   }

//   const descriptionText = product?.data?.description
//     ? htmlToText(product.data.description, {
//         wordwrap: false,
//         selectors: [{ selector: "a", options: { ignoreHref: true } }],
//       })
//     : null;

//   const isCartItem = cartItems.find(
//     (item) =>
//       item?.id === product?.data.id && item?.selectedSizeId === selectedId
//   );

//   return (
//     <section className=" text-black lg:pt-16 md:pt-16 pt-14">
//       <div className="px-4 lg:px-8 pt-6 lg:pt-12 mx-auto max-w-7xl">
//         <div className="flex flex-col md:flex-row gap-8 mb-12">
//           {/* Product Images */}
//           <div className="md:w-1/2">
//             <div className="flex flex-col-reverse md:flex-row gap-4">
//               {/* Thumbnails */}
//               <div className="flex md:flex-col gap-3 mt-4 md:mt-0">
//                 {imageArray && imageArray.length > 0 ? (
//                   imageArray.map((image, idx) => (
//                     <button
//                       key={idx}
//                       onClick={() => setImageIndex(idx)}
//                       className={`relative border rounded-md overflow-hidden ${
//                         imageIndex === idx ? "ring-2 ring-black" : ""
//                       }`}
//                     >
//                       <Image
//                         src={image || noImg}
//                         alt={`Product view ${idx + 1}`}
//                         width={80}
//                         height={80}
//                         className="object-cover aspect-square"
//                       />
//                     </button>
//                   ))
//                 ) : (
//                   <div className="w-20 h-20 bg-gray-200 rounded-md"></div>
//                 )}
//               </div>
//               {/* Main Image */}
//               <div className="relative flex-1">
//                 {country?.value === "BD"
//                   ? product?.data?.discount > 0 && (
//                       <div className="absolute top-4 left-4 z-10 bg-black text-white text-xs font-medium px-2 py-1 rounded-md">
//                         SAVE {product?.data?.discount}{" "}
//                         {fixedDiscount || percentageDiscount}
//                       </div>
//                     )
//                   : product?.data?.intl_discount > 0 && (
//                       <div className="absolute top-4 left-4 z-10 bg-black text-white text-xs font-medium px-2 py-1 rounded-md">
//                         SAVE {product?.data?.intl_discount}{" "}
//                         {fixedDiscount || percentageDiscount}
//                       </div>
//                     )}
//                 {imageArray && imageArray.length > 0 ? (
//                   <CursorImageZoom
//                     src={imageArray[imageIndex]}
//                     alt={product?.data?.name || noImg}
//                     className="w-full xl:h-[65vh] md:h-[60vh] h-[42vh] rounded-lg"
//                     zoomScale={2.5}
//                   />
//                 ) : product?.data?.image_path ? (
//                   <Image
//                     src={product.data.image_path || noImg}
//                     alt={product?.data?.name || "Product image"}
//                     width={600}
//                     height={600}
//                     className="w-full h-auto object-cover rounded-lg"
//                   />
//                 ) : (
//                   <div className="w-full aspect-square bg-gray-200 rounded-lg"></div>
//                 )}
//               </div>
//             </div>
//           </div>
//           {/* Product Details */}
//           <div className="md:w-1/2">
//             <h1 className="text-2xl md:text-3xl font-bold mb-2">
//               {product?.data?.name}
//             </h1>
//             <div className="flex items-center gap-3 mb-4">
//               {!countrySign ? (
//                 <>
//                   {product?.data?.discount > 0 && (
//                     <span className="text-gray-500 line-through text-sm">
//                       ৳{getPriceByCountry()}
//                     </span>
//                   )}
//                 </>
//               ) : (
//                 ""
//               )}
//               <span className="text-2xl font-bold">
//                 {countrySign}
//                 {getPriceByCountry() || discountedPrice}
//               </span>
//               {!countrySign ? (
//                 <>
//                   {product?.data?.discount > 0 && (
//                     <span className="text-xs font-medium text-green-600 border border-green-600 px-2 py-0.5 rounded-full">
//                       {product?.data?.discount}{" "}
//                       {fixedDiscount || percentageDiscount} OFF
//                     </span>
//                   )}
//                 </>
//               ) : (
//                 ""
//               )}
//             </div>
//             <p className="text-sm text-gray-600 mb-6">
//               {descriptionText ? (
//                 <p className="text-gray-600 whitespace-pre-line mb-4">
//                   {descriptionText.substring(0, 33)}
//                 </p>
//               ) : (
//                 <p>Description is not available</p>
//               )}
//             </p>

//             {/* Size Selection */}
//             <div className="mb-6">
//               <div className="flex justify-between items-center mb-3">
//                 {selectedSize && (
//                   <h3 className="font-medium text-sm">
//                     Size:{" "}
//                     {product?.data?.product_variants &&
//                     product.data.product_variants.length > 0
//                       ? selectedSize
//                       : "N/A"}{" "}
//                     <span className="text-xs font-normal">
//                       ({sizeQuantity || 0} available){" "}
//                     </span>{" "}
//                   </h3>
//                 )}

//                 <button
//                   onClick={handleOpen}
//                   className="text-sm text-gray-600 underline"
//                 >
//                   Size Guide
//                 </button>
//               </div>
//               <div className="flex gap-3">
//                 <div className="flex gap-3">
//                   {product?.data?.product_variants &&
//                   product.data.product_variants.length > 0
//                     ? product.data.product_variants.map((variant) => {
//                         const isSelected = selectedSize === variant.name;
//                         const isDisabled = variant.quantity < 1;

//                         // Check if this size is already in the cart
//                         const isInCartSize = cartItems.find(
//                           (item) =>
//                             item.id === product.data.id &&
//                             item.selectedSizeId === variant.id
//                         );

//                         return (
//                           <button
//                             key={variant.name}
//                             onClick={() => {
//                               if (!isDisabled && !isInCartSize) {
//                                 setSelectedSize(variant?.name);
//                                 setSelectedSizeCart(variant?.name);
//                                 setSizeQuantity(variant?.quantity);
//                                 setSelectedId(variant.id);
//                                 setQuantity(1);
//                               }
//                             }}
//                             disabled={isDisabled || isInCartSize}
//                             className={`flex items-center justify-center w-12 h-12 border rounded-md transition
//               ${
//                 isSelected
//                   ? "border-black bg-black text-white"
//                   : "border-gray-300 hover:border-gray-400"
//               }
//               ${
//                 isDisabled || isInCartSize
//                   ? "opacity-20 cursor-not-allowed hover:border-gray-300"
//                   : "cursor-pointer"
//               }`}
//                           >
//                             {variant.name}
//                           </button>
//                         );
//                       })
//                     : "No size available"}
//                 </div>
//               </div>
//             </div>
//             {/* Quantity and Actions */}
//             <div className="flex flex-col gap-4">
//               <div className="flex items-center gap-4">
//                 <div className="flex items-center border border-gray-300 rounded-md">
//                   <button
//                     onClick={decrementQuantity}
//                     className="px-3 py-2 text-gray-600 hover:bg-gray-100"
//                     aria-label="Decrease quantity"
//                   >
//                     <Minus className="h-4 w-4" />
//                   </button>
//                   <span className="px-4 py-2 border-x border-gray-300">
//                     {quantity}
//                   </span>
//                   <button
//                     onClick={incrementQuantity}
//                     className="px-3 py-2 text-gray-600 hover:bg-gray-100"
//                     aria-label="Increase quantity"
//                   >
//                     <Plus className="h-4 w-4" />
//                   </button>
//                 </div>
//               </div>

//               <div className="flex gap-3 mt-3">
//                 <button
//                   onClick={() => handleBuy(product?.data, quantity)}
//                   className="flex-1 bg-black md:text-base text-sm hover:bg-gray-800 text-white py-2 px-4 rounded-md font-medium transition-colors"
//                 >
//                   Buy Now
//                 </button>
//                 <button
//                   onClick={(e) => {
//                     e.preventDefault();
//                     handleCart(product?.data, quantity, selectedId);
//                   }}
//                   className={`flex-1 md:text-base text-sm flex items-center justify-center gap-2 py-2 px-4 rounded-md font-medium cursor-pointer transition-colors ${
//                     isInCart
//                       ? "bg-white text-black border border-gray-300"
//                       : "bg-gray-200 hover:bg-gray-300 text-black"
//                   }`}
//                   disabled={isInCart}
//                 >
//                   {!isInCart ? (
//                     <ShoppingBag className="h-4 w-4" />
//                   ) : (
//                     <IoIosDoneAll className="h-5 w-5" />
//                   )}
//                   {isInCart ? "Added in Cart" : "Add to Cart"}
//                 </button>
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     toggleWishlist(product);
//                   }}
//                   className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
//                   aria-label="Add to wishlist"
//                 >
//                   {isInWishlist(product.id) ? (
//                     <FaHeart
//                       color="teal"
//                       size={18}
//                       className="transition-all duration-300 animate-heart-bounce"
//                     />
//                   ) : (
//                     <FaRegHeart
//                       color="black"
//                       size={18}
//                       className="transition-all duration-300"
//                     />
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* Product Information Tabs */}
//         <div className="mb-12 lg:mt-20">
//           {/* <div className="border-b">
//             <button
//               onClick={() => setActiveTab("description")}
//               className={`py-2 px-4 text-base font-medium ${
//                 activeTab === "description" ? "border-b-2 border-black text-black" : "text-gray-500 hover:text-gray-700"
//               }`}
//             >
//               Description
//             </button>
//           </div> */}
//           <div
//             className={`pt-6 ${
//               activeTab === "description" ? "block" : "hidden"
//             }`}
//           >
//             <div
//               id="Description"
//               className="mt-5 p-3 text-sm border rounded-lg"
//             >
//               <h2 className="text-xl font-bold text-gray-900">Description</h2>
//               <div className="w-[6.5rem] h-[2px] bg-[#212121] mt-1 mb-4"></div>
//               {descriptionText ? (
//                 <p className="text-gray-600 whitespace-pre-line mb-4">
//                   {descriptionText}
//                 </p>
//               ) : (
//                 <p>Description is not available</p>
//               )}
//             </div>
//           </div>
//         </div>
//         {/* Related Products */}
//         <div className="mb-12">
//           <h2 className="text-xl font-bold mb-6">You May Also Like</h2>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             {relatedProducts && relatedProducts.length > 0 ? (
//               relatedProducts.map((item) => (
//                 <Link
//                   key={item.id}
//                   href={`/products/${sanitizeSlug(
//                     item?.brand_name || item?.name
//                   )}/${item?.id}`}
//                   className="group"
//                 >
//                   <div className="aspect-square rounded-md overflow-hidden bg-gray-100 mb-3">
//                     <Image
//                       src={item.image_path || noImg}
//                       alt={item.name}
//                       width={300}
//                       height={300}
//                       className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                     />
//                   </div>
//                   <h3 className="font-medium text-sm mb-1 line-clamp-1">
//                     {item.name}
//                   </h3>
//                   <p className="text-sm">
//                     {country?.value === "BD"
//                       ? `৳ ${item.retails_price}`
//                       : `$ ${item?.intl_retails_price || 0}`}
//                   </p>
//                 </Link>
//               ))
//             ) : (
//               <p className="col-span-4 text-gray-500">
//                 No related products available.
//               </p>
//             )}
//           </div>
//         </div>
//         {/* Recently Viewed */}
//         <div className="mb-12">
//           <h2 className="text-xl font-bold mb-6">Recently Viewed</h2>
//           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 pb-10">
//             {recentProducts && recentProducts.length > 0 ? (
//               recentProducts.map((item) => (
//                 <Link
//                   key={item.id}
//                   href={`/products/${sanitizeSlug(
//                     item?.brand_name || item?.name
//                   )}/${item?.id}`}
//                   className="group"
//                 >
//                   <div className="aspect-square rounded-md overflow-hidden bg-gray-100 mb-3">
//                     <Image
//                       src={item.image || noImg}
//                       alt={item.name}
//                       width={300}
//                       height={300}
//                       className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                     />
//                   </div>
//                   <h3 className="font-medium text-sm mb-1 line-clamp-1">
//                     {item.name}
//                   </h3>
//                   <p className="text-sm">
//                     {country?.value === "BD" ? `৳` : "$"} {item.price}
//                   </p>
//                 </Link>
//               ))
//             ) : (
//               <p className="col-span-4 text-gray-500">
//                 No recently viewed products.
//               </p>
//             )}
//           </div>
//         </div>
//       </div>
//       {/* Sticky Add to Cart Bar */}
//       {scroll > 500 && product?.data && (
//         <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg py-3 px-4 z-50">
//           <div className="max-w-7xl mx-auto flex items-center justify-between">
//             <div className="flex items-center gap-4">
//               <Image
//                 src={
//                   imageArray && imageArray.length > 0
//                     ? imageArray[0]
//                     : product.data.image_path || noImg
//                 }
//                 alt={product.data.name}
//                 width={50}
//                 height={50}
//                 className="rounded-md"
//               />
//               <div>
//                 <h3 className="font-medium text-sm line-clamp-1">
//                   {product.data.name}
//                 </h3>
//                 <p className="text-sm font-bold">
//                   ৳
//                   {country?.value === "BD"
//                     ? product.data.discount > 0
//                       ? (
//                           product.data.retails_price -
//                           (product.data.retails_price * product.data.discount) /
//                             100
//                         ).toFixed(0)
//                       : product.data.retails_price
//                     : product.data.intl_discount > 0
//                     ? (
//                         product.data.intl_retails_price -
//                         (product.data.intl_retails_price *
//                           product.data.intl_discount) /
//                           100
//                       ).toFixed(0)
//                     : product.data.intl_retails_price}
//                 </p>
//                 <p className="text-xs text-gray-500">Size: {selectedSize}</p>
//               </div>
//             </div>
//             <div className="flex flex-col md:flex-row items-center gap-3">
//               <div className="flex items-center border border-gray-300 rounded-md">
//                 <button
//                   onClick={decrementQuantity}
//                   className="px-2 py-1 text-gray-600"
//                 >
//                   <Minus className="h-3 w-3" />
//                 </button>
//                 <span className="px-3 py-1 border-x border-gray-300">
//                   {quantity}
//                 </span>
//                 <button
//                   onClick={incrementQuantity}
//                   className="px-2 py-1 text-gray-600"
//                 >
//                   <Plus className="h-3 w-3" />
//                 </button>
//               </div>
//               <button
//                 onClick={(e) => {
//                   e.preventDefault();
//                   handleCart(product?.data, quantity, selectedId);
//                 }}
//                 className={`py-2 px-4 rounded-md font-medium ${
//                   isCartItem
//                     ? "bg-white text-black border border-gray-300"
//                     : "bg-black hover:bg-gray-800 text-white"
//                 }`}
//                 disabled={isCartItem && selectedSize}
//               >
//                 {isCartItem ? "Added" : "Add to Cart"}
//               </button>
//               <button
//                 onClick={() => handleBuy(product.data, quantity)}
//                 className="hidden md:block bg-black hover:bg-gray-800 text-white py-2 px-4 rounded-md font-medium"
//               >
//                 Buy Now
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//       <Modal open={open} onClose={handleClose}>
//         <Box
//           sx={{
//             width: {
//               xs: "90%", // 90% width on extra-small devices (mobile)
//               sm: 500, // 500px on small devices (tablets)
//               md: 700, // 700px on medium+ devices (desktops)
//             },
//             bgcolor: "background.paper",
//             margin: "100px auto",
//             padding: {
//               xs: 2,
//               sm: 3,
//               md: 4,
//             },
//             outline: "none",
//             borderRadius: 2,
//             maxHeight: "90vh",
//             overflowY: "auto", // allow scroll if content overflows
//           }}
//         >
//           <Typography color="black" variant="h6" mb={2}>
//             MEN&apos;S THOBE - REGULAR FIT
//           </Typography>
//           <Tabs
//             value={tab}
//             onChange={handleTabChange}
//             aria-label="Size Guide Tabs"
//           >
//             <Tab label="IN" />
//           </Tabs>
//           <Box mt={2}>
//             <Table>
//               <TableHead>
//                 <TableRow className="text-teal-500">
//                   <TableCell>Measurement Points</TableCell>
//                   <TableCell>S</TableCell>
//                   <TableCell>M</TableCell>
//                   <TableCell>L</TableCell>
//                   <TableCell>XL</TableCell>
//                   <TableCell>2XL</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {(tab === 0 ? inches : []).map((row, i) => (
//                   <TableRow key={i}>
//                     {row.map((cell, j) => (
//                       <TableCell key={j}>{cell}</TableCell>
//                     ))}
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </Box>
//         </Box>
//       </Modal>
//     </section>
//   );
// };

// export default ProductPage;


"use client"
import { Modal, Box, Tab, Tabs, Typography, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import { useEffect, useState } from "react"
import Image from "next/image"
import { IoIosDoneAll } from "react-icons/io"
import Link from "next/link"
import { Minus, Plus, ShoppingBag, Star, Truck, Shield, RotateCcw } from "lucide-react"
import useSWR from "swr"
import axios from "axios"
import toast from "react-hot-toast"
import noImg from "/public/no-image.jpg"
import { htmlToText } from "html-to-text"
import "react-inner-image-zoom/lib/styles.min.css"
import useStore from "@/app/CustomHooks/useStore"
import useWishlist from "@/app/CustomHooks/useWishlist"
import { FaHeart, FaRegHeart } from "react-icons/fa6"
import CursorImageZoom from "@/app/Components/CustomImageZoom"
import { userId } from "@/app/(home)/page"
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
// Fetcher function from the original code
const fetcher = (url) => fetch(url).then((res) => res.json())

const ProductPage = ({ params }) => {
  const { id } = params
  const [quantity, setQuantity] = useState(1)
  const [imageIndex, setImageIndex] = useState(0)
  const [scroll, setScroll] = useState(0)
  const [sizeQuantity, setSizeQuantity] = useState(null)
  const [activeTab, setActiveTab] = useState("description")
  const [cartItems, setCartItems] = useState([])
  const [relatedProducts, setRelatedProducts] = useState([])
  const [recentProducts, setRecentProducts] = useState([])
  const [imageArray, setImageArray] = useState([])
  const [isOpen, setIsOpen] = useState(false);
  
  const [selectedSize, setSelectedSize] = useState("")
  const { toggleWishlist, isInWishlist } = useWishlist()
  const {
    handleCart,
    convertedPrice,
    selectedCountry,
    getCartItems,
    refetch,
    setRefetch,
    prices,
    setIsInCart,
    isInCart,
    country,
    setProductPrice,
    handleBuy,
    setSelectedSizeCart,
    selectedSizeCart,
    setSelectedId,
    selectedId,
    selectedSizeQuantity,
    setSelectedSku,
    selectedSku
  } = useStore()

  // size guide modal
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState(0)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleTabChange = (event, newValue) => setTab(newValue)
// console.log(selectedSku);
  const inches = [
    ["CHEST", "40", "42", "44", "46", "48"],
    ["LENGTH", "28", "29", "30", "31", "31.5"],
    ["COLLAR", "15", "15.5", "16", "16.5", "17"],
  ]

  const { data: product, error } = useSWR(
    id ? `${process.env.NEXT_PUBLIC_API}/public/products-detail/${id}` : null,
    fetcher,
  )

  useEffect(() => {
    if (product?.data.id && product?.data.retails_price) {
      setProductPrice(product.data.id, product?.data.retails_price, product?.data.intl_retails_price || null)
    }
  }, [])

  const productPrice = prices[product?.data.id]



  useEffect(() => {
    if (product?.data && product?.data?.product_variants.length) {
      setSelectedSizeCart(product?.data?.product_variants.name)
      setSelectedId(product?.data?.product_variants.id)
    }
  }, [product?.data])

  const discountedPrice =
    country?.value === "BD"
      ? product?.data.discount_type === "Percentage"
        ? product?.data?.discount
          ? (product?.data?.retails_price - (product?.data?.retails_price * product?.data.discount) / 100).toFixed(0)
          : null
        : product?.data.retails_price - product?.data.discount
      : product?.data.discount_type === "Percentage"
        ? product?.data?.intl_discount
          ? (
              product?.data?.intl_retails_price -
              (product?.data?.intl_retails_price * product?.data.intl_discount) / 100
            ).toFixed(0)
          : null
        : product?.data.intl_retails_price - product?.data.intl_discount

 

  useEffect(() => {
    const getCartItems = () => {
      const storedCart = localStorage.getItem("cart")
      return storedCart ? JSON.parse(storedCart) : []
    }
    setCartItems(getCartItems())
    if (product?.data) {
      const isProductInCart = getCartItems().find(
        (item) => item?.id === product?.data.id && item?.selectedSizeId === selectedId,
      )
      setIsInCart(!!isProductInCart)
    }
  }, [product?.data, selectedId])

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (!id) return
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API}/public/get-related-products`, {
          product_id: id,
          user_id: userId,
        })
        setRelatedProducts(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchRelatedProducts()
  }, [id])

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("recentlyViewed")) || []
    if (storedProducts.length) {
      const withoutThisProduct = storedProducts.filter((item) => item.id != id)
      setRecentProducts(withoutThisProduct)
    }
  }, [id])

  useEffect(() => {
    if (product?.data) {
      if (product.data?.have_variant === "1" && product.data?.imei_image && product?.data?.imei_image?.length > 0) {
        setImageArray(product?.data?.imei_image)
      } else {
        setImageArray(product?.data?.images)
      }
    }
  }, [product?.data])

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

 
  const incrementQuantity = () => {
    if (quantity < sizeQuantity) {
      setQuantity((prev) => prev + 1)
    } else {
      toast.error(`Only ${sizeQuantity || 0} items available in stock`, {
      position: "bottom-center",
    })
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  const sanitizeSlug = (str) => {
    return str
      ?.toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
  }

  console.log(selectedSize);

  if (!product && !error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-neutral-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-neutral-200 border-t-neutral-900"></div>
          <p className="text-neutral-600 font-medium poppins">Loading product...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-neutral-50">
        <div className="text-center">
          <div className="text-red-500 text-lg font-medium mb-2">Failed to load product</div>
          <p className="text-neutral-600">Please try again later</p>
        </div>
      </div>
    )
  }

  const descriptionText = product?.data?.description
    ? htmlToText(product.data.description, {
        wordwrap: false,
        selectors: [{ selector: "a", options: { ignoreHref: true } }],
      })
    : null

  const isCartItem = cartItems.find((item) => item?.id === product?.data.id && item?.selectedSizeId === selectedId)


  console.log(product);
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-neutral-50 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3">
          <nav className="flex items-center space-x-2 text-sm text-neutral-600">
            <Link href="/" className="hover:text-neutral-900 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/products" className="hover:text-neutral-900 transition-colors">
              Products
            </Link>
            <span>/</span>
            <span className="text-neutral-900 font-medium">{product?.data?.name}</span>
          </nav>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-8 lg:pb-16 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Product Images */}
          <div className="space-y-4 relative">
            

            {/* Main Image */}
            <div className="aspect-[4/4] bg-neutral-100 rounded-sm overflow-hidden group relative">
              {imageArray && imageArray.length > 0 ? (
                <CursorImageZoom
                  src={imageArray[imageIndex]}
                  alt={product?.data?.name || "Product image"}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  zoomScale={2.5}
                />
              ) : product?.data?.image_path ? (
                <Image
                  src={product.data.image_path || noImg}
                  alt={product?.data?.name || "Product image"}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-neutral-200 flex items-center justify-center">
                  <span className="text-neutral-400">No image available</span>
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {imageArray && imageArray.length > 1 && (
              <div className="flex justify-center md:justify-start space-x-3 overflow-x-auto pb-2 md:absolute bottom-5 left-[25%]">
                {imageArray.map((image, idx) => (
                  <button
                    key={idx}
                    onClick={() => setImageIndex(idx)}
                    className={`relative flex-shrink-0 w-20 h-20 rounded-xs overflow-hidden border-2 transition-all duration-300 ${
                      imageIndex === idx
                        ? "border-neutral-100 shadow-lg"
                        : "border-neutral-400 hover:border-neutral-400"
                    }`}
                  >
                    <Image unoptimized src={image || noImg} alt={`Product view ${idx + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            {/* Product Title & Rating */}
            <div className="space-y-4">
              <h1 className="text-2xl lg:text-3xl font-semibold text-neutral-900 leading-tight outfit">{product?.data?.name}</h1>

              {/* sku */}

              {selectedSku ? (<div className="flex items-center gap-2 text-black">
                <h3 className="font-semibold text-base font-serif text-gray-900">SKU:</h3>
                <p className="text-gray-700 text-sm poppins">{selectedSku || "N/A"}</p>
              </div>) : ""}
             
            </div>

            {/* Price */}
            <div className="space-y-2">
             <div className="flex items-baseline space-x-3">
  {product?.data?.discount > 0 ? (
    <>
      {/* Final discounted price */}
      <span className="text-3xl font-bold text-neutral-900">
        ৳
        {product?.data?.discount_type === "Percentage"
          ? (
              product?.data.retails_price -
              (product?.data.retails_price * product?.data.discount) / 100
            ).toFixed(0)
          : (product?.data.retails_price - product?.data.discount).toFixed(0)}
      </span>

      {/* Original price (strikethrough) */}
      <span className="text-lg text-neutral-500 line-through">
        ৳{product?.data?.retails_price || 0}
      </span>

      {/* Save badge */}
      <div className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-[10px] font-medium rounded-full">
        Save {product?.data?.discount}
        {product?.data?.discount_type === "Percentage" ? "%" : "৳"}
      </div>
    </>
  ) : (
    // No discount → just retail price
    <span className="text-3xl font-bold text-neutral-900">
      ৳{product?.data?.retails_price || 0}
    </span>
  )}
</div>

            </div>

            {/* Description Preview */}
            <div className="prose prose-neutral max-w-none">
              <p className="text-neutral-700 leading-relaxed">
                {descriptionText
                  ? descriptionText.substring(0, 150) + "..."
                  : "Premium quality fashion piece crafted with attention to detail."}
              </p>
            </div>

            {/* Size Selection */}
            <div className="space-y-4 flex md:flex-row flex-col md:items-center justify-between">
             <div className="space-y-4">
               <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-semibold text-neutral-900">Size:</h3>
                  {selectedSize && (
                    <p className="text-sm text-neutral-600">
                      Selected: <span className="font-medium">{selectedSize}</span>
                      <span className="ml-2">({sizeQuantity || 0} available)</span>
                    </p>
                  )}
                </div>
                {/* <button
                  onClick={handleOpen}
                  className="text-sm font-medium text-neutral-900 underline hover:no-underline transition-all"
                >
                  Size Guide
                </button> */}

                
              </div>

              <div className="flex flex-wrap gap-3">
                {product?.data?.product_variants && product.data.product_variants.length > 0 ? (
                  product.data.product_variants.map((variant) => {
                    const isSelected = selectedSize === variant.name
                    const isDisabled = variant.quantity < 1
                    const isInCartSize = cartItems.find(
                      (item) => item.id === product.data.id && item.selectedSizeId === variant.id,
                    )

                    return (
                      <button
                        key={variant.name}
                        onClick={() => {
                          if (!isDisabled && !isInCartSize) {
                            setSelectedSize(variant?.name)
                            setSelectedSizeCart(variant?.name)
                            setSelectedSku(variant?.sku)
                            setSizeQuantity(variant?.quantity)
                            setSelectedId(variant.id)
                            setQuantity(1)
                          }
                        }}
                        disabled={isDisabled || isInCartSize}
                        className={`relative min-w-[3rem] h-12 px-4 border-2 rounded-sm font-medium transition-all duration-300 ${
                          isSelected
                            ? "border-neutral-900 bg-neutral-900 text-white shadow-lg"
                            : "border-neutral-300 bg-white text-neutral-900 hover:border-neutral-500"
                        } ${isDisabled || isInCartSize ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}`}
                      >
                        {variant.name}
                        {isInCartSize && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></div>
                        )}
                      </button>
                    )
                  })
                ) : (
                  <p className="text-neutral-500">No sizes available</p>
                )}
              </div>
             </div>

              {/* Quantity Selector */}
            <div className="space-y-3">
              <h3 className="font-semibold text-neutral-900">Quantity:</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-neutral-200 rounded-full overflow-hidden">
                  <button
                    onClick={decrementQuantity}
                    className="p-3 hover:bg-neutral-100 transition-colors text-black bg-slate-200 rounded-full"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-6 py-3 font-medium min-w-[4rem] text-center text-black">
                    {quantity}
                  </span>
                  <button
                    onClick={incrementQuantity}
                    className="p-3 hover:bg-neutral-100 transition-colors text-black bg-slate-200 rounded-full"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
            </div>

            

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="flex space-x-4">
                <button
                  onClick={() => handleBuy(product?.data, quantity)}
                  className="flex-1 bg-neutral-900 hover:bg-neutral-800 text-white py-3 px-6 rounded-sm font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Buy Now
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleWishlist(product)
                  }}
                  className="p-4 border-2 border-neutral-300 rounded-sm hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 group"
                  aria-label="Add to wishlist"
                >
                  {isInWishlist(product.id) ? (
                    <FaHeart className="w-6 h-6 text-gray-800" />
                  ) : (
                    <FaRegHeart className="w-6 h-6 text-neutral-800 group-hover:text-gray-700" />
                  )}
                </button>
              </div>

              <button
                onClick={(e) => {
                  e.preventDefault()
                  handleCart(product?.data, quantity, selectedId)
                }}
                className={`w-full flex items-center justify-center space-x-3 py-3 px-6 rounded-sm font-semibold text-lg transition-all duration-300 ${
                  isInCart
                    ? "bg-green-100 text-green-800 border-2 border-green-300"
                    : "bg-neutral-100 hover:bg-neutral-200 text-neutral-900 border-2 border-neutral-300"
                }`}
                disabled={isInCart}
              >
                {isInCart ? (
                  <>
                    <IoIosDoneAll className="w-6 h-6" />
                    <span>Added to Cart</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-6 h-6" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>
            </div>

            {/* Product Features */}
            <div className="md:grid grid-cols-1 sm:grid-cols-3 gap-4 justify-between justify-items-center hidden">
              <div className="flex items-center space-x-2 text-sm">
                <Image width={100} height={100} src='https://www.outletexpense.xyz/uploads/215-Rifat-Hasan/1762857676.png' alt="payment-method"></Image>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <RotateCcw className="w-4 h-4 text-neutral-600" />
                <span className="text-neutral-700">03-day returns</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Shield className="w-4 h-4 text-neutral-600" />
                <span className="text-neutral-700">Secure checkout</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="md:mt-16 mt-5">
         

          <div className="md:pb-8">
          
              <div className="prose prose-neutral max-w-none border-b border-gray-400">
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-4 text-left"
      >
        <h3 className="text-lg font-medium text-neutral-800">
          Product Description
        </h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-5 h-5 text-neutral-600" />
        </motion.div>
      </button>

      {/* Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden px-4 pb-4"
          >
            <div className="text-neutral-700 leading-relaxed space-y-4">
              {descriptionText ? (
                <p className="whitespace-pre-line">{descriptionText}</p>
              ) : (
                <div className="space-y-4">
                  <p>
                    Experience premium quality and exceptional comfort with this
                    carefully crafted piece. Made from the finest materials and
                    designed with attention to detail.
                  </p>
                  <p>
                    Perfect for both casual and formal occasions, this versatile
                    item combines style with functionality to create a timeless
                    addition to your wardrobe.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
            

            
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts && relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-semibold text-neutral-800 mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((item) => (
                <Link
                  key={item.id}
                  href={`/products/${sanitizeSlug(item?.brand_name || item?.name)}/${item?.id}`}
                  className="group space-y-3"
                >
                  <div className="aspect-[4/5] rounded-sm overflow-hidden bg-neutral-100">
                    <Image
                      src={item.image_path || noImg}
                      alt={item.name}
                      width={300}
                      height={375}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium text-neutral-900 line-clamp-2 group-hover:text-neutral-700 transition-colors">
                      {item.name}
                    </h3>
                    <p className="font-semibold text-neutral-900">
                      {`${item.retails_price || 0}`}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Recently Viewed */}
        {/* {recentProducts && recentProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-neutral-900 mb-8">Recently Viewed</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {recentProducts.map((item) => (
                <Link
                  key={item.id}
                  href={`/products/${sanitizeSlug(item?.brand_name || item?.name)}/${item?.id}`}
                  className="group space-y-3"
                >
                  <div className="aspect-[4/5] rounded-xl overflow-hidden bg-neutral-100">
                    <Image
                      src={item.image || noImg}
                      alt={item.name}
                      width={240}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium text-neutral-900 text-sm line-clamp-2 group-hover:text-neutral-700 transition-colors">
                      {item.name}
                    </h3>
                    <p className="font-semibold text-neutral-900 text-sm">
                      {country?.value === "BD" ? "৳" : "$"} {item.price}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )} */}
      </section>

      {/* Sticky Add to Cart Bar */}
      {scroll > 500 && product?.data && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-neutral-200 shadow-2xl py-4 px-4 z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-neutral-100">
                <Image
                  src={imageArray && imageArray.length > 0 ? imageArray[0] : product.data.image_path || noImg}
                  alt={product.data.name}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-sm line-clamp-1 text-neutral-900">{product.data.name}</h3>
                <div className="flex items-center space-x-2">
                  <p className="font-bold text-sm text-neutral-900">
                    
                    {
                       product.data.discount > 0
                        ? discountedPrice
                        : product.data.retails_price
                      }
                  </p>
                  {selectedSize && <span className="text-xs text-neutral-600">Size: {selectedSize}</span>}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="hidden sm:flex items-center border border-neutral-300 rounded-full overflow-hidden">
                <button onClick={decrementQuantity} className="p-2 hover:bg-neutral-100 transition-colors bg-slate-300 rounded-full text-black">
                  <Minus className="h-3 w-3" />
                </button>
                <span className="px-3 py-2 text-sm font-medium border-neutral-300 text-black">{quantity}</span>
                <button onClick={incrementQuantity} className="p-2 hover:bg-neutral-100 transition-colors bg-slate-300 rounded-full text-black">
                  <Plus className="h-3 w-3" />
                </button>
              </div>

              <button
                onClick={(e) => {
                  e.preventDefault()
                  handleCart(product?.data, quantity, selectedId)
                }}
                className={`py-2 px-6 rounded-sm font-medium text-sm transition-all ${
                  isCartItem
                    ? "bg-green-100 text-green-800 border-2 border-green-300"
                    : "bg-neutral-900 hover:bg-neutral-800 text-white"
                }`}
                disabled={isCartItem && selectedSize}
              >
                {isCartItem ? "Added" : "Add to Cart"}
              </button>

              <button
                onClick={() => handleBuy(product.data, quantity)}
                className="hidden md:block bg-neutral-900 hover:bg-neutral-800 text-white py-2 px-6 rounded-sm font-medium text-sm transition-all"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Size Guide Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            width: {
              xs: "90%",
              sm: 500,
              md: 700,
            },
            bgcolor: "background.paper",
            margin: "100px auto",
            padding: {
              xs: 2,
              sm: 3,
              md: 4,
            },
            outline: "none",
            borderRadius: 3,
            maxHeight: "90vh",
            overflowY: "auto",
          }}
        >
          <Typography color="black" variant="h6" mb={2} className="font-bold">
            Size Guide - Men&apos;s Thobe Regular Fit
          </Typography>
          <Tabs
            value={tab}
            onChange={handleTabChange}
            aria-label="Size Guide Tabs"
            sx={{
              "& .MuiTab-root": {
                fontWeight: 600,
                color: "#6b7280",
                "&.Mui-selected": {
                  color: "#111827",
                },
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "#111827",
              },
            }}
          >
            <Tab label="Inches" />
          </Tabs>
          <Box mt={3}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", color: "#111827" }}>Measurement</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#111827" }}>S</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#111827" }}>M</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#111827" }}>L</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#111827" }}>XL</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#111827" }}>2XL</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(tab === 0 ? inches : []).map((row, i) => (
                  <TableRow key={i}>
                    {row.map((cell, j) => (
                      <TableCell key={j} sx={{ color: "#374151" }}>
                        {cell}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}

export default ProductPage

