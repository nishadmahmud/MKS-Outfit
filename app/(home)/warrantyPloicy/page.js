const Page = () => {
    return (
      <div className="bg-gray-100 p-4 lg:pt-20 xl:pt-32 pt-24">
        <div className=" w-full p-6 bg-white  rounded-2xl">
          <h1 className="text-2xl font-bold text-center text-gray-800 underline">Warranty Policy</h1>
          <div className="mt-4 text-gray-700">
            <h2 className="text-lg font-semibold">Coverage</h2>
            <p className="mt-2 text-sm">
              Our warranty covers manufacturing defects for a period of 12 months from the date of purchase. This includes hardware malfunctions not caused by misuse, water damage, or unauthorized repairs.
            </p>
            
            <h2 className="text-lg font-semibold mt-4">Claim Process</h2>
            <p className="mt-2 text-sm">
              To file a claim, provide proof of purchase and a detailed description of the issue. Contact our support team via email or visit our store with the defective device.
            </p>
            
            <h2 className="text-lg font-semibold mt-4">Exclusions</h2>
            <ul className="mt-2 list-disc list-inside text-sm">
              <li>Accidental damage, including drops and liquid exposure.</li>
              <li>Unauthorized modifications or repairs.</li>
              <li>Normal wear and tear, including battery degradation.</li>
              <li>Issues caused by software modifications or third-party apps.</li>
            </ul>
            
            <h2 className="text-lg font-semibold mt-4">Replacement & Repairs</h2>
            <p className="mt-2 text-sm">
              Depending on the issue, we will either repair the device, replace it, or offer a partial refund. The final decision is at the discretion of our technical team.
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  export default Page;
  