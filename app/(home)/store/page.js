import Link from "next/link";
import { FaMapMarkerAlt, FaPhone, FaClock, FaStore } from "react-icons/fa";

const stores = [
  {
    name: "Jamuna Future Park",
    address: "Level-4, Block - A, Shop 029B, Jamuna Future Park Dhaka",
    phone: "+8801898931468",
    hours: "11AM - 9PM",
    map: "https://maps.app.goo.gl/AHAsBtMr2K7LmrRAA"
  },
  
  
];

export default function Page() {
  return (
    <div className="lg:pt-32 md:pt-28 pt-20">

        <div className="w-10/12 mb-4 mx-auto text-black">
        <h1 className="text-4xl font-semibold ">Find Our Stores</h1>
        <p>Visit our outlets today!</p>
        </div>

        <div className="flex flex-wrap justify-around gap-6 p-4 w-10/12 mx-auto">
      {stores.map((store, index) => (
        <div
          key={index}
          className="w-96 bg-white p-6 shadow-lg rounded-2xl border border-gray-200"
        >
          <h2 className="text-xl font-semibold text-[#932b20] flex items-center gap-2">
            <FaStore /> {store.name}
          </h2>
          <p className="text-gray-600 flex items-center gap-2 mt-2">
            <FaMapMarkerAlt className="text-[#115e59]" /> {store.address}
          </p>
          <p className="text-gray-600 flex items-center gap-2 mt-2">
            <FaPhone className="text-[#115e59]" /> {store.phone}
          </p>
          <p className="text-gray-600 flex items-center gap-2 mt-2">
            <FaClock className="text-[#115e59]" /> {store.hours}
          </p>
          <hr className="my-4" />
          <p className="text-gray-500">{store.closed}</p>
          <div className="mt-4 flex gap-2">
            <Link href={store.map}>
            <button className="flex items-center gap-2 bg-[#115e59] text-white px-4 py-2 rounded-lg font-medium shadow hover:bg-[#932b20]">
              <FaMapMarkerAlt /> Show Map
            </button>
            </Link>
            <Link target="_blank" href="https://www.facebook.com/profile.php?id=61563743437257">
            <button className="flex items-center gap-2 bg-[#115e59] text-white px-4 py-2 rounded-lg font-medium shadow hover:bg-[#932b20]">
              <FaStore /> Show Details
            </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
}
