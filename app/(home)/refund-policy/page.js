import React from "react";

const Page = () => {
  return (
    <div className="lg:px-12 mx-auto p-6 bg-white text-black rounded-lg lg:pt-20 xl:pt-24 pt-216 w-10/12">
     <h1 className="text-3xl font-bold text-center mb-6">🔁 Morshed Mart Refund Policy</h1>
     
     <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2 text-red-500">🚫 Non-Returnable Items:</h2>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Worn, washed, or altered items</li>
          <li>Items without original packaging</li>
          <li>Sale or clearance items (unless defective)</li>
          <li>Items damaged by customer mishandling</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2 text-yellow-600">🔄 Exchange Policy:</h2>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Exchange for a different size or item of equal value</li>
          <li>If unavailable, store credit or alternative will be offered</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2 text-blue-600">💵 Return Process & Refund:</h2>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Refund processed within <span className="font-medium">2–3 working days</span> after inspection</li>
          <li>Refunds via <span className="font-medium">bKash, Nagad</span>, or original payment method</li>
          <li>Delivery charges are <span className="font-medium">non-refundable</span> unless due to our error</li>
        </ul>
      </section>
    </div>
  );
};

export default Page;
