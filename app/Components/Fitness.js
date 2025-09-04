"use client";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import Loader from "@/app/Components/Loader";
import ProductCard from "@/app/Components/ProductCard";
import CardSkeleton from "./CardSkeleton";
import Heading from "../CustomHooks/heading";

const fetcher = (url) => fetch(url).then(res => res.json());

const Fitness = () => {
  const limit = 20;

  const { data: products6600, isLoading: isLoading6600 } = useSWR(
    `${process.env.NEXT_PUBLIC_API}/public/categorywise-products/6600?limit=${limit}`,
    fetcher
  );

  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    if (products6600) {
      const selectedProducts6600 = products6600.data.slice(0, 12);
      setFilteredItems(selectedProducts6600);
    }
  }, [products6600]);

  return (
    <div className="lg:mt-20 mt-10">
      <Heading title={"Fitness & Wearable"} />

      <div className="grid grid-cols-2 mt-5 md:grid-cols-3 xl:grid-cols-6 lg:grid-cols-5 gap-3 w-11/12 mx-auto">
        {isLoading6600 ? (
            <div>
              <div className="grid grid-cols-2 p-5 md:hidden lg:hidden gap-5">
                {Array.from({ length: 2 }).map((_, idx) => (
                  <CardSkeleton key={idx} />
                ))}
              </div>
              <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 lg:hidden gap-5 w-11/12 mx-auto">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <CardSkeleton key={idx} />
                ))}
              </div>
              <div className="lg:grid w-11/12 mx-auto md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 hidden gap-5">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <CardSkeleton key={idx} />
                ))}
              </div>
            </div>
          ) : filteredItems && filteredItems.length > 0 ? (
          filteredItems.map((product) => 
          <ProductCard product={product} key={product.id} />
        )
        ) : (
          <p className="text-black text-center">No products found</p>
        )}
      </div>
    </div>
  );
};

export default Fitness;