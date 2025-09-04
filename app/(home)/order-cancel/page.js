"use client"


import { useState } from "react"
import { AlertCircle, CheckCircle2 } from "lucide-react"

// Mock order data - in a real app, this would come from your database
const orderData = {
  id: "ORD-12345",
  date: "March 2, 2025",
  total: "$129.99",
  status: "Processing",
  items: [
    { id: 1, name: "Wireless Headphones", price: "$89.99", quantity: 1 },
    { id: 2, name: "Phone Case", price: "$19.99", quantity: 2 },
  ],
}

export default function OrderCancelPage() {
  const [reason, setReason] = useState("")
  const [additionalInfo, setAdditionalInfo] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!reason) {
      setError("Please select a reason for cancellation")
      return
    }

    setError("")
    setIsSubmitting(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSubmitted(true)
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto pt-20">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-2xl font-semibold">Order Cancellation Confirmed</h2>
            <p className="text-black">Your cancellation request has been received</p>
          </div>
          <div className="p-6">
            <div className="text-black border border-green-200 rounded-md p-4 flex items-start">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-green-800 font-medium">Success!</h3>
                <p className="text-green-700">
                  Your order #{orderData.id} has been successfully cancelled. You will receive a confirmation email
                  shortly.
                </p>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="font-medium text-lg">What happens next?</h3>
              <ul className="mt-2 space-y-2 text-sm text-black">
                <li>• If your payment was already processed, a refund will be issued within 5-7 business days</li>
                <li>• You&apos;ll receive an email confirmation of your cancellation</li>
                <li>• If you have any questions, please contact our customer support</li>
              </ul>
            </div>
          </div>
          <div className="p-6 bg-gray-50 border-t">
            <button
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
              onClick={() => (window.location.href = "/")}
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto pt-40">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-semibold text-black">Cancel Order</h2>
          <p className="text-black">Please review your order details and provide a reason for cancellation</p>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            {/* Order Summary */}
            <div>
              <h3 className="font-medium text-lg mb-2 text-black">Order Summary</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-2 text-sm text-black">
                  <div className="text-black">Order Number:</div>
                  <div className="font-medium">{orderData.id}</div>
                  <div className="text-black">Order Date:</div>
                  <div>{orderData.date}</div>
                  <div className="text-black">Status:</div>
                  <div>{orderData.status}</div>
                  <div className="text-black">Total:</div>
                  <div className="font-medium">{orderData.total}</div>
                </div>

                <div className="my-3 border-t border-gray-200"></div>

                <div className="space-y-2">
                  <div className="text-sm font-medium text-black">Items:</div>
                  {orderData.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm text-black">
                      <span>
                        {item.name} x{item.quantity}
                      </span>
                      <span>{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Cancellation Form */}
            <form onSubmit={handleSubmit}>
              {error && (
                <div className="mb-4 bg-red-50 border border-red-200 text-red-700 p-4 rounded-md flex items-start">
                  <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">Error</h3>
                    <p>{error}</p>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label htmlFor="reason" className="block text-base font-medium mb-2 text-black">
                    Reason for cancellation <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="changed_mind"
                        name="reason"
                        value="changed_mind"
                        checked={reason === "changed_mind"}
                        onChange={() => setReason("changed_mind")}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 dark:bg-white border-gray-300 rounded"
                      />
                      <label htmlFor="changed_mind" className="ml-2 text-black">
                        Changed my mind
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="found_better_price"
                        name="reason"
                        value="found_better_price"
                        checked={reason === "found_better_price"}
                        onChange={() => setReason("found_better_price")}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="found_better_price" className="ml-2 text-black">
                        Found a better price elsewhere
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="delivery_too_long"
                        name="reason"
                        value="delivery_too_long"
                        checked={reason === "delivery_too_long"}
                        onChange={() => setReason("delivery_too_long")}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="delivery_too_long" className="ml-2 text-black">
                        Delivery time is too long
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="ordered_by_mistake"
                        name="reason"
                        value="ordered_by_mistake"
                        checked={reason === "ordered_by_mistake"}
                        onChange={() => setReason("ordered_by_mistake")}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="ordered_by_mistake" className="ml-2 text-black">
                        Ordered by mistake
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="other"
                        name="reason"
                        value="other"
                        checked={reason === "other"}
                        onChange={() => setReason("other")}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="other" className="ml-2 text-black">
                        Other reason
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="additional-info" className="block text-base font-medium mb-2 text-black">
                    Additional information (optional)
                  </label>
                  <textarea
                    id="additional-info"
                    placeholder="Please provide any additional details about your cancellation..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 dark:bg-white focus:ring-blue-500 focus:border-blue-500"
                    rows={4}
                    value={additionalInfo}
                    onChange={(e) => setAdditionalInfo(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="p-6 bg-gray-50 border-t flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            className="w-full sm:w-auto py-2 px-4 border border-gray-300 bg-white text-black rounded-md hover:bg-gray-50 font-medium transition-colors"
            onClick={() => (window.location.href = "/orders")}
          >
            Back to Orders
          </button>
          <button
            type="button"
            className="w-full sm:w-auto py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Cancel Order"}
          </button>
        </div>
      </div>
    </div>
  )
}

