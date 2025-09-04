import localFont from "next/font/local";
import "../globals.css";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import StoreProvider from "../StoreContext/store";
import AvatarChat from "../Components/AvatarChat";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import Image from "next/image";
import Script from "next/script";
import ClientLayout from "../client-layout";
import Providers from "@/lib/Providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "MKS Outfit",
  description: "Elevate Your Style – Premium Men’s Fashion for Every Occasion.",
  icons: {
    icon: '/favicon.png'
  }
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
     

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased nunito`}
      >
        <Toaster></Toaster>
        <StoreProvider>
          <div>
            <Header />
          </div>
          <Suspense fallback={null}>
            <div className="bg-[#ffffff] ">
              <Providers>
                <ClientLayout>{children}</ClientLayout>
              </Providers>
              
              <AvatarChat />
            </div>
            <Footer />
          </Suspense>
        </StoreProvider>
      </body>
    </html>
  );
}
