import Image from "next/image"
import Link from "next/link"

import companyLogo from '/public/morshed-mart-logo-removebg-preview.png'
import { FaBehance, FaFacebook, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa6"
import { FaLinkedin, FaYoutube } from "react-icons/fa"
import { Mail, MapPin, Phone } from "lucide-react"
import noImg from '/public/no-image.jpg'


export default function Footer() {
  return (
   <footer className="bg-[#080808] py-12 md:pt-20 z-50">
  <div className="w-11/12 mx-auto">
    <div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
      {/* Logo and Social Section */}
      <div className="space-y-6 flex flex-col items-center md:items-start">
        <Link href="/">
          <Image
            
            src={companyLogo || noImg}
            alt="Morshed Mart Logo"
            width={150}
            height={100}
            className="mb-4 hidden md:block"
          />
        </Link>

        {/* Mobile contact section */}
        <div className="md:hidden flex flex-col gap-2 w-full">
          <div className="flex items-center gap-2 border border-white p-4 rounded-md">
            <Phone className="text-white w-5 h-5" />
            <Link href="tel:+8801970085954" className="text-white text-sm hover:underline">+8801970085954</Link>
          </div>
          <Link target="_blank" href="https://maps.app.goo.gl/yLk4iW6GenCbn8BG8">
            <div className="flex items-start gap-2 border border-white p-4 rounded-md">
              <MapPin className="text-white w-5 h-5" />
              <p className="text-white text-sm">Dhaka, Bangladesh</p>
            </div>
          </Link>
        </div>

        {/* Social icons */}
        <div className="space-y-2">
          <p className="font-semibold text-lg text-white hidden md:block">Join us</p>
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            {[
              { icon: FaWhatsapp, href: "https://wa.me/+8801970085954" },
              { icon: FaFacebook, href: "https://www.facebook.com/morshed.mart2.0" },
              { icon: FaTiktok, href: "#" },
              { icon: FaInstagram, href: "#" },
              { icon: FaYoutube, href: "#" },
            ].map(({ icon: Icon, href }) => (
              <Link key={href} href={href} target="_blank">
                <Icon className="text-white text-3xl border border-white p-1 rounded-full hover:text-[#009dff]" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Company Section */}
      <div className="text-center md:text-left">
        <h3 className="font-bold text-lg text-white mb-4 uppercase">Company</h3>
        <ul className="space-y-2">
          <li><Link href="/about-us" className="text-white hover:underline">About Us</Link></li>
          
          <li><Link href="/order-tracking" className="text-white hover:underline">Order Tracking</Link></li>
          <li><Link href="/blogs" className="text-white hover:underline">Blogs</Link></li>
          <li><Link href="/wishlist" className="text-white hover:underline">Wishlist</Link></li>
        </ul>
      </div>

      {/* Help Center Section */}
      <div className="text-center md:text-left">
        <h3 className="font-bold text-lg text-white mb-4 uppercase">Help Center</h3>
        <ul className="space-y-2">
          <li><Link href="/faq" className="text-white hover:underline">FAQ</Link></li>
          <li><Link href="tel:+8801970085954" className="text-white hover:underline">Support Center</Link></li>
          <li><Link href="https://wa.me/+8801970085954" className="text-white hover:underline">Feedback</Link></li>
          <li><Link href="/export-info" className="text-white hover:underline">Export Information</Link></li>
        </ul>
      </div>

      {/* Terms Section */}
      <div className="text-center md:text-left">
        <h3 className="font-bold text-lg text-white mb-4 uppercase">Terms & Conditions</h3>
        <ul className="space-y-2">
          <li><Link href="/delivery-terms-and-conditions" className="text-white hover:underline">Terms & Conditions</Link></li>
          <li><Link href="/refund-policy" className="text-white hover:underline">Refund Policy</Link></li>
          <li><Link href="/privacy-policy" className="text-white hover:underline">Privacy Policy</Link></li>
        
          <li><Link href="/return-exchange-policy" className="text-white hover:underline">Return & Exchange Policy</Link></li>
        </ul>
      </div>

      {/* Contact Section */}
      <div className="hidden md:flex flex-col gap-3">
        <div className="flex items-center gap-2 border border-white p-3 rounded-md">
          <Phone className="text-white w-5 h-5" />
          <Link href="tel:+8801970085954" className="text-white text-sm hover:underline">+8801970085954</Link>
        </div>
        <Link target="_blank" href="https://maps.app.goo.gl/r2PZTybTwgb8SLd5A">
          <div className="flex items-start gap-2 border border-white p-3 rounded-md">
            <MapPin className="text-white w-5 h-5" />
            <p className="text-white text-xs">
              Rampura, Dhaka, Bangladesh
            </p>
          </div>
        </Link>
      </div>
    </div>
  </div>

  <div className="relative mx-auto h-[180px] my-2 hidden lg:block">
        <Image
          src={"/Payment Banner_Jul24_V1-02.png"}
          alt="ssl-banner"
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          priority
        ></Image>
      </div>

      
   <div className="block lg:hidden mt-4">
        <Image
          src={"/Payment Banner_Jul24_V1-04.png"}
          alt="ssl-banner-mobile"
          height={400}
          width={400}
          className="h-full w-full rounded-md"
        />
      </div>
       <div className="w-full pt-8 mb-14 md:mb-0 text-center">
      <hr className="text-gray-500 w-11/12 mx-auto"></hr>
      <p className="text-gray-100 text-sm pt-8">
        Copyright 2025 © <span className="font-medium">Morshed Mart</span>. All rights reserved. Developed & Desinged by <Link href='https://squadinnovators.com' target="_blank" className="font-medium hover:text-blue-400 transition hover:font-medium">Squad Innovators</Link>.
      </p>
    </div>
  </div>
</footer>

  )
}


