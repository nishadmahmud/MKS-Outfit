"use client"
// import DeliveryForm from "@/app/Components/DeliveryForm";
import useStore from "@/app/CustomHooks/useStore"
import Image from "next/image"
import { useState, useEffect } from "react"
import { ShoppingCart, Package } from "lucide-react"
import dynamic from "next/dynamic"
import toast from "react-hot-toast"
import axios from "axios"

const DeliveryForm = dynamic(() => import("../../Components/DeliveryForm"), {
  ssr: false,
})

const CheckoutPage = () => {
  const { getCartItems, prices, country, setProductPrice, selectedSize } = useStore()

  const cartItems = getCartItems()
  const quantity = cartItems.reduce((acc, curr) => acc + curr.quantity, 0)

console.log(cartItems);
  const getPriceByCountry = (item) => {
    const productPrice = prices[item.id]

    if (country && country.value === "BD") {
      return productPrice?.basePrice || item?.retails_price || 0
    } else {
      return productPrice?.intl_retails_price || item?.intl_retails_price || 0;
    }
  }

 
  const Subtotal = cartItems.reduce((prev, curr) => {
    const basePrice = getPriceByCountry(curr)
    const priceAfterDiscount = country?.value === "BD" ? curr.discount
      ? curr.discount_type === "Fixed"
        ? basePrice - curr.discount
        : basePrice - (basePrice * curr.discount) / 100
      : basePrice 
      : curr.discount
      ? curr.discount_type === "Fixed"
        ? basePrice - curr.intl_discount
        : basePrice - (basePrice * curr.intl_discount) / 100
      : basePrice

    return prev + priceAfterDiscount * curr.quantity
  }, 0)

  const SubtotalWithoutDiscount = cartItems.reduce((prev, curr) => {
    const basePrice = getPriceByCountry(curr)
    return prev + basePrice * curr.quantity
  }, 0)

  const TotalDiscount = cartItems.reduce((prev, curr) => {
    if (!curr.discount) return prev

    const basePrice = getPriceByCountry(curr)
    const discountAmount = curr.discount_type === "Fixed" ? curr.discount : (basePrice * curr.discount) / 100

    return prev + discountAmount * curr.quantity
  }, 0)

  const [shippingFee, setShippingFee] = useState(70)
  const [couponCode, setCouponCode] = useState("")
  const [couponAmount, setCouponAmount] = useState("")
  const [loading, setLoading] = useState(false)

  const handleApply = async () => {
    if (!couponCode.trim()) {
      toast.error("Please enter a coupon code.")
      return
    }

    setLoading(true)

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API}/public/apply-coupon`, {
        coupon_name: couponCode,
        coupon_code: couponCode,
      })

      const data = response.data

      if (data?.success && data?.data?.amount) {
        setCouponAmount(data.data.amount)
        toast.success(data.message || "Coupon applied successfully!")
      } else {
        setCouponAmount(0)
        toast.error(data.message || "Invalid coupon code.")
      }
    } catch (error) {
      setCouponAmount(0)
      toast.error(error?.response?.data?.message || "Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const [selectedDonate, setSelectedDonate] = useState(null)
  const donations = ["Not now", 10, 20, 30, 50]

  // useEffect(() => {
  //   if (cartItems && cartItems.length > 0) {
  //     cartItems.forEach((item) => {
  //       if (item?.id && item?.retails_price) {
  //         setProductPrice(item.id, item?.retails_price, item?.wholesale_price || null)
  //       }
  //     })
  //   }
  // }, [cartItems, setProductPrice])

  console.log(cartItems);

  return (
    <div className="min-h-screen bg-gray-50 pt-14">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="w-full md:w-11/12 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            <div className="flex items-center space-x-2">
              <Package className="h-8 w-8 text-[#115e59]" />
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Checkout</h1>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <ShoppingCart className="h-4 w-4" />
              <span>{quantity} items</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
        <div className="grid lg:grid-cols-12 gap-4 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-7 order-last lg:order-first">
            <DeliveryForm
            country={country}
              selectedDonate={selectedDonate}
              setSelectedDonate={setSelectedDonate}
              donations={donations}
              shippingFee={shippingFee}
              setShippingFee={setShippingFee}
              cartItems={cartItems}
              cartTotal={Subtotal}
              couponCode={couponCode}
              couponAmount={couponAmount}
            />
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-5 mt-4 md:mt-8 lg:mt-0 order-first lg:order-last">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 sticky top-24">
              {cartItems.length > 0 ? (
                <>
                  {/* Header */}
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                      <ShoppingCart className="h-5 w-5 mr-2 text-[#115e59]" />
                      Order Summary
                    </h2>
                  </div>

                  {/* Cart Items */}
                  <div className="px-6 py-4 max-h-96 overflow-y-auto">
                    <div className="space-y-4">
                      {cartItems.map((item) => {
                        const itemPrice = getPriceByCountry(item)
                        return (
                          <div
                            key={item.id}
                            className="flex items-start space-x-4 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                          >
                            <div className="relative flex-shrink-0">
                              {item?.images?.length > 0 ? (
                                <Image
                                  height={80}
                                  width={80}
                                  alt="product"
                                  src={item.images[0] || "/placeholder.svg"}
                                  className="rounded-lg border border-gray-200 object-cover"
                                />
                              ) : item?.image_path ? (
                                <Image
                                  height={80}
                                  width={80}
                                  alt="product"
                                  src={item.image_path || "/placeholder.svg"}
                                  className="rounded-lg border border-gray-200 object-cover"
                                />
                              ) : (
                                <Image
                                  src="https://i.postimg.cc/ZnfKKrrw/Whats-App-Image-2025-02-05-at-14-10-04-beb2026f.jpg"
                                  height={80}
                                  width={80}
                                  loading="lazy"
                                  alt="mobile-phone"
                                  className="rounded-lg border border-gray-200 object-cover"
                                />
                              )}
                              <div className="absolute -top-2 -right-2 bg-[#115e59] text-white text-xs font-medium rounded-full h-6 w-6 flex items-center justify-center">
                                {item.quantity}
                              </div>
                            </div>

                            <div className="flex-1 min-w-0">
                              <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">{item.name}</h3>
                              <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-600">Qty: {item.quantity}</div>
                                <div className="text-sm text-gray-600">Size: {item.selectedSize || "N/A"}</div>
                                <div className="text-sm font-semibold text-gray-900">
                                  {country && country.value === "BD" ? "৳" : "$"}
                                  {itemPrice}
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Price Breakdown */}
                  <div className="px-6 py-4 border-t border-gray-200 space-y-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <input
                          onChange={(e) => setCouponCode(e.target.value)}
                          type="text"
                          placeholder="Enter coupon code"
                          className="flex-1 text-black dark:bg-white px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                        <button
                          disabled={loading}
                          onClick={handleApply}
                          type="submit"
                          className="px-4 py-2 bg-teal-600 text-white font-medium rounded-sm hover:bg-teal-700 transition"
                        >
                          {loading ? "Applying..." : "Apply"}
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal ({quantity} items)</span>
                      <span className="font-medium text-gray-900">
                        {country && country.value === "BD" ? "৳" : "$"}
                        {SubtotalWithoutDiscount.toFixed(2)}
                      </span>
                    </div>

                    {TotalDiscount > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Discount</span>
                        <span className="font-medium text-red-600">
                          -{country && country.value === "BD" ? "৳" : "$"}
                          {TotalDiscount.toFixed(2)}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Coupon Discount</span>
                      <span className="font-medium text-red-600">
                        -{country && country.value === "BD" ? "৳" : "$"}
                        {Number(couponAmount).toFixed(2)}
                      </span>
                    </div>

                    {selectedDonate && selectedDonate !== "Not now" && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Donation</span>
                        <span className="font-medium text-gray-900">
                          {country && country.value === "BD" ? "৳" : "$"}
                          {selectedDonate}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium text-gray-900">
                        {country && country.value === "BD" ? "৳" : "$"}
                        {shippingFee}
                      </span>
                    </div>

                    <div className="border-t border-gray-200 pt-3">
                      <div className="flex justify-between">
                        <span className="text-lg font-semibold text-gray-900">Total</span>
                        <span className="text-lg font-bold text-[#115e59]">
                          {country && country.value === "BD" ? "৳" : "$"}
                          {(
                            Number.parseInt(Subtotal) +
                            (selectedDonate === "Not now" ? 0 : Number(selectedDonate)) +
                            shippingFee -
                            couponAmount
                          ).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Security Badge */}
                  <div className="px-6 py-4 bg-gray-50 rounded-b-xl">
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2 text-black mt-2">
                        Our delivery partner:
                        <Image className="w-10" src="/pahtao.png" alt="pathao" width={500} height={500}></Image>
                        <Image className="w-10" src="/fedEx.png" alt="fedx" width={500} height={500}></Image>
                        <Image className="w-8" src="/dhl.png" alt="dhl" width={500} height={500}></Image>
                      </div>
                    </div>
                    <div className="flex justify-center items-center gap-1 text-black text-xs">
                      <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Secure checkout powered by SSL encryption</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="px-6 py-12 text-center">
                  <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
                  <p className="text-gray-600">Add some products to get started</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
