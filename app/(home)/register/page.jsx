"use client"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast"
import { userId } from "../page"
import register from '../../../public/register (2).png'
import useStore from "@/app/CustomHooks/useStore"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    password: "",
  
   
  })

  const [reload, setReload] = useState(false)
    const searchParams = useSearchParams()
  const intendedUrl = searchParams.get("redirect")

   const modal = useState(false)

const onClose = () => {
  modal[1](false); 
};


  const router = useRouter()
  const { setToken, googleLogin, setUserInfo } = useStore()
  const handleChange = (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value
    setFormData({ ...formData, [e.target.name]: value })
  }

  const handleSubmit = (e) => {
    
    e.preventDefault()

  

    const payload = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      phone: formData.phone,
      email: formData.email,
      password: formData.password,
      user_id: userId,
    }

    axios
      .post(`${process.env.NEXT_PUBLIC_API}/customer-registration`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const customerId = res?.data?.data?.id

        // Update formData with customer_id before saving it
        const updatedFormData = {
          ...formData,
          customer_id: customerId,
          // confirm_password: undefined,
        
        }

        toast.success("Registration Successful!")
        localStorage.setItem("user", JSON.stringify(updatedFormData))
        router.push("/login")
      })
      .catch((error) => toast.error("Invalid Registration Credentials!"))
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
    <div className="flex items-center justify-center bg-white">
      <div className="w-full max-w-6xl grid grid-cols-1 justify-center items-center md:h-screen md:grid-cols-2 gap-8">
        <div className="hidden md:flex flex-col items-center justify-center p-8 ">

          <iframe height="500px" src="https://lottie.host/embed/095f80c1-b154-417e-89b2-c5efcea3974c/HBU70DxaEe.lottie"></iframe>
    
         
        </div>

        <div className="p-8 flex flex-col justify-center items-center mt-16">
          <div className="max-w-md w-full mx-auto bg-white rounded-xl p-8 shadow-sm border">
            <h1 className="text-3xl font-semibold mb-2 text-gray-800">Let&lsquo;s join us.</h1>
            <p className="text-gray-600 mb-8">Register with your Phone</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="w-full max-w-full relative pt-2">
                <div className="absolute top-0.5 left-2 px-1 bg-white">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Your name
                </label>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    placeholder="Full name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 placeholder-gray-400 placeholder:text-sm text-gray-900 bg-gray-50"
                    required
                  />
                  
                </div>
              </div>

              <div className="w-full max-w-full relative pt-2">
                <div className="absolute top-0.5 left-2 px-1 bg-white">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                </div>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Type phone number..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 placeholder-gray-400 placeholder:text-sm text-gray-900 bg-gray-50"
                  required
                />
              </div>

              <div className="w-full max-w-full relative pt-2">

                <div className="absolute top-0.5 left-2 px-1 bg-white">

                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Type email..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 placeholder-gray-400 placeholder:text-sm text-gray-900 bg-gray-50"
                  required
                />
              </div>

              <div className="w-full max-w-full relative pt-2">

                <div className="absolute top-0.5 left-2 px-1 bg-white">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
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
                Register Now
              </button>
               <div className="flex justify-center mx-4 mt-2 lg:mt-0">
        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center  z-10 gap-2 w-full py-2 px-4 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
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
            Continue with Google
          </span>
        </button>
      </div>
            </form>

            <div className="mt-4 text-center">
              <p className="text-gray-600">
                Have an account?{" "}
                <Link href="/login" className="text-[#006d77] hover:underline font-medium">
                  Login now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
