"use client";

import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
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

  const { setToken, googleLogin, setUserInfo, getCartItems } = useStore();

  // State declarations
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [payment, setPayment] = useState("Cash");
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
      const total = items.reduce(
        (prev, curr) =>
          country.value === "BD"
            ? prev + curr.retails_price
            : prev + curr?.intl_retails_price,
        0
      );
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
    const countryNames = getNames(); // returns all country names
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
      delivery_note: deliveryNote,
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
  const handleGoogleLogin = useCallback(async () => {
    try {
      const response = await googleLogin();
      const result = response.user;
      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API}/customer-registration`,
          {
            name: result.displayName,
            phone: result.phoneNumber,
            email: result.email,
            password: result.uid,
            user_id: String(userId),
          },
          { headers: { "Content-Type": "application/json" } }
        );
      } catch (error) {
        console.warn(error.message);
      }

      const loginResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/customer-login`,
        { email: result.email, password: result.uid, user_id: String(userId) },
        { headers: { "Content-Type": "application/json" } }
      );

      setCustomerId(loginResponse?.data?.customer?.id);
      setReload(true);
      if (intendedUrl) {
        router.push(intendedUrl);
      }

      setToken(loginResponse.data.token);
      toast.success("Login Successful!");
      setUserInfo(loginResponse?.data?.customer);
      setOrderSchema((prev) => ({
        ...prev,
        customer_name: result.displayName,
        customer_phone: result.phoneNumber,
        customer_email: result.email,
      }));

      setFormData({
        ...formData,
        firstName: result.displayName,
        phone: result.phoneNumber,
        email: result.email,
      });
      localStorage.setItem(
        "user",
        JSON.stringify(loginResponse?.data?.customer)
      );
      localStorage.setItem("token", loginResponse?.data?.token);
    } catch (error) {
      console.log(error);
    }
  }, [googleLogin, intendedUrl, router, setToken, setUserInfo]);

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
            localStorage.removeItem("cart");
            localStorage.removeItem("cartAttachment");
            toast.success("Order Placed Successfully!");
            router.push(`/payment-success/${_invoiceId}?pay_mode=${payment}`);
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

  const handleDonationClick = useCallback(
    (donation) => {
      if (typeof donation === "number") {
        setSelectedDonate(donation);
      } else if (donation === "Other") {
        setSelectedDonate("");
      } else {
        setSelectedDonate(donation);
      }
    },
    [setSelectedDonate]
  );

  const handleDonationInput = useCallback(
    (e) => {
      setSelectedDonate(e.target.value);
    },
    [setSelectedDonate]
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
      setCustomerId(user.id);
    }
  }, []);

  return (
    <div className="space-y-4">
      <form onSubmit={handleOrderComplete} className="space-y-8">
        {/* Delivery Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-blue-100 p-2 rounded-lg">
              <MapPin className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Delivery Information
              </h2>
              <p className="text-sm text-gray-600">
                Where should we deliver your order?
              </p>
            </div>
          </div>

          <div className="text-black mb-5">
            {orderSchema.customer_name && orderSchema.email && (
              <>
                <button type="button" onClick={handleGoogleLogin}>
                  <FcGoogle size={25} />
                </button>
                <br />
                <span>or</span>
              </>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="inline h-4 w-4 mr-1" />
                Full Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                className="w-full px-4 py-3 border border-gray-300 text-black dark:bg-white rounded-lg focus:ring-2 transition-colors"
              />
            </div>

            {/* Last Name */}
            {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
                className="w-full dark:bg-white px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 transition-colors"
              />
            </div> */}

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                <Mail size={18} />
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData?.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full dark:bg-white text-black px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 transition-colors"
              />
            </div>

            {/* Phone */}
            <div className="block text-sm font-medium text-gray-700 mb-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="inline h-4 w-4 mr-1" />
                Phone Number <span className="text-red-600">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
                className="w-full dark:bg-white px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 transition-colors"
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

            {/* Select country */}

            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <GiWorld className="inline h-4 w-4 mr-1" />
                Select Country <span className="text-red-600">*</span>
              </label>

              <select
                value={selectedCountry}
                onChange={handleChange}
                className="w-full dark:bg-white px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 transition-colors"
              >
                <option value="" disabled>
                  -- Select a country --
                </option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Home className="inline h-4 w-4 mr-1" />
                Address <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="House number and street name"
                required
                className="w-full text-black dark:bg-white px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 transition-colors"
              />
            </div>

            {/* Address2 */}
            {/* <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Home className="inline h-4 w-4 mr-1" />
                Address 2 (Optional)
              </label>
              <input
                type="text"
                name="address2"
                value={formData.address2}
                onChange={handleChange}
                placeholder="House number and street name"
                className="w-full text-black dark:bg-white px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 transition-colors"
              />
            </div> */}
          </div>
        </div>

        {/* Shipping Method */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-green-100 p-2 rounded-lg">
              <Truck className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                Shipping Method
              </h3>
              <p className="text-sm text-gray-600">
                Choose your preferred delivery option
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <label
              className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                location === "inside"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <input
                type="radio"
                name="shipping"
                value="inside"
                checked={location === "inside"}
                onChange={() => setLocation("inside")}
                className="sr-only"
              />
              <div className="flex items-center space-x-4 flex-1">
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    location === "inside"
                      ? "border-blue-500"
                      : "border-gray-300"
                  }`}
                >
                  {location === "inside" && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">
                      Inside Dhaka
                    </span>
                    <span className="font-semibold text-gray-900">৳70</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Delivery within 1-2 business days
                  </p>
                </div>
              </div>
            </label>

            <label
              className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                location === "outside"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <input
                type="radio"
                name="shipping"
                value="outside"
                checked={location === "outside"}
                onChange={() => setLocation("outside")}
                className="sr-only"
              />
              <div className="flex items-center space-x-4 flex-1">
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    location === "outside"
                      ? "border-blue-500"
                      : "border-gray-300"
                  }`}
                >
                  {location === "outside" && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">
                      Outside Dhaka
                    </span>
                    <span className="font-semibold text-gray-900">৳130</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Delivery within 3-5 business days
                  </p>
                </div>
              </div>
            </label>
          </div>
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2 text-sm text-gray-700">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Exchange within 3 days</span>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-purple-100 p-2 rounded-lg">
              <CreditCard className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                Payment Method
              </h3>
              <p className="text-sm text-gray-600 flex items-center">
                <Shield className="h-4 w-4 mr-1" />
                All transactions are secure and encrypted
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <label
              className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                payment === "Cash"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <input
                type="radio"
                name="payment"
                value="Cash"
                checked={payment === "Cash"}
                onChange={(e) => {
                  handlePayment(e);
                  setIsCod(true);
                }}
                className="sr-only"
              />
              <div className="flex items-center space-x-4 flex-1">
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    payment === "Cash" ? "border-blue-500" : "border-gray-300"
                  }`}
                >
                  {payment === "Cash" && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  )}
                </div>
                <div className="flex-1">
                  <span className="font-medium text-gray-900">
                    Cash on Delivery
                  </span>
                  <p className="text-sm text-gray-600">
                    Pay when you receive your order
                  </p>
                </div>
              </div>
            </label>
          </div>

          {!isCod && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              {paymentMethods?.data?.data &&
              paymentMethods?.data?.data?.length > 0 ? (
                (() => {
                  const otherMethods = paymentMethods?.data?.data?.filter(
                    (item) => item?.type_name !== "Cash"
                  );
                  return otherMethods.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {otherMethods.map((item) => (
                        <div
                          onClick={() => handlePaymentMethod(item)}
                          key={item.id}
                          className={`flex flex-col items-center p-3 rounded-lg cursor-pointer transition-all border-2 ${
                            item?.payment_type_category[0]
                              ?.payment_category_name === payment
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <Image
                            src={item?.icon_image || "/placeholder.svg"}
                            alt={
                              item?.payment_type_category[0]
                                ?.payment_category_name
                            }
                            height={40}
                            width={40}
                            className="rounded-md h-12 w-12 mb-2"
                          />
                          <span className="text-xs font-medium text-center">
                            {
                              item?.payment_type_category[0]
                                ?.payment_category_name
                            }
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2 text-sm text-amber-700">
                      <AlertCircle className="h-4 w-4" />
                      <span>Only Cash On Delivery is available right now</span>
                    </div>
                  );
                })()
              ) : (
                <div className="text-sm text-gray-700">
                  <p>
                    You won&apos;t be redirected to a Payment Link immediately
                    due to stock limitation at real time. After your order is
                    placed, our team will call you with stock confirmation in
                    real time and will provide an SSL Wireless Gadget Bodda
                    Secure Payment Link. You can proceed with the payment then.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Billing Address */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-indigo-100 p-2 rounded-lg">
              <Mail className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                Billing Address
              </h3>
              <p className="text-sm text-gray-600">
                Select the billing address that matches your payment method
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <label
              className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                billingSameAsShipping
                  ? "border-blue-500 bg-blue-50"
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
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    billingSameAsShipping
                      ? "border-blue-500"
                      : "border-gray-300"
                  }`}
                >
                  {billingSameAsShipping && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  )}
                </div>
                <span className="font-medium text-gray-900">
                  Same as shipping address
                </span>
              </div>
            </label>

            <label
              className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                !billingSameAsShipping
                  ? "border-blue-500 bg-blue-50"
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
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    !billingSameAsShipping
                      ? "border-blue-500"
                      : "border-gray-300"
                  }`}
                >
                  {!billingSameAsShipping && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  )}
                </div>
                <span className="font-medium text-gray-900">
                  Use a different billing address
                </span>
              </div>
            </label>
          </div>

          {!billingSameAsShipping && (
            <div className="mt-6 p-6 bg-gray-50 rounded-lg space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    placeholder="Enter Your First Name"
                    className="w-full px-4 py-3 dark:bg-white border border-gray-300 rounded-lg focus:ring-2 transition-colors"
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
                    className="w-full dark:bg-white px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 transition-colors"
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
                    className="w-full dark:bg-white px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 transition-colors"
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
                    className="w-full px-4 py-3 dark:bg-white border border-gray-300 rounded-lg focus:ring-2 transition-colors"
                    type="text"
                    name="billCity"
                    onChange={handleChange}
                    value={formData.billCity}
                    required
                  />
                </div>

                <div className="block text-sm font-medium text-gray-700 mb-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone (optional)
                  </label>
                  <input
                    placeholder="Enter Your Phone Number"
                    className="w-full dark:bg-white px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 transition-colors"
                    type="text"
                    name="billPhone"
                    onChange={handleChange}
                    value={formData.billPhone}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Donation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between space-x-3 mb-6">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <HandHelping className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Donation
                </h3>
                <p className="text-sm text-gray-600">
                  Your donated money will be distributed among the poor and
                  needy.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {/* Quick select buttons */}
            <div className="flex flex-row flex-wrap gap-2">
              {donations?.map((donation) => {
                const isSelected =
                  selectedDonate === donation ||
                  (typeof donation === "number" &&
                    Number(selectedDonate) === donation);
                const displayText =
                  typeof donation === "number" ? `${donation}` : donation;

                return (
                  <button
                    type="button"
                    key={donation}
                    onClick={() => handleDonationClick(donation)}
                    className={`px-4 py-2 rounded-full border text-sm ${
                      isSelected
                        ? "bg-gray-800 text-white border-gray-800"
                        : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {country?.value === "BD"
                      ? `Tk ${displayText}`
                      : `$ ${displayText}`}
                  </button>
                );
              })}
            </div>
            {/* Manual input */}
            <input
              type="number"
              placeholder="Or enter custom amount"
              className="px-4 py-2 rounded-full border text-sm bg-white text-gray-800 border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 w-full"
              value={selectedDonate ?? ""}
              onChange={handleDonationInput}
            />
          </div>
        </div>

        {/* Complete Order Button */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <button
            onClick={handleOrderComplete}
            disabled={loading}
            type="submit"
            className={`${
              loading ? "cursor-not-allowed" : "cursor-pointer"
            } w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-500 hover:to-teal-600 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2`}
          >
            <div className="flex items-center justify-center space-x-2">
              <ShoppingBag className="h-5 w-5" />
              <span>{loading ? "Order Placing..." : "Complete Order"}</span>
            </div>
          </button>
          <div className="mt-4 flex items-center justify-center space-x-2 text-xs text-gray-500">
            <Shield className="h-4 w-4" />
            <span>
              Your payment information is protected by 256-bit SSL encryption
            </span>
          </div>
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
    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto transform transition-all duration-300 ease-out">
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
              className="bg-red-50 border border-red-200 rounded-lg p-4 transition-all hover:bg-red-100"
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
          className="px-5 py-2.5 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium transition-all duration-200 hover:shadow-sm"
        >
          Close
        </button> */}

        { insufficientProducts.length < 0 ? (
         <button
          onClick={() => router.push("/cart")}
          className="px-5 py-2 w-full rounded-sm bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all duration-200 hover:shadow-lg transform hover:scale-105"
        >
          Go to Cart
        </button>
        ): ( <button
          onClick={() => router.push("/cart")}
          className="px-5 py-2 w-full rounded-sm bg-red-500 hover:bg-red-600 text-white font-medium transition-all duration-200 hover:shadow-lg transform hover:scale-105"
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
