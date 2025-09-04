"use client"

import { useState } from "react"
import Link from "next/link"
import { CheckCircle, Copy, ShoppingBag, Truck, Calendar, CreditCard } from "lucide-react"
import { useParams, useSearchParams } from "next/navigation"

export default function Page() {
  const [copied, setCopied] = useState(false)
  const [showToast, setShowToast] = useState(false)
 const { tran_id } = useParams(); 
const searchParams = useSearchParams();
const payMode = searchParams.get('pay_mode');



  const copyToClipboard = () => {
    navigator.clipboard.writeText(tran_id)
    setCopied(true)
    setShowToast(true)
    setTimeout(() => {
      setCopied(false)
      setShowToast(false)
    }, 2000)
  }

  return (
    <div className="md:pt-20 pt-16 bg-gradient-to-br border from-teal-50 via-white to-emerald-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {showToast && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
            <div className="bg-gray-900 text-white px-4 py-2 rounded-lg border animate-in slide-in-from-top-2 duration-300">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span className="text-sm font-medium">Copied!</span>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden animate-in zoom-in-95 duration-500">
          <div className="text-center p-6 pb-4 bg-gradient-to-b from-emerald-50 to-white">
            <div className="relative mb-3">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 shadow-lg">
                <CheckCircle className="h-9 w-9 text-white" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-16 w-16 rounded-full border-2 border-emerald-200 animate-ping"></div>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Payment Successful!</h1>
            <p className="text-gray-600 text-sm">Your order has been confirmed</p>
          </div>

          <div className="px-6 pb-4">
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Transaction ID</p>
                  <p className="font-mono text-sm font-bold text-gray-900 mt-1">{tran_id}</p>
                </div>
                <button
                  className={`h-8 w-8 flex items-center justify-center rounded-lg transition-all duration-200 ${
                    copied
                      ? "bg-emerald-100 text-emerald-600"
                      : "bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700 shadow-sm"
                  }`}
                  onClick={copyToClipboard}
                >
                  <Copy className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>

          <div className="px-6 pb-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-blue-50 rounded-lg p-3 text-center">
                <Calendar className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                <p className="text-xs font-medium text-gray-900">Order Date</p>
                <p className="text-xs text-gray-600 mt-1">
                  {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </p>
              </div>
              <div className="bg-purple-50 rounded-lg p-3 text-center">
                <CreditCard className="h-5 w-5 text-purple-600 mx-auto mb-1" />
                <p className="text-xs font-medium text-gray-900">Payment</p>
                <p className="text-xs text-gray-600 mt-1">{payMode} Payment</p>
              </div>
            </div>
          </div>

          <div className="px-6 pb-4">
            <div className="flex items-center justify-center">
              <span className="inline-flex items-center rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 border border-emerald-200">
                <div className="h-2 w-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></div>
                Order Confirmed
              </span>
            </div>
          </div>

          <div className="p-6 pt-2 space-y-3">
            <Link
              href="/order-tracking"
              className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white py-3 px-4 rounded-xl font-semibold flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Truck className="mr-2 h-4 w-4" />
              Track Your Order
            </Link>

            <Link
              href="/"
              className="w-full bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 py-3 px-4 rounded-xl font-semibold flex items-center justify-center transition-all duration-200"
            >
              <ShoppingBag className="mr-2 h-4 w-4" />
              Continue Shopping
            </Link>
          </div>

          <div className="px-6 pb-6 text-center">
            <p className="text-xs text-gray-500">
              Sms confirmation sent •
              <Link href="tel:+8801970085954" className="text-teal-600 hover:text-teal-700 font-medium ml-1">
                Need help?
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
