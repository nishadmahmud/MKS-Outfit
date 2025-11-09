"use client";

import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { TbTruckDelivery } from "react-icons/tb";
import { FcGoogle } from "react-icons/fc";
import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";
import { fetcher, userId } from "../(home)/page";
import Image from "next/image";
import Modal from "./Modal";
import PaymentMethodForm from "./PaymentMethodForm";
import {
  ShoppingBag,
  MapPin,
  CreditCard,
  Shield,
  Truck,
  CheckCircle,
  AlertCircle,
  Phone,
  Mail,
  User,
  Home,
  Building,
  HandHelping,
} from "lucide-react";
import PrizeModal from "./PrizeModal";
import { Dialog } from "@headlessui/react";
import { Wheel } from "react-custom-roulette";
import useStore from "../CustomHooks/useStore";
import { GiWorld } from "react-icons/gi";
import { getNames } from "country-list";

import FloatingLabelInput from "../shared/FloatingLabelInput";
import { Box } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { FaUser } from "react-icons/fa6";
import { NotebookText } from "lucide-react";
import { BookUser } from "lucide-react";

const prizeData = [
  {
    option: "10% off",
    image: {
      uri: "/ten.png",
      sizeMultiplier: 1,
      offsetX: 0,
      offsetY: 0,
      landscape: false,
    },
  },
  {
    option: "4 pc Solid Shirt",
    image: {
      uri: "/fourshirt.png",
      sizeMultiplier: 1,
      offsetX: 0,
      offsetY: 0,
      landscape: false,
    },
  },
  {
    option: "Try Again",
    image: {
      uri: "/tryAgain.png",
      sizeMultiplier: 1,
      offsetX: 0,
      offsetY: 0,
      landscape: false,
    },
  },
  {
    option: "50% off",
    image: {
      uri: "/fifty.png",
      sizeMultiplier: 1,
      offsetX: 0,
      offsetY: 0,
      landscape: false,
    },
  },
  {
    option: "One pis Stripe T-shirt",
    image: {
      uri: "/shirtPrize.png",
      sizeMultiplier: 1,
      offsetX: 0,
      offsetY: 0,
      landscape: false,
    },
  },
  {
    option: "Solid Shirt",
    image: {
      uri: "/solid-shirt.png",
      sizeMultiplier: 1,
      offsetX: 0,
      offsetY: 0,
      landscape: false,
    },
  },
];

const DeliveryForm = ({
  country,
  setShippingFee,
  couponAmount,
  couponCode,
  selectedDonate,
  setSelectedDonate,
  donations,
}) => {
  const { data: paymentMethods, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API}/payment-type-list/${userId}`,
    fetcher
  );

  const { setToken, googleLogin, setUserInfo, getCartItems, removeCheckedOutItems } = useStore();

  // State declarations
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [payment, setPayment] = useState("ssl");
  const [isCod, setIsCod] = useState(true);
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);
  const [location, setLocation] = useState("inside");
  const [couponValue, setCouponValue] = useState(couponAmount);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [selectedMethodId, setSelectedMethodId] = useState(null);

  // Spinning wheel state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [wonPrize, setWonPrize] = useState("");
  const [showWheelModal, setShowWheelModal] = useState(false);
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [result, setResult] = useState("");
  const [prizeName, setPrizeName] = useState("");
  const [invoiceId, setInvoiceId] = useState(null);
  const [spinCount, setSpinCount] = useState(0);
  const [customerId, setCustomerId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const intendedUrl = searchParams.get("redirect");
  const [insufficientProducts, setInsufficientProducts] = useState([]);
  // Use refs to prevent recreating objects
  const userDataRef = useRef(null);

  const userData = userDataRef.current;
  const date = useMemo(() => new Date().toISOString(), []);
  const deliveryNote = useMemo(
    () => localStorage.getItem("cartAttachment"),
    []
  );

  // Memoize user name parsing
  const { firstName, lastName } = useMemo(() => {
    if (!userData?.name) return { firstName: "", lastName: "" };
    const parts = userData.name.trim().split(/\s+/);
    return {
      firstName: parts[0] || "",
      lastName: parts.length > 1 ? parts[parts.length - 1] : "",
    };
  }, [userData?.name]);

  // Memoize shipping fee calculation
  const shippingFee = useMemo(
    () => (location === "inside" ? 70 : 130),
    [location]
  );

  useEffect(() => {
    setShippingFee(shippingFee);
  }, [shippingFee, setShippingFee]);

  useEffect(() => {
    setCouponValue(couponAmount);
  }, [couponAmount]);

  const [formData, setFormData] = useState({
    country: "Bangladesh",
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    postalCode: "",
    phone: "",
    billCountry: "",
    billFirstName: "",
    delivery_note: "",
    billLastName: "",
    billAddress: "",
    address2: "",
    billApartment: "",
    billCity: "",
    billPostalCode: "",
    billPhone: "",
  });

  useEffect(() => {
    const items = getCartItems();
    if (items.length) {
      setCartItems(items);
      setLoading(false);

      
      const total = items?.reduce(
  (prev, curr) => prev + (curr?.retails_price || 0),
  0
);
// console.log(total);
      setCartTotal(total);
      setOrderSchema((prev) => ({
        ...prev,
        sub_total: cartTotal,
      }));
    }
  }, [getCartItems]);


  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("Bangladesh");

  useEffect(() => {
    const countryNames = getNames(); 
    setCountries(countryNames);
  }, []);

  // Create order schema - memoized to prevent constant recreation
  const orderSchema = useMemo(() => {
    return {
      pay_mode: payment,
      paid_amount: 0,
      sub_total: Number(cartTotal) + shippingFee,
      vat: 0,
      tax: 0,
      discount: couponValue,
      coupon_code: couponCode,
      product: cartItems.map((item) => ({
        product_id: item.id,
        qty: item.quantity,
        price: item.retails_price,
        mode: 1,
        size: 1,
        sales_id: 3,
        imei_id: item?.imeis ? item?.imeis[0]?.id : null,
        product_variant_id: item.product_variant_id,
      })),
      delivery_method_id: 1,
      delivery_note: formData?.delivery_note || deliveryNote,
      donation_amount:
        selectedDonate === "Not now" ? 0 : Number(selectedDonate),
      email: formData.email || userData?.email || "N/A",
      delivery_info_id: 1,
      delivery_customer_name:
        (formData.firstName || firstName) +
        " " +
        (formData.lastName || lastName),
      delivery_customer_address: formData.address || formData.address2,
      delivery_customer_phone: formData?.phone || "N/A",
      delivery_fee: shippingFee,
      payment_method:
        paymentMethods?.data?.data?.map((item) => ({
          payment_type_category_id: item.payment_type_category[0]?.id,
          payment_type_id: item.payment_type_category[0]?.payment_type_id,
          payment_amount: 0,
        })) || [],
      variants: [],
      imeis: cartItems.map((item) => {
        if (item?.imeis && item?.imeis.length > 0) {
          return Number.parseInt(item?.imeis[0].imei);
        }
        return null;
      }),
      created_at: date,
      customer_id: customerId,
      customer_name: `${formData.firstName || firstName} ${
        formData.lastName || lastName
      }`,
      customer_phone: formData?.phone,
      sales_id: userId,
      user_id: userId,
      wholeseller_id: 1,
      status: 3,
    };
  }, [
    payment,
    cartTotal,
    shippingFee,
    couponValue,
    couponCode,
    cartItems,
    deliveryNote,
    selectedDonate,
    formData.email,
    formData.firstName,
    formData.lastName,
    formData.address,
    formData.address2,
    formData.delivery_note,
    formData.phone,
    userData?.email,
    firstName,
    lastName,
    paymentMethods?.data?.data,
    date,
    customerId,
  ]);

  const [orderSchemaState, setOrderSchema] = useState(orderSchema);

  useEffect(() => {
    setOrderSchema(orderSchema);
  }, [orderSchema]);

  // Event handlers - all memoized
  // const handleGoogleLogin = useCallback(async () => {
  //   try {
  //     const response = await googleLogin();
  //     const result = response.user;
  //     try {
  //       await axios.post(
  //         `${process.env.NEXT_PUBLIC_API}/customer-registration`,
  //         {
  //           name: result.displayName,
  //           phone: result.phoneNumber,
  //           email: result.email,
  //           password: result.uid,
  //           user_id: String(userId),
  //         },
  //         { headers: { "Content-Type": "application/json" } }
  //       );
  //     } catch (error) {
  //       console.warn(error.message);
  //     }

  //     const loginResponse = await axios.post(
  //       `${process.env.NEXT_PUBLIC_API}/customer-login`,
  //       { email: result.email, password: result.uid, user_id: String(userId) },
  //       { headers: { "Content-Type": "application/json" } }
  //     );

  //     setCustomerId(loginResponse?.data?.customer?.id);
  //     setReload(true);
  //     if (intendedUrl) {
  //       router.push(intendedUrl);
  //     }

  //     setToken(loginResponse.data.token);
  //     toast.success("Login Successful!");
  //     setUserInfo(loginResponse?.data?.customer);
  //     setOrderSchema((prev) => ({
  //       ...prev,
  //       customer_name: result.displayName,
  //       customer_phone: result.phoneNumber,
  //       customer_email: result.email,
  //     }));

  //     setFormData({
  //       ...formData,
  //       firstName: result.displayName,
  //       phone: result.phoneNumber,
  //       email: result.email,
  //     });
  //     localStorage.setItem(
  //       "user",
  //       JSON.stringify(loginResponse?.data?.customer)
  //     );
  //     localStorage.setItem("token", loginResponse?.data?.token);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [googleLogin, intendedUrl, router, setToken, setUserInfo]);

  const handleChange = useCallback((e) => {
    setSelectedCountry(e.target.value);
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handlePayment = useCallback((e) => {
    setPayment(e.target.value);
  }, []);

  const handleBillingChange = useCallback((e) => {
    setBillingSameAsShipping(e.target.value === "same");
  }, []);

  const handleClose = useCallback(() => setShowPaymentModal(false), []);

  const handleOrderComplete = useCallback(
    (e) => {
      e.preventDefault();

      if (cartItems.length === 0) {
        alert("Add some products to the cart first.");
        router.push("/");
        return;
      }

      setLoading(true); // start loading

      const finalOrderSchema = {
        ...orderSchemaState,
        donation_amount:
          selectedDonate === "Not now" ? 0 : Number(selectedDonate),
      };

      console.log(finalOrderSchema);
      // return;
      axios
        .post(
          `${process.env.NEXT_PUBLIC_API}/public/ecommerce-sales-with-check`,
          finalOrderSchema
        )
        .then((res) => {
          if (res.status === 200 && res?.data?.success === true) {
            const _invoiceId = res?.data?.data?.invoice_id;
            setInvoiceId(_invoiceId);
            // localStorage.removeItem("cart");
            localStorage.removeItem("cartAttachment");
            toast.success("Order Placed Successfully!");
            router.push(`/payment-success/${_invoiceId}?pay_mode=${payment}`);
             removeCheckedOutItems()
          }

        
        })
        .catch((err) => {
          toast.error("Error occurred. Try again.");
          console.log(err);
          if (err.response?.data?.success === false) {
            setInsufficientProducts(err?.response?.data?.insufficient_products || []);
            setIsOpen(true);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [cartItems, orderSchemaState, selectedDonate, router, payment]
  );

  const handleSpinClick = useCallback(() => {
    const nextTimeIndex = prizeData.findIndex(
      (item) => item.option === "Try Again"
    );
    const cashPrizeIndex = prizeData.findIndex(
      (item) => item.option === "10% off"
    );
    const newSpinCount = spinCount + 1;
    setSpinCount(newSpinCount);

    if (newSpinCount === 2) {
      setPrizeNumber(cashPrizeIndex);
    } else {
      setPrizeNumber(nextTimeIndex);
    }
    setMustSpin(true);
    setResult("");
  }, [spinCount]);

  const handleSpinEnd = useCallback(() => {
    const selectedPrize = prizeData[prizeNumber]?.image?.uri || "Unknown";
    const selectedPrizeName = prizeData[prizeNumber]?.option || "Unknown";
    setPrizeName(selectedPrizeName);
    setResult(selectedPrize);
    setMustSpin(false);
    setShowWheelModal(false);
    setIsModalOpen(true);
  }, [prizeNumber]);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => {
      router.push(`/payment-success/${invoiceId}`);
    }, 500);
  }, [router, invoiceId]);

  const handlePaymentMethod = useCallback((item) => {
    setShowPaymentModal(true);
    if (item.payment_type_category && item.payment_type_category.length > 0) {
      setPayment(item.payment_type_category[0].payment_category_name);
      setSelectedMethodId(item.payment_type_category[0].id);
    } else {
      setPayment(item.value);
      setSelectedMethodId(item.category_id);
    }

    setOrderSchema((prevSchema) => ({
      ...prevSchema,
      payment_method: [
        {
          payment_type_category_id:
            item.payment_type_category?.[0]?.id || item.category_id,
          payment_type_id:
            item.payment_type_category?.[0]?.payment_type_id || item.id,
          account_number:
            item.payment_type_category?.[0]?.account_number ||
            item.account_number,
        },
      ],
    }));
  }, []);

  const handleAmount = useCallback(
    (e) => {
      const amount = e.target.value;
      setOrderSchema((prev) => {
        const updatedMethod = [...prev.payment_method];
        const existingMethodIndex = updatedMethod.findIndex(
          (item) => item.payment_type_category_id === selectedMethodId
        );
        if (existingMethodIndex !== -1) {
          updatedMethod[existingMethodIndex].payment_amount =
            Number.parseInt(amount);
        }
        return { ...prev, payment_method: updatedMethod };
      });
    },
    [selectedMethodId]
  );

  const handleRefId = useCallback(
    (e) => {
      const refId = e.target.value;
      setOrderSchema((prev) => {
        const updatedMethod = [...prev.payment_method];
        const existingMethodIndex = updatedMethod.findIndex(
          (item) => item.payment_type_category_id === selectedMethodId
        );
        if (existingMethodIndex !== -1) {
          updatedMethod[existingMethodIndex].ref_id = refId;
        }
        return { ...prev, payment_method: updatedMethod };
      });
    },
    [selectedMethodId]
  );

  

  const modal = useState(false);
  const onClose = useCallback(() => {
    modal[1](false);
  }, [modal]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")) || null;
    if (user) {
      setFormData({
        ...formData,
        firstName: user.name,
        email: user.email,
        phone: user.phone || null,
      });
      setCustomerId(user?.id);
    }
  }, []);

  return (
    <div className="space-y-4">
      <form onSubmit={handleOrderComplete} className="space-y-2 px-5 bg-white py-10 border-r">
        {/* Delivery Information */}
        <div className="md:p-6">
          <div className="flex items-center space-x-1 mb-6">
            <div>
              <MapPin className="h-7 w-7 text-slate-800" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-semibold poppins text-gray-900">
                Delivery Information
              </h2>
             
            </div>
          </div>

          {/* <div className="text-black mb-5">
            {orderSchema.customer_name && orderSchema.email && (
              <>
                <button type="button" onClick={handleGoogleLogin}>
                  <FcGoogle size={25} />
                </button>
                <br />
                <span>or</span>
              </>
            )}
          </div> */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div className="col-span-2 md:col-span-1">
              
                <FloatingLabelInput
                 type="text"
                name="firstName"
               icon={User}
        value={formData?.firstName}
                onChange={handleChange}
                placeholder="Enter your full name"
      />
            </div>

           

            {/* Email */}
            <div className="col-span-2 md:col-span-1">
              

               <FloatingLabelInput
                 type="number"
                name="phone"
                icon={Phone}
          value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your number"
      />
            </div>

         
            {/* City - Hidden */}
            <div className="hidden">
              <label className="text-sm font-medium text-gray-700 mb-2 items-center gap-1">
                <Building size={18} />
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter your city"
                className="w-full text-black dark:bg-white px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 transition-colors"
              />
            </div>

          
            {/* Address */}
            <div className="col-span-2">
              

              <FloatingLabelInput
                 type="text"
                name="address"
                icon={Home}
                value={formData.address}
                onChange={handleChange}
               
                placeholder="Enter your full address"
      />
            </div>

            <div className="col-span-2">
              

              <FloatingLabelInput
                 type="text"
                name="delivery_note"
                icon={NotebookText}
                value={formData.delivery_note}
                onChange={handleChange}
                placeholder="Special note for delivery (optional)"
      />
      
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 col-span-2">
              

              <FloatingLabelInput
                 type="text"
                name="city"
                icon={Building}
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
      />
      
              <FloatingLabelInput
                 type="text"
                name="postalCode"
                icon={BookUser}
                value={formData.postalCode}
                onChange={handleChange}
                placeholder="Postal Code"
      />
      
            </div>

          
          </div>
        </div>

        {/* Shipping Method */}
         <div className="md:p-6 py-6">
      {/* Header */}
      <div className="flex items-center space-x-2 mb-6">
        <TbTruckDelivery className="h-7 w-7 text-gray-800" />
        <h3 className="text-xl md:text-2xl poppins font-semibold text-gray-900">
          Shipping Method
        </h3>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {/* Inside Dhaka */}
        <label
          className={`relative flex flex-col p-4 border rounded-lg cursor-pointer transition ease-in-out ${
            location === "inside"
              ? "border-gray-500"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <div className="flex items-center space-x-4">
            <input
              type="radio"
              name="shipping"
              value="inside"
              checked={location === "inside"}
              onChange={() => setLocation("inside")}
              className="sr-only"
            />
            <div
              className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                location === "inside" ? "border-gray-700 border-4" : "border-gray-300"
              }`}
            >
              {location === "inside" && (
                <div className="w-2 h-2 bg-gray-50 rounded-full"></div>
              )}
            </div>
            <span className="font-medium text-gray-900 poppins">
              Inside Dhaka
            </span>
            <span className="ml-auto font-semibold text-gray-900 poppins">
              ৳70
            </span>
          </div>

          {/* Expandable description */}
          <AnimatePresence>
            {location === "inside" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="mt-3 bg-gray-50 rounded-lg p-3 text-sm text-gray-700 leading-relaxed"
              >
                
                <p className="text-gray-600">
                  ঢাকার ভেতরে ১-২ কর্মদিবসের মধ্যে ডেলিভারি সম্পন্ন হবে।
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </label>

        {/* Outside Dhaka */}
        <label
          className={`relative flex flex-col p-4 border rounded-lg cursor-pointer transition ease-in-out ${
            location === "outside"
              ? "border-gray-500"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <div className="flex items-center space-x-4">
            <input
              type="radio"
              name="shipping"
              value="outside"
              checked={location === "outside"}
              onChange={() => setLocation("outside")}
              className="sr-only"
            />
            <div
              className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                location === "outside" ? "border-gray-700 border-4" : "border-gray-300"
              }`}
            >
              {location === "outside" && (
                <div className="w-2 h-2 bg-gray-50 rounded-full"></div>
              )}
            </div>
            <span className="font-medium text-gray-900 poppins">
              Outside Dhaka
            </span>
            <span className="ml-auto font-semibold text-gray-900 poppins">
              ৳130
            </span>
          </div>

          {/* Expandable description */}
          <AnimatePresence>
            {location === "outside" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="mt-3 bg-gray-50 rounded-lg p-3 text-sm text-gray-700 leading-relaxed"
              >
                
                <p className="text-gray-600">
                  ঢাকার বাইরে ৩-৫ কর্মদিবসের মধ্যে ডেলিভারি সম্পন্ন হবে।
                </p>
              </motion.div>
            )}
          </AnimatePresence>

         
        </label>


        {/* Outside Dhaka */}
        <label
          className={`relative flex flex-col p-4 border rounded-lg cursor-pointer transition ease-in-out ${
            location === "outside"
              ? "border-gray-500"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <div className="flex items-center space-x-4">
            <input
              type="radio"
              name="shipping"
              value="instant"
              checked={location === "instant"}
              onChange={() => setLocation("instant")}
              className="sr-only"
            />
            <div
              className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                location === "instant" ? "border-gray-700 border-4" : "border-gray-300"
              }`}
            >
              {location === "instant" && (
                <div className="w-2 h-2 bg-gray-50 rounded-full"></div>
              )}
            </div>
            <span className="font-medium text-gray-900 poppins">
              Instant Delivery
            </span>
            <span className="ml-auto font-semibold text-gray-900 poppins">
              ৳250
            </span>
          </div>

          {/* Expandable description */}
          

          <AnimatePresence>
            {location === "instant" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="mt-3 bg-gray-50 rounded-lg p-3 text-sm text-gray-700 leading-relaxed"
              >
                
                <p className="text-gray-600">
                 ২৪ ঘণ্টার মধ্যে ডেলিভারি সম্পন্ন হবে।
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </label>
      </div>
    </div>

        {/* Payment Method */}
            <div className="md:p-6 py-6">
    
      <div className="flex items-center space-x-2 mb-6">
        <CreditCard className="h-6 w-6 text-gray-800" />
        <h3 className="text-xl md:text-2xl font-semibold text-gray-900 poppins">
          Payment
        </h3>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {/* SSLCommerz */}
        <label
          className={`relative flex flex-col items-center justify-between p-4 border rounded-lg cursor-pointer transition ease-in-out ${
            payment === "SSL"
              ? "border-gray-500"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <div className="flex items-center justify-between w-full">
            <input
            type="radio"
            name="payment"
            value="SSL"
            checked={payment === "SSL"}
            onChange={handlePayment}
            className="sr-only"
          />
          <div className="flex items-center space-x-4 flex-1">
            <div
              className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                payment === "SSL" ? "border-gray-700 border-4" : "border-gray-300"
              }`}
            >
              {payment === "SSL" && (
                <div className="w-2 h-2 bg-gray-50 rounded-full"></div>
              )}
            </div>
            <span className="font-medium text-gray-900 poppins">
              SSLCOMMERZ
            </span>
          </div>
          <div className="flex items-center space-x-2 mt-2">
            <Image
            unoptimized
              src="https://www.outletexpense.xyz/uploads/168-Khan-Sahadat/1757846649.jpg"
              alt="visa"
              width={35}
              height={20}
              className="object-contain"
            />
            <Image
            unoptimized
              src="https://www.outletexpense.xyz/uploads/168-Khan-Sahadat/1757846710.png"
              alt="master"
              width={35}
              height={20}
              className="object-contain"
            />
            <Image
            unoptimized
              src="https://www.outletexpense.xyz/uploads/168-Khan-Sahadat/1757849337.jpg"
              alt="amex"
              width={35}
              height={20}
              className="object-contain"
            />
          </div>
          </div>

          {/* Animated SSL Description */}
          <AnimatePresence>
            {payment === "SSL" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="mt-3 bg-gray-50 rounded-lg p-3 text-sm text-gray-700 leading-relaxed w-full"
              >
                <div>
                  <Image src='https://www.outletexpense.xyz/uploads/135-MD.-Nahid-Hossain-Faisal/1757918681.png' width={600} height={500} alt="ssl" className="w-20 mx-auto mb-3">
                  
                </Image>
                </div>
                <p className="text-gray-600">
                  After clicking “Pay now”, you will be redirected to SSLCOMMERZ to complete your purchase securely.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </label>

        {/* Cash on Delivery */}
        <label
          className={`relative flex flex-col p-4 border rounded-lg cursor-pointer transition ease-in-out ${
            payment === "Cash"
              ? "border-gray-500"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <div className="flex items-center space-x-4">
            <input
              type="radio"
              name="payment"
              value="Cash"
              checked={payment === "Cash"}
              onChange={handlePayment}
              className="sr-only"
            />
            <div
              className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                payment === "Cash" ? "border-gray-700 border-4" : "border-gray-300"
              }`}
            >
              {payment === "Cash" && (
                <div className="w-2 h-2 bg-gray-50 rounded-full"></div>
              )}
            </div>
            <span className="font-medium text-gray-900 poppins">
              Cash On Delivery (ক্যাশ অন ডেলিভারি)
            </span>
          </div>

          {/* Animated COD Description */}
          <AnimatePresence>
            {payment === "Cash" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="mt-3 bg-gray-50 rounded-lg p-3 text-sm text-gray-700 leading-relaxed"
              >
                <p className="font-medium mb-1">
                  After placing your order, you’ll get a confirmation call or
                  confirmation message within next working day!
                </p>
                <p className="text-gray-600">
                  অর্ডার টি প্লেস করা হলে পরবর্তী কর্মদিবসের মধ্যে একটি কল অথবা
                  মেসেজের মাধ্যমে কনফার্ম হয়েছে কিনা জানিয়ে দেওয়া হবে!
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </label>
      </div>
    </div>


      
{/* Billing Address */}
<div className="md:p-6 py-6">
  {/* Header */}
  <div className="flex items-center space-x-3 mb-6">
    <Mail className="h-7 w-7 text-gray-800" />
    <h3 className="text-xl font-semibold poppins text-gray-900">
      Billing Address
    </h3>
  </div>

  <div className="space-y-3">
    {/* Same as Shipping */}
    <label
      className={`relative flex flex-col p-4 border rounded-lg cursor-pointer transition-all ${
        billingSameAsShipping
          ? "border-gray-500"
          : "border-gray-200 hover:border-gray-300"
      }`}
    >
      <input
        type="radio"
        name="billingAddress"
        value="same"
        checked={billingSameAsShipping}
        onChange={handleBillingChange}
        className="sr-only"
      />
      <div className="flex items-center space-x-4">
        <div
          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
            billingSameAsShipping ? "border-gray-700 border-4" : "border-gray-300"
          }`}
        >
          {billingSameAsShipping && (
            <div className="w-2 h-2 bg-gray-50 rounded-full"></div>
          )}
        </div>
        <span className="font-medium text-gray-900 poppins">
          Same as shipping address
        </span>
      </div>
    </label>

    {/* Different Address */}
    <label
      className={`relative flex flex-col p-4 border rounded-lg cursor-pointer transition-all ${
        !billingSameAsShipping
          ? "border-gray-500"
          : "border-gray-200 hover:border-gray-300"
      }`}
    >
      <input
        type="radio"
        name="billingAddress"
        value="different"
        checked={!billingSameAsShipping}
        onChange={handleBillingChange}
        className="sr-only"
      />
      <div className="flex items-center space-x-4">
        <div
          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
            !billingSameAsShipping ? "border-gray-700 border-4" : "border-gray-300"
          }`}
        >
          {!billingSameAsShipping && (
            <div className="w-2 h-2 bg-gray-50 rounded-full"></div>
          )}
        </div>
        <span className="font-medium text-gray-900 poppins">
          Use a different billing address
        </span>
      </div>

      {/* Animated Section */}
      <AnimatePresence>
        {!billingSameAsShipping && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="mt-3 bg-gray-50 rounded-lg md:p-6 py-6 text-sm text-gray-700 leading-relaxed"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  placeholder="Enter Your First Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 transition-colors"
                  type="text"
                  name="billFirstName"
                  onChange={handleChange}
                  value={formData.billFirstName}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  placeholder="Enter Your Last Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 transition-colors"
                  type="text"
                  name="billLastName"
                  onChange={handleChange}
                  value={formData.billLastName}
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <input
                  placeholder="Enter Your Full Address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 transition-colors"
                  type="text"
                  name="billAddress"
                  onChange={handleChange}
                  value={formData.billAddress}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>
                <input
                  placeholder="Enter Your City"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 transition-colors"
                  type="text"
                  name="billCity"
                  onChange={handleChange}
                  value={formData.billCity}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone (optional)
                </label>
                <input
                  placeholder="Enter Your Phone Number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 transition-colors"
                  type="text"
                  name="billPhone"
                  onChange={handleChange}
                  value={formData.billPhone}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </label>
  </div>
</div>



        

        {/* Complete Order Button */}
        <div className="py-6 md:p-6">
          <button
            onClick={handleOrderComplete}
            disabled={loading}
            type="submit"
            className={`${
              loading ? "cursor-not-allowed" : "cursor-pointer"
            } w-full bg-gradient-to-r from-gray-900 to-gray-950 hover:from-gray-900 hover:to-slate-900 text-white font-semibold py-4 px-6 rounded-sm transition duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2`}
          >
            <div className="flex items-center justify-center space-x-2 poppins">
              <Box className="h-5 w-5" />
              <span>{loading ? "Order Placing..." : "Place Order"}</span>
            </div>
          </button>
          
        </div>
      </form>

      {showPaymentModal && (
        <Modal
          title={"Payment Info"}
          content={
            <PaymentMethodForm
              totalAmount={cartTotal}
              methodName={payment}
              selectedMethodId={selectedMethodId}
              methods={paymentMethods?.data?.data || []}
              firstValueFunction={handlePaymentMethod}
              paymentMethodSelection={orderSchemaState.payment_method}
              setOrderSchema={setOrderSchema}
              onAmountUpdate={handleAmount}
              onRefIdUpdate={handleRefId}
              setSelectedMethodId={setSelectedMethodId}
              onClose={handleClose}
            />
          }
          onClose={handleClose}
        />
      )}

      <Dialog
        open={showWheelModal}
        onClose={() => {}}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-transparent flex flex-col items-center">
            <div className="relative">
              <Wheel
                mustStartSpinning={mustSpin}
                prizeNumber={prizeNumber}
                data={prizeData}
                backgroundColors={["#008080", "#ffffff"]}
                textColors={["#000000", "#008080"]}
                outerBorderColor={["#000000", "#ffffff"]}
                outerBorderWidth={2}
                radiusLineColor="#008080"
                radiusLineWidth={1}
                fontSize={14}
                textDistance={70}
                onStopSpinning={handleSpinEnd}
                perpendicularText={true}
                isOnlyOnce={false}
              />
              <button
                onClick={handleSpinClick}
                className="absolute z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black text-white px-5 py-2 flex items-center gap-1 rounded-full text-lg font-semibold shadow hover:bg-gray-900"
              >
                Play
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* api response false modal */}

     {isOpen && (
  <div style={{ marginTop: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
    {/* Black Overlay - Full Screen */}
    <div 
      className="absolute inset-0 bg-black/60 backdrop-blur-sm bottom-0"
      onClick={() => setIsOpen(false)}
    />
    
    {/* Modal Content */}
    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto transform transition ease-in-out duration-300 ease-out">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
            <span className="text-red-600 text-xl">🚨</span>
          </div>
          <h2 className="text-xl font-bold text-gray-900">
            Stock Out
          </h2>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
        >
          <span className="text-gray-500 text-lg">×</span>
        </button>
      </div>

      {/* Content */}
      <div className="p-6 max-h-96 overflow-y-auto">
        <div className="space-y-4">
          {insufficientProducts.map((item, i) => (
            <div 
              key={i} 
              className="bg-red-50 border border-red-200 rounded-lg p-4 transition ease-in-out hover:bg-red-100"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 mb-1">
                    {item.product_name}
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-red-600 font-medium">
                      Requested: {item.requested_qty}
                    </span>
                    <span className="text-gray-600">
                      Available: {item.available_qty}
                    </span>
                  </div>
                </div>
                <div className="w-8 h-8 bg-red-200 rounded-full flex items-center justify-center ml-3">
                  <span className="text-red-600 text-sm font-bold">!</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-center gap-3 p-6 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
        {/* <button
          onClick={() => setIsOpen(false)}
          className="px-5 py-2.5 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium transition ease-in-out duration-200 hover:shadow-sm"
        >
          Close
        </button> */}

        { insufficientProducts.length < 0 ? (
         <button
          onClick={() => router.push("/cart")}
          className="px-5 py-2 w-full rounded-sm bg-gray-600 hover:bg-gray-700 text-white font-medium transition ease-in-out duration-200 hover:shadow-lg transform hover:scale-105"
        >
          Go to Cart
        </button>
        ): ( <button
          onClick={() => router.push("/cart")}
          className="px-5 py-2 w-full rounded-sm bg-red-500 hover:bg-red-600 text-white font-medium transition ease-in-out duration-200 hover:shadow-lg transform hover:scale-105"
        >
          Dismiss
        </button>)}
        
       
      </div>
    </div>
  </div>
)}

      <PrizeModal
        invoiceId={invoiceId}
        prizeName={prizeName}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        prize={result}
      />
    </div>
  );
};

export default DeliveryForm;
