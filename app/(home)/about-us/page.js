"use client";
import React from "react";

const Page = () => {
  return (
    <section className="bg-white py-16 px-4 md:px-8 lg:px-24">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          About Us
        </h2>
        <p className="text-gray-600 text-lg mb-12 max-w-3xl mx-auto">
          Welcome to <span className="font-semibold text-indigo-600">MorshedMart.com</span> — your trusted destination for branded, original, and export-quality products. Since our inception in 2020, we’ve remained committed to delivering exceptional value and uncompromising quality to customers around the world.
        </p>

        <div className="bg-indigo-50 rounded-2xl shadow-md p-8 md:p-12">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Our Story
          </h3>
          <p className="text-gray-700 text-md mb-6">
            Founded by <span className="font-medium text-indigo-600">Mr. Fahim Morshed</span>, MorshedMart was built on the principles of trust, quality, and innovation. Today, we proudly serve both local and international markets, offering a curated selection of premium products that meet global standards.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-4">
            What Sets Us Apart
          </h3>
          <ul className="text-left space-y-4 text-gray-700 text-md">
            <li>
              <strong className="text-indigo-600">✔ Authenticity Guaranteed:</strong> We specialize in branded original and export-quality products, ensuring you always receive genuine, high-quality items.
            </li>
            <li>
              <strong className="text-indigo-600">✔ Global Reach:</strong> Our operations extend beyond borders, with international shipping available to customers worldwide.
            </li>
            <li>
              <strong className="text-indigo-600">✔ Customer-Centric Approach:</strong> Your satisfaction is our priority. We are committed to providing reliable products, seamless service, and outstanding value.
            </li>
            <li>
              <strong className="text-indigo-600">✔ Proven Experience:</strong> With a solid foundation since 2020, we offer a platform built on expertise, integrity, and consistent performance.
            </li>
            <li>
              <strong className="text-indigo-600">✔ Growing Community of Trust:</strong> With over 10,000 satisfied retail customers and international buyers, MorshedMart continues to grow as a global brand trusted by individuals and businesses alike.
            </li>
          </ul>

          <p className="mt-8 text-gray-700 text-md">
            At <span className="font-medium text-indigo-600">MorshedMart</span>, we’re more than just a business — we’re a community. We believe in long-term relationships and work tirelessly to ensure a smooth, secure, and satisfying shopping experience, from browsing to delivery.
          </p>

          <p className="mt-6 text-lg font-medium text-gray-800">
            Thank you for choosing MorshedMart.com — we’re here to serve you with excellence.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Page;
