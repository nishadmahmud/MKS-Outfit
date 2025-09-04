export default function Page() {
  return (
    <div className="max-w-3xl mx-auto px-4 md:pt-32 pt-20 py-10 text-gray-800">
      <h1 className="text-3xl font-bold text-center mb-6">🌍 Export Information</h1>

      <p className="text-center text-gray-600 mb-6">
        <span className="font-semibold">Morshed Mart</span> proudly offers original export-quality men’s fashion products. 
        All our items are carefully sourced, quality-checked, and packaged to meet international standards.
      </p>

      <p className="text-center text-gray-600 mb-8">
        For <span className="font-medium">bulk orders</span>, <span className="font-medium">international shipments</span>, or 
        <span className="font-medium"> B2B export inquiries</span>, please reach out to us through our website or contact our customer service team.
      </p>

      <div className="flex flex-col items-center gap-2 text-lg font-medium">
        <p>📞 Customer Service: <a href="tel:+8801970085954" className="text-blue-600 underline">+880 19 7008 5954</a></p>
        <p>🌐 Website: <a href="https://www.morshedmart.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">www.morshedmart.com</a></p>
      </div>

      <p className="text-center mt-8 text-sm italic text-gray-500">
        Let Morshed Mart be your trusted partner in premium export fashion.
      </p>
    </div>
  );
}
