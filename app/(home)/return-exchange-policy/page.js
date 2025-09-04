export default function Page() {
  return (
    <div className="max-w-3xl mx-auto px-4 md:pt-32 pt-20 py-10 text-gray-800">
      <h1 className="text-3xl font-bold text-center mb-6">🔁 Morshed Mart Return & Exchange Policy</h1>
      <p className="text-center text-gray-600 mb-10">
        At <span className="font-semibold">Morshed Mart</span>, your satisfaction is our priority. If you&apos;re not fully happy with your purchase, we&lsquo;re here to help with an easy and transparent process.
      </p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2 text-green-600">✅ Eligibility for Return/Exchange:</h2>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Request within <span className="font-medium">3 days</span> of receiving your order</li>
          <li>Product must be:
            <ul className="list-disc list-inside ml-5">
              <li>Unworn and unused</li>
              <li>In original condition</li>
              <li>All tags, packaging & accessories intact</li>
            </ul>
          </li>
        </ul>
      </section>

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

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2 text-purple-600">📦 How to Request a Return or Exchange:</h2>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li>Message us on our official Facebook page, WhatsApp, or call</li>
          <li>Provide your order number and return reason</li>
          <li>Our support team will guide you through the process</li>
        </ol>
      </section>

      <div className="text-center mt-10">
        <p className="text-lg font-medium">📞 Customer Service: <a href="tel:+8801970085954" className="text-blue-500 underline">+880 19 7008 5954</a></p>
      </div>

      <p className="text-center mt-8 text-sm italic text-gray-500">Thank you for choosing Morshed Mart – where quality meets trust.</p>
    </div>
  );
}
