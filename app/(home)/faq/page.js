"use client"

import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "I'm missing an item from my order, what do I do?",
    answer:
      "Please crosscheck your delivery bill with the items received in your package. The delivery bill inside the package will tell you the items you can expect to find inside. However, if there still seems to be a problem, please contact our customer care team with your order number and the missing item's name. We will ensure a quick solution.",
  },
  {
    question: "Can I cancel my order after I’ve confirmed it?",
    answer:
      "For Standard Delivery, you can cancel your order within a 12 hour window, until it has been dispatched. Please contact our customer care team with your order number. Orders cannot be cancelled after it has been dispatched.",
  },
  {
    question: "Can I edit my order after I’ve placed it?",
    answer:
      "You cannot make any changes to an existing order after you have placed it. However, you can cancel an order and start over within 24 hours of placing an order for Standard Delivery ONLY.",
  },
  {
    question: "Can I get a refund if the price has changed since I ordered it?",
    answer:
      "As we are an ecommerce company, our prices may change in response to trends, promotions and demand from customers. If you request a refund and your items meet our returns policy requirements, the amount refunded will correspond to the amount you originally paid for the items.",
  },
 
];

const FAQItem = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    if (isOpen) {
      const contentEl = ref.current;
      setHeight(contentEl.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  return (
    <div className="border-b border-gray-200 py-4">
      <button className="flex w-full justify-between items-center text-left" onClick={() => setIsOpen(!isOpen)}>
        <span className="text-lg font-medium text-gray-900">{item.question}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-gray-500 transition-transform duration-300" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500 transition-transform duration-300" />
        )}
      </button>
      <div ref={ref} style={{ maxHeight: height }} className="overflow-hidden transition-all duration-300 ease-in-out">
        <p className="mt-2 text-gray-600 pr-8">{item.answer}</p>
      </div>
    </div>
  );
};

const Page = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 md:pt-20 pt-14">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <FAQItem key={index} item={faq} />
        ))}
      </div>
    </div>
  );
};

export default Page;
