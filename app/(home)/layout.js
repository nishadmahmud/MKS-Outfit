import localFont from "next/font/local";
import "../globals.css";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import StoreProvider from "../StoreContext/store";
import { Suspense } from "react";
import { Audiowide, Outfit, Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import ClientLayout from "../client-layout";
import NextTopLoader from 'nextjs-toploader';

import Providers from "@/lib/Providers";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const audiowide = Audiowide({
  subsets: ["latin"],
  weight: ['400'],
  variable: '--font-audiowide'
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins'
});


const outfit = Outfit({
  subsets: ["latin"],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-outift'
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
    <html lang="en" suppressHydrationWarning>


      <body
        className={`${geistSans.variable} ${poppins.variable} ${outfit.variable} ${audiowide.variable} ${geistMono.variable} antialiased nunito`}
      >
        <NextTopLoader color="#000" showSpinner={false} />
        <Toaster></Toaster>
        <StoreProvider>
          <div>
            <Header />
          </div>
          <Suspense fallback={null}>
            <div className="bg-[#ffffff]">
              <Providers>
                <ClientLayout>{children}</ClientLayout>
              </Providers>

              {/* <AvatarChat /> */}
            </div>
            <Footer />
          </Suspense>
        </StoreProvider>
      </body>
    </html >
  );
}
