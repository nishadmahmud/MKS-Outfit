"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import {
  ChevronDown,
  ChevronUp,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  Copy,
} from "lucide-react";

const MyOrders = () => {
  const tabs = [
    { type: "1", label: "Order Processing", icon: <Clock size={16} /> },
    { type: "2", label: "Order Completed", icon: <CheckCircle size={16} /> },
    { type: "3", label: "Delivery Processing", icon: <Truck size={16} /> },
    { type: "4", label: "Delivery Completed", icon: <Package size={16} /> },
    { type: "5", label: "Delivery Canceled", icon: <XCircle size={16} /> },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].type);
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expandedOrders, setExpandedOrders] = useState({});
  const [copied, setCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Get user data from localStorage
  const userData =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || '{"id": null}')
      : { id: null };
  const customer_id = userData?.id;

  const toggleOrderExpand = (orderId) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy");
    } catch (e) {
      return dateString;
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      1: { color: "bg-blue-100 text-blue-800", label: "Processing" },
      2: { color: "bg-green-100 text-green-800", label: "Completed" },
      3: { color: "bg-yellow-100 text-yellow-800", label: "Delivering" },
      4: { color: "bg-purple-100 text-purple-800", label: "Delivered" },
      5: { color: "bg-red-100 text-red-800", label: "Canceled" },
    };

    return (
      statusMap[status] || {
        color: "bg-gray-100 text-gray-800",
        label: "Unknown",
      }
    );
  };

  useEffect(() => {
    const fetchOrders = async () => {
      if (!customer_id) return;

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://www.outletexpense.xyz/api/customer-order-list`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              type: activeTab,
              customer_id: customer_id,
              limit: "10",
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();

        // Filter orders based on tran_status matching activeTab
        const filteredOrders = data?.data?.data?.filter((order) => {
          return String(order.tran_status).trim() === String(activeTab).trim();
        });

        setOrderData(filteredOrders);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [activeTab, customer_id]);

  const copyToClipboard = (invoiceId) => {
    navigator.clipboard.writeText(invoiceId);
    setCopied(true);
    setShowToast(true);
    setTimeout(() => {
      setCopied(false);
      setShowToast(false);
    }, 2000);
  };

  return (
    <div className="px-4 md:px-10">
      {/* Toast notification */}
      {showToast && (
        <div className="fixed inset-0 flex items-start justify-center z-50 pointer-events-none mt-10">
          <div className="bg-black text-white px-4 py-2 rounded-md shadow-lg animate-fade-in-down">
            ✔️ Copied to clipboard!
          </div>
        </div>
      )}
      <h2 className="text-xl font-bold my-6 text-[#115e59] text-center md:text-left">
        My Orders
      </h2>
      <div className="bg-white text-black p-4 md:p-6 shadow-md rounded-lg">
        {/* Tabs Navigation */}
        <div className="flex justify-start space-x-1 md:space-x-2 border-b border-gray-300 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.type}
              onClick={() => setActiveTab(tab.type)}
              className={`relative px-2 md:px-3 py-2 text-xs md:text-sm font-medium transition-colors duration-300 whitespace-nowrap flex items-center gap-1
                ${activeTab === tab.type ? "text-[#115e59]" : "text-gray-500"}`}
            >
              {tab.icon}
              <span className="hidden md:inline">{tab.label}</span>
              <span className="md:hidden">{tab.label.split(" ")[0]}</span>
              {activeTab === tab.type && (
                <motion.div
                  layoutId="underline"
                  className="absolute left-0 right-0 bottom-0 h-1 bg-[#115e59]"
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-4">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-center text-gray-500 py-8"
              >
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#115e59]"></div>
                </div>
                <p className="mt-2">Loading your orders...</p>
              </motion.div>
            ) : error ? (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-center text-red-500 py-8"
              >
                <p>{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-2 px-4 py-2 bg-gray-100 rounded-md text-gray-700 text-sm"
                >
                  Try Again
                </button>
              </motion.div>
            ) : (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {orderData && orderData.length > 0 ? (
                  <ul className="space-y-4">
                    {orderData.map((order) => (
                      <li
                        key={order.id}
                        className="border rounded-lg shadow-sm overflow-hidden"
                      >
                        {/* Order Header */}
                        <div className="bg-gray-50 p-4 flex flex-col md:flex-row md:justify-between md:items-center gap-2 border-b">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold flex justify-center">
                                {order.invoice_id}
                                <button
                                  className="h-6 w-6 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors"
                                  onClick={() =>
                                    copyToClipboard(order.invoice_id)
                                  }
                                >
                                  <Copy className="h-3.5 w-3.5" />
                                  <span className="sr-only">
                                    Copy transaction ID
                                  </span>
                                </button>
                              </h3>
                              <span
                                className={`text-xs px-2 py-0.5 rounded-full ${
                                  getStatusBadge(order.tran_status).color
                                }`}
                              >
                                {getStatusBadge(order.tran_status).label}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500">
                              Ordered on {formatDate(order.created_at)}
                            </p>
                          </div>

                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="text-sm font-medium">
                                Total Amount
                              </p>
                              <p className="text-lg font-bold text-[#115e59]">
                                ৳{order.sub_total}
                              </p>
                            </div>
                            <button
                              onClick={() => toggleOrderExpand(order.id)}
                              className="p-2 rounded-full hover:bg-gray-200"
                            >
                              {expandedOrders[order.id] ? (
                                <ChevronUp size={20} />
                              ) : (
                                <ChevronDown size={20} />
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Order Details (Expandable) */}
                        {expandedOrders[order.id] && (
                          <div className="p-4">
                            {/* Delivery Info */}
                            <div className="mb-4 p-3 bg-gray-50 rounded-md">
                              <h4 className="font-medium text-sm mb-2">
                                Delivery Information
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                <div>
                                  <p className="text-gray-500">Recipient</p>
                                  <p>{order.delivery_customer_name}</p>
                                </div>
                                <div>
                                  <p className="text-gray-500">Phone</p>
                                  <p>{order.delivery_customer_phone}</p>
                                </div>
                                <div className="md:col-span-2">
                                  <p className="text-gray-500">Address</p>
                                  <p>{order.delivery_customer_address}</p>
                                </div>
                                <div>
                                  <p className="text-gray-500">
                                    Delivery Method
                                  </p>
                                  <p>
                                    {order.delivery_method?.type_name ||
                                      "Standard Delivery"}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-gray-500">Delivery Fee</p>
                                  <p>৳{order.delivery_fee}</p>
                                </div>
                              </div>
                            </div>

                            {/* Product List */}
                            <h4 className="font-medium text-sm mb-2">
                              Order Items
                            </h4>
                            {/* <ul className="divide-y">
                              {order.sales_details &&
                                order.sales_details.map((item) => (
                                  <li
                                    key={item.id}
                                    className="py-3 flex items-center gap-3"
                                  >
                                    <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                                      <Image
                                        width={64}
                                        height={64}
                                        src={
                                          item.product_info?.image_path ||
                                          "/placeholder.svg?height=64&width=64"
                                        }
                                        alt={
                                          item.product_info?.name || "Product"
                                        }
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                    <div className="flex-grow">
                                      <h5 className="font-medium">
                                        {item.product_info?.name}
                                      </h5>
                                      <div className="flex justify-between items-center mt-1">
                                        <p className="text-sm text-gray-500">
                                          Qty: {item.qty}
                                        </p>
                                        <p className="font-semibold">
                                          ৳{item.price}
                                        </p>
                                      </div>
                                    </div>
                                  </li>
                                ))}
                            </ul> */}

                            <ul className="divide-y">
                              {order.sales_details &&
                                order.sales_details.map((item) => {
                                  const price = Number(item.price);
                                  const qty = Number(item.qty);

                                  // Access discount info inside product_info
                                  const discount = Number(
                                    item.product_info?.discount || 0
                                  );
                                  const discountType =
                                    item.product_info?.discount_type || null; // "Fixed" or "Percentage"

                                  let discountAmount = 0;
                                  if (
                                    discount &&
                                    discountType === "Percentage"
                                  ) {
                                    discountAmount = (price * discount) / 100;
                                  } else if (
                                    discount &&
                                    discountType === "Fixed"
                                  ) {
                                    discountAmount = discount;
                                  }

                                  const discountedPrice =
                                    price - discountAmount;

                                  return (
                                    <li
                                      key={item.id}
                                      className="py-3 flex items-center gap-3"
                                    >
                                      <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                                        <Image
                                          width={64}
                                          height={64}
                                          src={
                                            item.product_info?.image_path ||
                                            "/placeholder.svg?height=64&width=64"
                                          }
                                          alt={
                                            item.product_info?.name || "Product"
                                          }
                                          className="w-full h-full object-cover"
                                        />
                                      </div>
                                      <div className="flex-grow">
                                        <h5 className="font-medium">
                                          {item.product_info?.name}
                                        </h5>
                                        <div className="flex justify-between items-center mt-1">
                                          <p className="text-sm text-gray-500">
                                            Qty: {qty}
                                          </p>
                                          <div className="text-right">
                                            {discountAmount > 0 ? (
                                              <>
                                                <p className="text-sm text-gray-400 line-through">
                                                  ৳{(price * qty).toFixed(2)}
                                                </p>
                                                <p className="text-sm text-red-500">
                                                  -{" "}
                                                  {discountType === "Percentage"
                                                    ? `${discount}%`
                                                    : `৳${discountAmount.toFixed(
                                                        2
                                                      )}`}
                                                </p>
                                                <p className="font-semibold">
                                                  ৳
                                                  {(
                                                    discountedPrice * qty
                                                  ).toFixed(2)}
                                                </p>
                                              </>
                                            ) : (
                                              <p className="font-semibold">
                                                ৳{(price * qty).toFixed(2)}
                                              </p>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </li>
                                  );
                                })}
                            </ul>

                            {/* Order Summary */}
                            <div className="mt-4 pt-4 border-t">
                              <div className="flex justify-between text-sm">
                                <span>
                                  Subtotal{" "}
                                  {/* <span className="text-xs">
                                    (Subtotal after discount if any)
                                  </span> */}
                                </span>{" "}
                                <span>
                                  ৳{order.sub_total - order.delivery_fee}
                                </span>
                              </div>
                              <div className="flex justify-between text-sm mt-1">
                                <span>Delivery Fee</span>
                                <span>৳{order.delivery_fee}</span>
                              </div>
                              {/* {order.discount > 0 && (
                                <div className="flex justify-between text-sm mt-1 text-green-600">
                                  <span>Discount</span>
                                  <span>-৳{order.discount}</span>
                                </div>
                              )} */}
                              <div className="flex justify-between font-bold mt-2 pt-2 border-t">
                                <span>Total</span>
                                <span>
                                  ৳
                                  {
                                    Number.parseFloat(order.sub_total).toFixed(
                                      2
                                    )
                                    // +
                                    //   Number.parseFloat(order.delivery_fee) -
                                    //   Number.parseFloat(order.discount)
                                  }
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <Package size={48} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500">
                      No orders found in this category.
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      Orders will appear here once you make a purchase.
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
