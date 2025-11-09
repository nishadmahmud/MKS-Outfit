import React from "react";

const Page = () => {
  return (
    <div class="max-w-3xl mx-auto px-4 py-10 text-gray-800 pt-16">
  <h1 class="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>

  <ul class="list-disc pl-5 space-y-1 mb-6">
    <li>We respect your privacy. Personal data is used only for order processing and communication.</li>
    <li>We do not sell or share your data with third parties without your consent.</li>
  </ul>

  <ul class="list-none pl-1 space-y-1">
    <li>📞 Customer Support: <a href="tel:+8801737332432" class="text-blue-600 underline">+8801737332432</a></li>
    <li>📧 Email: <a href="mailto:info@mksoutfit.com" class="text-blue-600 underline">info@mksoutfit.com</a></li>
    <li>🌐 Website: <a href="https://www.mksoutfit.com" class="text-blue-600 underline">www.mksoutfit.com</a></li>
  </ul>
    </div>
  );
};

export default Page;
