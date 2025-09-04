import { FaUndoAlt, FaTruck, FaHeadset, FaTag } from "react-icons/fa";

const BenefitsSection = () => {
  return (
    <section className="w-full bg-white border-t border-b py-10 text-black">
      <div className="max-w-11/12 mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 md:gap-8 gap-12 text-center my-5">
        {/* 14-Day Returns */}
        <div>
          <FaUndoAlt size={32} className="mx-auto mb-4 text-black" />
          <h3 className="text-lg font-semibold mb-1">03-Day Returns</h3>
          <p className="text-gray-500 text-sm">Risk-free shopping with easy returns.</p>
        </div>

        {/* Free Shipping */}
        <div>
          <FaTruck size={32} className="mx-auto mb-4 text-black" />
          <h3 className="text-lg font-semibold mb-1">Free Shipping</h3>
          <p className="text-gray-500 text-sm">No extra costs, just the price you see.</p>
        </div>

        {/* 24/7 Support */}
        <div>
          <FaHeadset size={32} className="mx-auto mb-4 text-black" />
          <h3 className="text-lg font-semibold mb-1">24/7 Support</h3>
          <p className="text-gray-500 text-sm">24/7 support, always here just for you.</p>
        </div>

        {/* Member Discounts */}
        <div>
          <FaTag size={32} className="mx-auto mb-4 text-black" />
          <h3 className="text-lg font-semibold mb-1">Member Discounts</h3>
          <p className="text-gray-500 text-sm">Special prices for our loyal customers.</p>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
