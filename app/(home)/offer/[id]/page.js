"use client";

import ProductCard from "@/app/Components/ProductCard";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { userId } from "../../page";

const Page = ({ params }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [offer, setOffer] = useState(null);
    const [sortOrder, setSortOrder] = useState("default"); // Sorting state

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API}/latest-ecommerce-offer-list/${userId}`)
            .then((response) => response.json())
            .then((data) => setOffer(data))
            .catch((error) => console.error("Error fetching offer:", error));
    }, []);

    const fetchProducts = async (pageNum) => {
        setLoading(true);
        try {
            // console.log(`Fetching data for ID: ${params.id} and Page: ${pageNum}`);

            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API}/public/best-deals-brand-id/${userId}/${params.id}?page=${pageNum}`
            );

          

            if (response.data) {
                setProducts(response.data.data || []);
                setTotalPages(response.data.data?.totalPages || 1);
            } else {
                console.warn("No data found in API response.");
            }
        } catch (error) {
            console.error("Error fetching products:", error.response?.data || error.message);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (params.id) {
            fetchProducts(page);
        }
    }, [params.id, page]);

    // Ensure `offer` exists and contains a `data` array before accessing it
    const offerData = offer?.data || [];


    const filteredOffer = offerData.find((offerItem) => offerItem.brand_id == params.id) || null;
   

    // Sorting function
    const sortProducts = (order) => {
        let sortedProducts = [...products];

        if (order === "lowToHigh") {
            sortedProducts.sort((a, b) => a.price - b.price);
        } else if (order === "highToLow") {
            sortedProducts.sort((a, b) => b.price - a.price);
        }
        
        setProducts(sortedProducts);
    };

    // Handle sorting selection
    const handleSortChange = (e) => {
        const selectedOrder = e.target.value;
        setSortOrder(selectedOrder);
        sortProducts(selectedOrder);
    };

    return (
        <div className="lg:pt-20 pt-16 py-5 w-11/12 mx-auto text-black">
            <div className="w-full bg-gray-200 rounded-lg shadow-md overflow-hidden">
                <div className="relative">
                    <Image
                        width={1500}
                        height={800}
                        src={filteredOffer?.image}
                        sizes="55vh"
                        alt="banner-img"
                        className="w-full object-cover rounded-lg h-[40vh]"
                    />
                </div>
                <div className="p-4 bg-gray-100 flex justify-between items-center">
                    <span className="text-lg font-semibold">{filteredOffer?.title}</span>
                    {/* <div className="flex items-center">
                        <span className="text-sm font-medium mr-2">Sort By:</span>
                        <select
                            className="border bg-white border-gray-300 rounded px-2 py-1"
                            value={sortOrder}
                            onChange={handleSortChange}
                        >
                            <option value="default">Default</option>
                            <option value="lowToHigh">Price: Low to High</option>
                            <option value="highToLow">Price: High to Low</option>
                        </select>
                    </div> */}
                </div>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <div className="mt-6 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {products.length > 0 ? (
                            products.map((product) => (
                                <ProductCard product={product} key={product.id} />
                            ))
                        ) : (
                            <p className="text-center col-span-4 text-gray-500">No products found.</p>
                        )}
                    </div>

                    <div className="flex justify-between gap-4 mt-6">
                        <button
                            disabled={page === 1}
                            onClick={() => setPage(page - 1)}
                            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <span>
                            Page {page} of {totalPages}
                        </span>
                        <button
                            disabled={page === totalPages}
                            onClick={() => setPage(page + 1)}
                            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Page;
