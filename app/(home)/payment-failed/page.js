"use client"

import { useState } from "react"
import Link from "next/link"
import { AlertCircle, RefreshCcw, LifeBuoy } from "lucide-react"

export default function PaymentFail() {
  const [isRetrying, setIsRetrying] = useState(false)

  const handleRetry = () => {
    setIsRetrying(true)
    // Simulate a retry attempt
    setTimeout(() => {
      setIsRetrying(false)
      // Here you would typically redirect to the payment page or show a success message
      // For this example, we'll just reset the button state
    }, 2000)
  }

  return (
    <div className="container max-w-md mx-auto pb-12 pt-20 px-4 lg:pt-40">
      <div className="w-full bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
        <div className="text-center p-6 pb-4">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <AlertCircle className="h-10 w-10 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Payment Failed</h2>
          <p className="text-gray-500 mt-1">We&apos;re sorry, but your payment could not be processed.</p>
        </div>

        <div className="px-6 space-y-4">
          <div className="rounded-lg bg-red-50 p-4 border border-red-100">
            <div className="text-sm text-red-700">
              <p className="font-medium">Error details:</p>
              <p>Your transaction was declined. Please check your card details or try a different payment method.</p>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-900">What you can do:</h3>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              <li>Check your card details and try again</li>
              <li>Use a different payment method</li>
              <li>Ensure you have sufficient funds</li>
              <li>Contact your bank if the issue persists</li>
            </ul>
          </div>
        </div>

        <div className="p-6 flex flex-col gap-2">
          <button
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium flex items-center justify-center transition-colors ${isRetrying ? "opacity-75 cursor-not-allowed" : ""}`}
            onClick={handleRetry}
            disabled={isRetrying}
          >
            <RefreshCcw className="mr-2 h-4 w-4" />
            {isRetrying ? "Retrying..." : "Retry Payment"}
          </button>
          <Link
            href="/"
            className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 py-2 px-4 rounded-md font-medium flex items-center justify-center transition-colors"
          >
            {/* <LifeBuoy className="mr-2 h-4 w-4" /> */}
            Return Home
          </Link>
        </div>
      </div>
    </div>
  )
}

