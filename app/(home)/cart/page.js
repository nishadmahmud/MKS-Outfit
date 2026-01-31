"use client"

import { useEffect, useState } from "react"
import useStore from "../../CustomHooks/useStore"
import Image from "next/image"
import Link from "next/link"
import toast from "react-hot-toast"
import { NotebookPen, ShoppingCart, Trash2 } from "lucide-react"
import CartSkeleton from "@/app/Components/CartSkeleton"
const noImg = "/no-image.jpg"
import { Minus } from "lucide-react"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"

const CartPage = () => {
  const {
    getCartItems,
    handleCartItemDelete: storeHandleDelete,
    country,
    setRefetch,
    handleIncQuantity,
    handleDncQuantity,
  } = useStore()

  const [cartItems, setCartItems] = useState([])
  const [note, setNote] = useState("")
  const [cartTotal, setCartTotal] = useState(0)
  const [totalDiscount, setTotalDiscount] = useState(0)
  const [totalSubtotalWithoutDiscount, setTotalSubtotalWithoutDiscount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [selectedItems, setSelectedItems] = useState(new Set())
  const [selectAll, setSelectAll] = useState(false)

  useEffect(() => {
    setCartItems(getCartItems())
    setLoading(false)
  }, [getCartItems])

  const getPriceByCountry = (item) => {
    return item?.retails_price ?? 0
  }

  useEffect(() => {
    const selectedCartItems = cartItems.filter((item) => selectedItems.has(item.cartItemId || item.id))

    const total = selectedCartItems.reduce((prev, item) => {
      const unitPrice = getPriceByCountry(item)
      return prev + unitPrice * item.quantity
    }, 0)

    const discount = selectedCartItems.reduce((prev, item) => {
      let discountAmount = 0
      if (country.value == "BD") {
        if (item.discount_type === "Fixed") {
          discountAmount = (item.discount || 0) * item.quantity
        } else if (item.discount_type === "Percentage") {
          discountAmount = ((item.retails_price * (item.discount || 0)) / 100) * item.quantity
        }
      } else {
        if (item.discount_type === "Fixed") {
          discountAmount = (item.intl_discount || 0) * item.quantity
        } else if (item.discount_type === "Percentage") {
          discountAmount = ((item.intl_retails_price * (item.intl_discount || 0)) / 100) * item.quantity
        }
      }
      return prev + discountAmount
    }, 0)

    const subtotal = selectedCartItems.reduce((acc, item) => {
      const price = Number(item?.retails_price)
      return acc + price * item.quantity
    }, 0)

    setCartTotal(total)
    setTotalDiscount(discount)
    setTotalSubtotalWithoutDiscount(subtotal)
  }, [cartItems, country, selectedItems])

  useEffect(() => {
    if (cartItems.length > 0) {
      const allSelected = cartItems.every((item) => selectedItems.has(item.cartItemId || item.id))
      setSelectAll(allSelected)
    }
  }, [selectedItems, cartItems])

  useEffect(() => {
    const savedNote = localStorage.getItem("cartAttachment")
    if (savedNote) setNote(savedNote)
  }, [])

  useEffect(() => {
    if (note) localStorage.setItem("cartAttachment", note)
    else localStorage.removeItem("cartAttachment")
  }, [note])

  const handleSelectItem = (itemId) => {
    const newSelectedItems = new Set(selectedItems)
    if (newSelectedItems.has(itemId)) {
      newSelectedItems.delete(itemId)
    } else {
      newSelectedItems.add(itemId)
    }
    setSelectedItems(newSelectedItems)
  }

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems(new Set())
    } else {
      const allItemIds = cartItems.map((item) => item.cartItemId || item.id)
      setSelectedItems(new Set(allItemIds))
    }
    setSelectAll(!selectAll)
  }

  const handleCartUpdate = () => {
    setRefetch(true)
    const updatedItems = getCartItems()
    setCartItems(updatedItems)
    const updatedItemIds = updatedItems.map((item) => item.cartItemId || item.id)
    setSelectedItems((prev) => new Set([...prev].filter((id) => updatedItemIds.includes(id))))
  }

  const handleCartItemDelete = (cartItemId) => {
    const updatedCart = getCartItems().filter((item) => item.cartItemId !== cartItemId)

    localStorage.setItem("cart", JSON.stringify(updatedCart))
    handleCartUpdate()

    toast.success("Item removed from cart")
  }

  const navigate = useRouter()

  const handleCheckout = () => {
    if (selectedItems.size === 0) {
      toast.error("Please select at least one item to checkout")
      return
    }

    // const selectedCartItems = cartItems.filter((item) => selectedItems.has(item.cartItemId || item.id))
    // localStorage.setItem("checkoutItems", JSON.stringify(selectedCartItems))
    // window.location.href = "/checkout"

    const selectedCartItems = cartItems.filter((item) =>
      selectedItems.has(item.cartItemId || item.id)
    )

    // ✅ Save selected items separately
    localStorage.setItem("checkoutItems", JSON.stringify(selectedCartItems))
    window.location.href = "/checkout"
    // navigate('/checkout')

  }

  if (loading) return <CartSkeleton />

  return (
    <div className="bg-white min-h-screen w-11/12 mx-auto pt-5 poppins">
      <div className="pb-8 pt-16">
        <h1 className="text-2xl md:text-3xl font-medium flex items-center gap-2 mb-6 dark:text-gray-900">
          <ShoppingCart size={30} /> Shopping Cart
        </h1>

        {cartItems.length > 0 ? (
          <div className="rounded-md">
            <div className="overflow-x-auto rounded-md">
              <table className="w-full border-collapse rounded-md">
                <thead>
                  <tr className="bg-gray-50 dark:text-black rounded-t-lg border">
                    <th className="py-4 px-4 text-left font-semibold poppins">
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAll}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </th>
                    <th className="py-4 px-4 text-left font-semibold poppins">Image</th>
                    <th className="py-4 px-4 text-left font-semibold poppins">Product Name</th>
                    <th className="py-4 px-4 text-left font-semibold poppins">Quantity</th>
                    <th className="py-4 px-4 text-left font-semibold poppins">Size</th>
                    <th className="py-4 px-4 text-right font-semibold poppins">Unit Price</th>
                    <th className="py-4 px-4 text-right font-semibold poppins">Total</th>
                    <th className="py-4 px-4 text-center font-semibold"></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id} className="border dark:text-black">
                      <td className="py-4 px-4">
                        <input
                          type="checkbox"
                          checked={selectedItems.has(item.cartItemId || item.id)}
                          onChange={() => handleSelectItem(item.cartItemId || item.id)}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                        />
                      </td>
                      <td className="py-4 px-4">
                        <div className="w-20 h-20 relative rounded-md">
                          {item?.images?.[0] ? (
                            <Image
                              src={item.images[0] || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-contain rounded-md"
                            />
                          ) : item?.image_path ? (
                            <Image
                              src={item.image_path || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-contain rounded-md"
                            />
                          ) : (
                            <Image
                              src={noImg || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-contain rounded-md"
                            />
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4 font-medium">{item.name}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-center border rounded-full w-fit">
                          <button
                            onClick={() =>
                              item.quantity > 0 && handleDncQuantity(item?.id, item.quantity, item.selectedSize)
                            }
                            className="w-7 h-7 flex items-center rounded-full justify-center bg-gray-100 dark:text-black"
                          >
                            <Minus size={11}></Minus>
                          </button>
                          <input
                            type="number"
                            value={item.quantity}
                            min={1}
                            readOnly
                            className="w-8 h-8 ml-3 text-sm flex justify-center items-center text-center border-gray-300 dark:bg-white dark:text-black"
                          />
                          <button
                            onClick={() => handleIncQuantity(item?.id, item.quantity, item.selectedSize)}
                            className="w-7 h-7 rounded-full flex items-center justify-center bg-gray-100 dark:text-black"
                          >
                            <Plus size={10}></Plus>
                          </button>
                        </div>
                      </td>
                      <td className="py-4 px-4 font-medium">{item.selectedSize || "N/A"}</td>
                      <td className="py-4 px-4 text-right">{getPriceByCountry(item).toLocaleString()}</td>
                      <td className="py-4 px-4 text-right font-medium">
                        {(getPriceByCountry(item) * item.quantity).toLocaleString()}
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

            <div className="grid md:grid-cols-2 items-start gap-8 mt-8">
              <div className="w-full max-w-2xl mx-auto mt-2 space-y-2">
                <label
                  htmlFor="order-note"
                  className="md:text-base text-sm font-medium text-gray-700 mb-2 flex items-center gap-1"
                >
                  <NotebookPen size={19} /> Special instructions or delivery notes
                </label>
                <textarea
                  id="order-note"
                  rows={5}
                  placeholder="e.g., Please deliver between 5 PM - 8 PM"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 shadow-sm focus:ring-gray-600 focus:border-gray-600 dark:text-black dark:bg-white rounded-lg resize-none"
                ></textarea>
              </div>

              <div className="bg-white rounded-lg dark:text-black w-full max-w-2xl mx-auto">
                <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800 font-medium">
                    {selectedItems.size} of {cartItems.length} items selected for checkout
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Sub-Total:</span>
                    <span className="font-semibold">৳{totalSubtotalWithoutDiscount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Total Discount:</span>
                    <span className="text-red-500">
                      -৳
                      {totalDiscount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                    <span className="text-gray-950 font-bold text-lg">Total:</span>
                    <span className="text-gray-900 font-bold text-lg">৳{cartTotal.toLocaleString()}</span>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    onClick={handleCheckout}
                    disabled={selectedItems.size === 0}
                    className={`w-full py-3 px-4 rounded font-medium flex items-center justify-center transition duration-300 ease-in-out ${selectedItems.size === 0
                        ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                        : "bg-[#1a1a1a] text-white hover:bg-gray-900"
                      }`}
                  >
                    Proceed to Checkout ({selectedItems.size} items)
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 flex flex-col justify-center items-center">
            <ShoppingCart color="black" size={50} />
            <h2 className="md:text-3xl text-xl mt-4 font-bold mb-2 text-black">Your cart is Empty</h2>
            <p className="text-gray-600 mb-8">Must add items on the cart before you proceed to check out</p>
            <Link
              href="/"
              className="bg-gray-800 text-white px-6 py-2 text-sm rounded-md font-medium hover:bg-gray-900"
            >
              Return Home
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default CartPage
