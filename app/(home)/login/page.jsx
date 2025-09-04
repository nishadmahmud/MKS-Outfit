"use client"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast"
import useStore from "@/app/CustomHooks/useStore"
import { userId } from "../page"


export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    user_id: String(userId),
  })

  const [reload, setReload] = useState(false)
  const modal = useState(false)

const onClose = () => {
  modal[1](false); 
};


  const { setToken, googleLogin, setUserInfo, isRegistered, setIsRegistered } = useStore()
  const router = useRouter()
  const searchParams = useSearchParams()
  const intendedUrl = searchParams.get("redirect")


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post(`${process.env.NEXT_PUBLIC_API}/customer-login`, formData)
      .then((res) => {
        if (res.data.token) {
          const userData = JSON.parse(localStorage.getItem("user") || "{}")
          const customer_id = userData?.customer_id
          const first_name = userData?.first_name
          const last_name = userData?.last_name
          const phone = userData?.phone

          const updatedFormData = {
            ...formData,
            customer_id,
            first_name,
            last_name,
            phone,
          }

          setFormData(updatedFormData)

          if (intendedUrl) {
            router.push(intendedUrl)
          } else {
            router.push("/")
          }

          toast.success("Login Successful!")
          localStorage.setItem("user", JSON.stringify(res.data.customer))
          setToken(res.data.token)
          localStorage.setItem("token", res.data.token)
        }
      })
      .catch((error) => toast.error("Invalid Login Credentials!"))
  }

 const handleGoogleLogin = async () => {
    try {
      const response = await googleLogin();
      const result = response.user;
      axios
        .post(`${process.env.NEXT_PUBLIC_API}/public/check-customer-user`, {
          email: result.email,
          user_id: userId,
        })
        .then((res) => {
          if (!res.data.status) {
            axios
              .post(
                `${process.env.NEXT_PUBLIC_API}/customer-registration`,
                {
                  first_name:
                    result.displayName.split(" ").length > 2
                      ? result.displayName.split(" ").slice(0, 1).join(" ")
                      : result.displayName.split(" ").slice(0).join(" "),
                  last_name: result.displayName.split(" ").slice(1).join(" "),
                  phone: result.phone,
                  email: result.email,
                  password: result.uid,
                  user_id: String(userId),
                },
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              )
              .then((res) => {
                if (res.data.status === 200) {
                  axios
                    .post(
                      `${process.env.NEXT_PUBLIC_API}/customer-login`,
                      { email: result.email, password: result.uid,user_id : String(userId) },
                      {
                        headers: { "Content-Type": "application/json" },
                      }
                    )
                    .then((res) => {
                      setReload(true);
                      if (intendedUrl) {
                        router.push(intendedUrl);
                      } else {
                        router.push("/");
                      }
                      if (modal) {
                        onClose();
                      }
                      setToken(res.data.token);
                      toast.success("Login Successful!");
                      setUserInfo(res.data.customer);
                      localStorage.setItem(
                        "user",
                        JSON.stringify(res.data.customer)
                      );
                      localStorage.setItem("token", res.data.token);
                      router.push('/')
                    })
                    .catch((err) => {
                      toast.error("Invalid Registration Credentials!")
                      console.log(err);
                    });
                }
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            axios
              .post(`${process.env.NEXT_PUBLIC_API}/customer-login`, {
                email: result.email,
                password: result.uid,
                user_id : String(userId)
              })
              .then((res) => {
                setReload(true);
                if (intendedUrl) {
                  router.push(intendedUrl);
                } else {
                  router.push("/");
                }
                if (modal) {
                  onClose();
                }
                setToken(res.data.token);
                setUserInfo(res.data.customer);
                toast.success("Login Successful!");
                localStorage.setItem("user", JSON.stringify(res.data.customer));
                localStorage.setItem("token", res.data.token);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="hidden md:flex flex-col items-center justify-center p-8">
          <iframe height={500} src="https://lottie.host/embed/f86f91b1-7ead-40ac-b231-62fb3b0c7151/6NU0cxwe90.lottie"></iframe>
        </div>

        <div className="p-8 flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto bg-white rounded-xl p-8 shadow-sm border">
            <h1 className="text-3xl font-semibold mb-2 text-gray-800">Welcome back.</h1>
            <p className="text-gray-600 mb-8">Login with your Phone/Email</p>

            <form onSubmit={handleSubmit} className="space-y-4">

              <div className="w-full max-w-full relative pt-2">
               <div className="absolute top-0.5 left-2 px-1 bg-white">
                 <label htmlFor="email" className="block text-xs font-medium text-gray-700">
                  Phone Number or Email
                </label>
               </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Type phone number or email..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 placeholder-gray-400 placeholder:text-sm text-gray-900 bg-gray-50"
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="w-full max-w-full relative pt-2">
                  <div className="absolute top-0.5 left-2 px-1 bg-white">
                    <label htmlFor="password" className="block text-xs font-medium text-gray-700">
                    Password
                  </label>
                  </div>
                  {/* <Link href="/forgot-password" className="text-sm text-[#006d77] hover:underline">
                    Forgot password?
                  </Link> */}
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Type password..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 placeholder-gray-400 placeholder:text-sm text-gray-900 bg-gray-50"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#006d77] hover:bg-[#005d65] text-white font-medium rounded-md transition duration-200"
              >
                Sign In
              </button>
               <div className="flex gap-2 items-center">
        <hr className="w-full" />
        <p className="text-black">or</p>
        <hr className="w-full" />
      </div>
      <button
        onClick={handleGoogleLogin}
        className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
      >
        {/* Google Logo */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          width="24px"
          height="24px"
        >
          <path
            fill="#FFC107"
            d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
          />
          <path
            fill="#FF3D00"
            d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
          />
          <path
            fill="#4CAF50"
            d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
          />
          <path
            fill="#1976D2"
            d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
          />
        </svg>
        <span className="text-gray-700 font-medium">
          {/* {loading ? "Signing in..." : "Sign in with Google"} */}
          Sign in with Google
        </span>
      </button>
            </form>

            <div className="mt-5 text-center">
              <p className="text-gray-600">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="text-[#006d77] hover:underline font-medium">
                  Register now
                </Link>
              </p>
            </div>

            {/* <div className="mt-6">
              <button className="w-full flex items-center justify-center gap-2 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition duration-200">
                <CgGoogle className="h-5 w-5" />
                <span>Sign in with Google</span>
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}
