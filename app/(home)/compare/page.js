"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { userId } from "../page";
import axios from "axios";
import noImg from '/public/no-image.jpg'
import useStore from "@/app/CustomHooks/useStore";

const Page = () => {
  const [keyword1, setKeyword1] = useState("");
  const [keyword2, setKeyword2] = useState("");
  const [products, setProduct] = useState([]);
  const [products1, setProducts1] = useState([]);
  const [products2, setProducts2] = useState([]);
  const [selectedProduct1, setSelectedProduct1] = useState(null);
  const [selectedProduct2, setSelectedProduct2] = useState(null);
  const [showResults1, setShowResults1] = useState(false);
  const [showResults2, setShowResults2] = useState(false);

  const handleSearch = (keyword, setProducts, setShowResults) => {
    if (keyword) {
      setShowResults(true);
      axios
        .post(`${process.env.NEXT_PUBLIC_API}/public/search-product`, { keyword, user_id: userId })
        .then((res) => {
          const fetchedProducts = res?.data?.data?.data || [];
          setProducts(fetchedProducts);
          setProduct(fetchedProducts);
        })
        .catch(() => setProducts([]));
    } else {
      setProducts([]);
      setShowResults(false);
    }
  };



  const { handleBuy } = useStore()

useEffect(() => {
  if (products?.specifications?.length > 0) {
    const names = products?.specifications?.map((dName) => dName.name); // Extract names
    setHello(names); // Store as an array in state
 ;
  }
}, [products]); // Runs when `products` changes





  const handleSelectProduct = (product, setSelectedProduct, setKeyword, setProducts, setShowResults) => {
    setSelectedProduct(product);
    setKeyword("");
    setProducts([]);
    setShowResults(false);
  };

  const handleRemoveProduct = (setSelectedProduct, setShowResults) => {
    setSelectedProduct(null);
    setShowResults(false);
  };

  return (
    <div className="p-6 lg:pt-32 md:pt-28 pt-20 w-11/12 mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        <div className="mb-12">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Product Comparison
          </h1>
          <p className="text-gray-600">
            Find and select products to see the differences and similarities between them
          </p>
        </div>

        <div>
          {/* Search Field 1 */}
          <div>
            <input
              type="text"
              value={keyword1}
              onChange={(e) => {
                setKeyword1(e.target.value);
                handleSearch(e.target.value, setProducts1, setShowResults1);
              }}
              onFocus={() => setShowResults1(true)}
              onBlur={() => setTimeout(() => setShowResults1(false), 200)}
              placeholder="Search for Product 1"
              className="w-full p-2 border border-gray-200 focus:ring-1 text-black focus:ring-slate-200 bg-white px-3 rounded"
            />
            {showResults1 && products1.length > 0 && (
              <div className="mt-4 w-10/12 md:w-[25rem] text-black h-56 overflow-y-scroll absolute bg-white shadow-md border rounded">
                {products1.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-4 p-2 border-b bg-white cursor-pointer"
                    onClick={() => handleSelectProduct(product, setSelectedProduct1, setKeyword1, setProducts1, setShowResults1)}
                  >
                    <Image
                      src={product?.images?.[0] || product?.image_path || noImg}
                      height={50}
                      width={50}
                      alt="product"
                      quality={75}
                    />
                    <span className="text-black text-ellipsis line-clamp-1">{product.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="p-3 mt-1 pb-4 border bg-white mx-auto w-2/3">
            {selectedProduct1 ? (
              <div className="flex flex-col items-center">
                <Image
                  src={selectedProduct1?.images?.[0] || selectedProduct1?.image_path || noImg}
                  height={100}
                  width={100}
                  alt={selectedProduct1.name}
                  className="rounded"
                />
                <h3 className="mt-4 font-semibold text-black text-sm w-2/3 text-center mx-auto text-ellipsis line-clamp-2">{selectedProduct1.name}</h3>

                <div className="flex items-center justify-center gap-2 mt-3">
                <button onClick={() => {handleBuy(selectedProduct1,1)}} className="border-[#115e59] text-nowrap border text-xs text-[#115e59] w-full px-[8px] py-1.5 rounded font-semibold  transition-colors">Buy Now</button>
                <button
                  className="px-2 text-sm py-1 bg-red-500 text-white rounded"
                  onClick={() => handleRemoveProduct(setSelectedProduct1, setShowResults1)}
                >
                  Remove
                </button>
                </div>

              </div>
            ) : (
              <div className="text-center text-gray-500">No product selected</div>
            )}
          </div>
        </div>

        <div>
          {/* Search Field 2 */}
          <div>
            <input
              type="text"
              value={keyword2}
              onChange={(e) => {
                setKeyword2(e.target.value);
                handleSearch(e.target.value, setProducts2, setShowResults2);
              }}
              onFocus={() => setShowResults2(true)}
              onBlur={() => setTimeout(() => setShowResults2(false), 200)}
              placeholder="Search for Product 2"
              className="w-full p-2 border border-gray-200 focus:ring-1 text-black focus:ring-slate-200 bg-white rounded"
            />
            {showResults2 && products2.length > 0 && (
              <div className="mt-4 w-10/12 md:w-[25rem] text-black h-56 overflow-y-scroll absolute bg-white shadow-md border rounded">
                {products2.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-4 p-2 border-b cursor-pointer"
                    onClick={() => handleSelectProduct(product, setSelectedProduct2, setKeyword2, setProducts2, setShowResults2)}
                  >
                    <Image
                      src={product?.images?.[0] || product?.image_path || noImg}
                      height={50}
                      width={50}
                      alt="product"
                      quality={75}
                    />
                    <span className="text-black text-ellipsis line-clamp-1">{product.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="p-3 mt-1 pb-4 border bg-white mx-auto w-2/3">
            {selectedProduct2 ? (
              <div className="flex flex-col items-center">
                <Image
                  src={selectedProduct2?.images?.[0] || selectedProduct2?.image_path || noImg}
                  height={100}
                  width={100}
                  alt={selectedProduct2.name}
                  className="rounded"
                />
                <h3 className="mt-4 font-semibold text-black text-sm w-2/3 text-center mx-auto text-ellipsis line-clamp-2">{selectedProduct2.name}</h3>

               <div className="flex items-center justify-center gap-2 mt-3">
                <button onClick={() => {handleBuy(selectedProduct2,1)}} className="border-[#115e59] text-nowrap border text-xs text-[#115e59] w-full px-[8px] py-1.5 rounded font-semibold  transition-colors">Buy Now</button>
                <button
                  className="px-2 text-sm py-1 bg-red-500 text-white rounded"
                  onClick={() => handleRemoveProduct(setSelectedProduct2, setShowResults2)}
                >
                  Remove
                </button>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500">No product selected</div>
            )}
          </div>
        </div>

      </div>

      {/* Product Comparison Table */}
      <div className="mt-8 text-black">
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Feature</th>
                <th className="border border-gray-300 p-2">Product 1</th>
                <th className="border border-gray-300 p-2">Product 2</th>
              </tr>
            </thead>


            <tbody>
  {selectedProduct1?.specifications?.length > 0 || selectedProduct2?.specifications?.length > 0 ? (
    (selectedProduct1?.specifications || selectedProduct2?.specifications || []).map((spec, index) => {
      const spec1 = selectedProduct1?.specifications?.find((s) => s.name === spec.name);
      const spec2 = selectedProduct2?.specifications?.find((s) => s.name === spec.name);

      return (
        <tr key={index} className="border-b">
          <td className="py-2 font-semibold border pl-3">
            {spec.name.charAt(0).toUpperCase() + spec.name.slice(1)}
          </td>
          <td className="py-2 pl-3 border">{spec1?.description || "N/A"}</td>
          <td className="py-2 pl-3 border">{spec2?.description || "N/A"}</td>
        </tr>
      );
    })
  ) : (
    <tr>
      <td colSpan="3" className="text-center py-3 border">No specifications available</td>
    </tr>
  )}
</tbody>




          </table>
        </div>
      </div>
    </div>
  );
};

export default Page;
