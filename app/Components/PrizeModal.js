import Image from "next/image";
import Link from "next/link";
import React from "react";

const PrizeModal = ({ isOpen, invoiceId, prize, prizeName }) => {
  if (!isOpen) return null;


  return (
    <div className="fixed pt-0 mt-0 h-screen inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[999999]" style={{marginTop: '0px'}}>
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full text-center relative">
        {
  prizeName === "Next Time" ? (
    <h1 className="text-black text-sm text-center">The next opportunity will be even better.</h1>
  ) : (
    <>
      <h2 className="text-2xl font-bold mb-4 text-green-600">🎉 Congratulations!</h2>
      <p className="text-lg">You won:</p>
    </>
  )
}

      <Image src={prize} alt="prize" width={300} height={300}></Image>

         {
  prizeName === "Next Time" ? (
    ""
  ) : (
    <>
       <h3 className="text-base text-center py-4 text-black font-semibold">{prizeName}</h3>
    </>
  )
}

     

        <Link
          href={`/payment-success/${invoiceId}`}
          className="mt-4 px-5 cursor-pointer w-full flex justify-center py-1.5 bg-teal-600 hover:bg-teal-800 text-white tracking-wider font-medium hover:scale-105 rounded-md transition"
        >
          Ok
        </Link>

        {/* <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
        >
          &times;
        </button> */}
      </div>
    </div>
  );
};

export default PrizeModal;
