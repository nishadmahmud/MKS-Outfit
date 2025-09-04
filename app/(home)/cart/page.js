"use client";

import { useEffect, useState } from "react";
import useStore from "../../CustomHooks/useStore";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { ShoppingBag, NotebookPen, ShoppingCart, Trash2 } from "lucide-react";
import CartSkeleton from "@/app/Components/CartSkeleton";
import noImg from "/public/no-image.jpg";

const CartPage = () => {
  const {
    getCartItems,
    handleCartItemDelete: storeHandleDelete,
    country,
    setRefetch,
    handleIncQuantity,
    handleDncQuantity,
  } = useStore();

  const [cartItems, setCartItems] = useState([]);
  const [note, setNote] = useState("");
  const [cartTotal, setCartTotal] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [totalSubtotalWithoutDiscount, setTotalSubtotalWithoutDiscount] =
    useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setCartItems(getCartItems());
    setLoading(false);
  }, [getCartItems]);

  const getPriceByCountry = (item) => {
    if (country?.value === "BD") {
      return item?.retails_price ?? 0;
    } else {
      return item?.intl_retails_price ?? 0;
    }
  };

  useEffect(() => {
    const total = cartItems.reduce((prev, item) => {
      const unitPrice = getPriceByCountry(item);
      return prev + unitPrice * item.quantity;
    }, 0);

    const discount = cartItems.reduce((prev, item) => {
      let discountAmount = 0;
      if (country.value == "BD") {
        if (item.discount_type === "Fixed") {
          discountAmount = (item.discount || 0) * item.quantity;
        } else if (item.discount_type === "Percentage") {
          discountAmount =
            ((item.retails_price * (item.discount || 0)) / 100) * item.quantity;
        }
      } else {
        if (item.discount_type === "Fixed") {
          discountAmount = (item.intl_discount || 0) * item.quantity;
        } else if (item.discount_type === "Percentage") {
          discountAmount =
            ((item.intl_retails_price * (item.intl_discount || 0)) / 100) *
            item.quantity;
        }
      }
      return prev + discountAmount;
    }, 0);

    const subtotal = cartItems.reduce((acc, item) => {
      const price =
        country.value == "BD"
          ? Number(item?.retails_price)
          : Number(item?.intl_retails_price) || 0;
      return acc + price * item.quantity;
    }, 0);

    setCartTotal(total);
    setTotalDiscount(discount);
    setTotalSubtotalWithoutDiscount(subtotal);
  }, [cartItems, country]);

  useEffect(() => {
    const savedNote = localStorage.getItem("cartAttachment");
    if (savedNote) setNote(savedNote);
  }, []);

  useEffect(() => {
    if (note) localStorage.setItem("cartAttachment", note);
    else localStorage.removeItem("cartAttachment");
  }, [note]);

  // const handleCartItemDelete = (id) => {
  //   storeHandleDelete(id);
  //   const items = getCartItems().filter((item) => item.id !== id);
  //   localStorage.setItem("cart", JSON.stringify(items));
  //   setCartItems(items);
  //   toast.success("Item removed from cart");
  // };

   const handleCartUpdate = () => {
    setRefetch(true);
    const updatedItems = getCartItems();
    setCartItems(updatedItems);
  };
 const handleCartItemDelete = (cartItemId) => {
  const updatedCart = getCartItems().filter(
    (item) => item.cartItemId !== cartItemId
  );

  localStorage.setItem("cart", JSON.stringify(updatedCart));
  handleCartUpdate()

  toast.success("Item removed from cart");
};



  if (loading) return <CartSkeleton />;

  return (
    <div className="bg-white min-h-screen w-11/12 mx-auto pt-5">
      <div className="container mx-auto px-4 pb-8 pt-16">
        <h1 className="text-2xl font-semibold flex items-center gap-1 mb-6 dark:text-black">
          <ShoppingBag size={21} /> Shopping Cart
        </h1>

        {cartItems.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 border dark:text-black">
                    <th className="py-4 px-4 text-left font-semibold">Image</th>
                    <th className="py-4 px-4 text-left font-semibold">
                      Product Name
                    </th>
                    <th className="py-4 px-4 text-left font-semibold">
                      Quantity
                    </th>
                    <th className="py-4 px-4 text-left font-semibold">Size</th>
                    <th className="py-4 px-4 text-right font-semibold">
                      Unit Price
                    </th>
                    <th className="py-4 px-4 text-right font-semibold">
                      Total
                    </th>
                    <th className="py-4 px-4 text-center font-semibold"></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id} className="border dark:text-black">
                      <td className="py-4 px-4">
                        <div className="w-20 h-20 relative">
                          {item?.images?.[0] ? (
                            <Image
                              src={item.images[0]}
                              alt={item.name}
                              fill
                              className="object-contain"
                            />
                          ) : item?.image_path ? (
                            <Image
                              src={item.image_path}
                              alt={item.name}
                              fill
                              className="object-contain"
                            />
                          ) : (
                            <Image
                              src={noImg}
                              alt={item.name}
                              fill
                              className="object-contain"
                            />
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4 font-medium">{item.name}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-center">
                          <button
                            onClick={() =>
                              item.quantity > 0 &&
                              handleDncQuantity(
                                item?.id,
                                item.quantity,
                                item.selectedSize
                              )
                            }
                            className="w-8 h-8 flex items-center justify-center border border-gray-300 bg-gray-50 dark:bg-white dark:text-black"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            value={item.quantity}
                            min={1}
                            readOnly
                            className="w-10 h-8 text-center border-t border-b border-gray-300 dark:bg-white dark:text-black"
                          />
                          <button
                            onClick={() =>
                              handleIncQuantity(
                                item?.id,
                                item.quantity,
                                item.selectedSize
                              )
                            }
                            className="w-8 h-8 flex items-center justify-center border border-gray-300 bg-gray-50 dark:bg-white dark:text-black"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="py-4 px-4 font-medium">
                        {item.selectedSize || "N/A"}
                      </td>
                      <td className="py-4 px-4 text-right">
                        {getPriceByCountry(item).toLocaleString()}
                      </td>
                      <td className="py-4 px-4 text-right font-medium">
                        {(
                          getPriceByCountry(item) * item.quantity
                        ).toLocaleString()}
                      </td>
                      <td className="py-4 px-4 text-center text-gray-500 hover:text-red-500">
                     <button
  onClick={() => handleCartItemDelete(item.cartItemId)}
  className="text-gray-500 hover:text-red-500"
>
  <Trash2 size={20} />
</button>


                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Delivery Note & Checkout */}
            <div className="grid md:grid-cols-2 items-start gap-8 mt-8">
              <div className="w-full max-w-2xl mx-auto">
                <label
                  htmlFor="order-note"
                  className="md:text-base text-sm font-medium text-gray-700 mb-2 flex items-center gap-1"
                >
                  <NotebookPen size={19} /> Special instructions or delivery
                  notes
                </label>
                <textarea
                  id="order-note"
                  rows={3}
                  placeholder="e.g., Please deliver between 5 PM - 8 PM"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-sm shadow-sm focus:ring-teal-600 focus:border-teal-600 dark:text-black dark:bg-white resize-none"
                ></textarea>
              </div>

              <div className="bg-white rounded-lg dark:text-black w-full max-w-2xl mx-auto">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">
                      Sub-Total:
                    </span>
                    <span className="font-bold">
                      {country?.value === "BD" ? "BDT" : "USD"}{" "}
                      {totalSubtotalWithoutDiscount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">
                      Total Discount:
                    </span>
                    <span>
                      {country?.value === "BD" ? "BDT" : "USD"}{" "}
                      {totalDiscount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                    <span className="text-gray-900 font-bold">Total:</span>
                    <span className="text-teal-800 font-bold">
                      {country?.value === "BD" ? "BDT" : "USD"}{" "}
                      {cartTotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <Link
                    href="/checkout"
                    className="w-full py-3 px-4 rounded font-medium flex items-center justify-center bg-[#115e59] text-white hover:bg-teal-600"
                  >
                    Proceed to Checkout
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-16 flex flex-col justify-center items-center">
            <ShoppingCart color="teal" size={50} />
            <h2 className="md:text-3xl text-xl mt-4 font-bold mb-2 text-black">
              Your cart is Empty
            </h2>
            <p className="text-gray-600 mb-8">
              Must add items on the cart before you proceed to check out
            </p>
            <Link
              href="/"
              className="bg-teal-500 text-white px-6 py-2 text-sm rounded-md font-medium hover:bg-teal-600"
            >
              Return Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
