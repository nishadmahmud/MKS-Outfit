"use client";
import React, { useEffect, useRef, useState } from "react";
import useStore from "@/app/CustomHooks/useStore";
import "react-range-slider-input/dist/style.css";
import Link from "next/link";
import useSWR from "swr";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Loader from "@/app/Components/Loader";
import FilterProduct from "@/app/Components/FIlterProduct";
import { userId } from "../../page";
import { Pagination } from "swiper/modules";
import noImg from '/public/no-image.jpg'



const fetcher = (url) => fetch(url).then(res => res.json());

const Page = ({ params }) => {
  const searchParams = useSearchParams();
  const searchedCategory = searchParams.get('brand');
  const searchedTotal = searchParams.get('total');
  const [currentPage,setCurrentPage] = useState(1);
  const limit = 20;
  const totalPage = Math.ceil(parseInt(searchedTotal) / limit);
  const {id} = params;
  const {data : products,isLoading} = useSWR(`${process.env.NEXT_PUBLIC_API}/public/brandwise-products/${id}/${userId}?page=${currentPage}&limit=${limit}`,fetcher);
  const [filteredItems, setFilteredItems] = useState([]);
  const { handleCart,handleBuy } = useStore();
  const [isChecked, setIsChecked] = useState(false);
  const [sortBy, setSortBy] = useState("");
  // const [selectedBrand,setSelectedBrand] = useState('');
  // const colors = [...new Set(items.map((item) => item.color))];
  // const brands = [...new Set(items.map(item  => item.brand_name))];
  const contentRef = useRef(null);
  
 

  



  const pages = [];

  for(let i = 0; i < totalPage;i++){
    pages.push(i + 1);
  }


  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight)
    }
  }, [])

  useEffect(() => {
    if(products?.data){
      setFilteredItems(products.data)
    }
  },[products])

 
    // useEffect(() => {
    //   if(selectedBrand){
    //   const filteredProducts = items.filter((item) => item.brand_name === selectedBrand);
    //   setItems(filteredProducts);
    //   if (filteredProducts.length > 0) {
    //     const maxPrice = Math.ceil(
    //       filteredProducts.reduce((max, item) => Math.max(max, item.price), 0)
    //     );
    //     setRange([0, maxPrice]);
    //     setMax(maxPrice);
    //     setFilteredItems(filteredProducts);
    //   }
    //   }else{
    //     const filteredProducts = products?.data.filter((item) => item.id === slug);
    //     setItems(filteredProducts);
    //     if (filteredProducts?.length > 0) {
    //       const maxPrice = Math.ceil(
    //         filteredProducts.reduce((max, item) => Math.max(max, item.price), 0)
    //       );
    //       setRange([0, maxPrice]);
    //       setMax(maxPrice);
    //       setFilteredItems(filteredProducts);
    //     }
    //     setFilteredItems(filteredProducts)
    //   }
      
    // }, [selectedBrand,title]);

    // useEffect(() => {
    //   const rangedProducts = items.filter(
    //     (item) => item.price >= range[0] && item.price <= range[1]
    //   );
    //   setFilteredItems(rangedProducts);
    // }, [range,items]);

   

    const colorChecked = (e) => {
      const checked = e.target.checked;
          setIsChecked(checked)
    }

  //   sorting
  // console.log(selectedBrand);

  const handlePageInc = () => {
    if(currentPage < totalPage){
      setCurrentPage(currentPage + 1);
    }
  }

  const handlePageDcrmnt = () => {
    if(currentPage >= 2){
      setCurrentPage(currentPage - 1)
    }
  }

  
 

    useEffect(() => {
      if(sortBy === "low-to-high" && sortBy){
          const lowToHigh = [...filteredItems].sort((a,b) => a.retails_price - b.retails_price);
          setFilteredItems(lowToHigh)
      } else if(sortBy === "high-to-low" && sortBy){
          const highToLow = [...filteredItems].sort((a,b) => b.retails_price - a.retails_price);
          setFilteredItems(highToLow)
      }else if(sortBy === "a-z"){
          const letterSort = [...filteredItems.sort((a,b) => a.name.localeCompare(b.name) )];
          setFilteredItems(letterSort)
      }
      else if(sortBy === "z-a"){
          const letterSort = [...filteredItems.sort((a,b) => b.name.localeCompare(a.name) )];
          setFilteredItems(letterSort)
      }
      // else if(sortBy === "old-to-new"){
      //     const oldToNew = [...filteredItems.sort((a,b) => new Date(a.date) - new Date(b.date) )];
      //     setFilteredItems(oldToNew)
      // }
      // else if(sortBy === "new-to-old"){
      //     const oldToNew = [...filteredItems.sort((a,b) => new Date(b.date) - new Date(a.date) )];
      //     setFilteredItems(oldToNew)
      // }
      else{
          setFilteredItems(products?.data)
      }
    },[sortBy,products?.data])


    // if(!products?.data.length > 0) {
    //   // return <p className="text-center py-40 text-black">No product Avilable</p>
    // }

  return (
    <div className="md:px-12 xl:pt-32 lg:pt-28 md:pt-24 pt-20  py-20 min-h-screen">
      {/* <div className="flex gap-3 flex-wrap">
        {!selectedBrand ? 
        brands?.map((brand, idx) => {
          return (
            <button
              onClick={() => setSelectedBrand(brand)}
              key={idx}
              className={`${
                brand !== undefined
                  ? "border border-[#ff8800] text-black text-sm rounded-full px-2 py-1 hover:bg-[#ff8800] hover:text-white"
                  : ""
              } `}
            >
              {brand}
            </button>
          );
        }) : <button onClick={() => setSelectedBrand('')} className="bg-[#ff8800] text-white rounded-full text-sm px-2 py-1 flex items-center gap-1">{selectedBrand} <X size={16}/></button>}
      </div> */}
      {/* <div className="flex  items-center text-black my-5">
        <div className="flex gap-2 items-center">
          <TbFilters />
          <h3>Filter</h3>
        </div>
       
      </div> */}
      <div className="grid md:grid-cols-4 lg:grid-cols-5 gap-5">
        <FilterProduct products={products?.data} setFilteredItems={setFilteredItems}/>

        {/* products */}
        <div className="md:col-span-3 lg:col-span-4">
          <div className="flex flex-1 justify-between bg-white p-2 rounded-xl items-center mb-5">
            <h1 className="font-semibold text-black text-xl ">{searchedCategory}</h1>
            <div className="flex gap-2 items-center">
              <p className="font-semibold">Sort By : </p>
              <select
              onChange={(e) => setSortBy(e.target.value)}
              className="outline-none p-1 bg-[#F2F3F7] text-black"
            >
              <option value="">Default</option>
              <option value="low-to-high">Price low to high</option>
              <option value="high-to-low">Price high to low</option>
              <option value="a-z">Alphabetically A-Z</option>
              <option value="z-a">Alphabetically Z-A</option>
              {/* <option value="old-to-new">Oldest First</option>
              <option value="new-to-old">Newest First</option> */}
            </select>
            </div> 
          </div>
          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {
           isLoading ? 
           <Loader />
           : 
          filteredItems && filteredItems.length > 0 ?  
          filteredItems.map((product, idx) => {
            return (
              <li
                key={idx}
                className="max-w-sm bg-white  border-gray-200 flex flex-col justify-between items-center p-4 border rounded-2xl"
              >
                <Link href={`/products/${product?.id}`}>
                <Image
  src={
    product?.image_path && product.image_path !== "null" // Ensure it's not an empty or "null" string
      ? product.image_path
      : product?.images?.length > 0
      ? product.images[0]
      : noImg
  }
  height={145}
  width={145}
  loading="lazy"
  alt={product?.name || "No Image Available"}
/>;
                </Link>
                <h3 className="text-sm font-medium mb-2 text-center text-black">
                  {product?.name}
                </h3>

                <p className="text-sm text-gray-800 text-center font-bold mb-4">
                  {product?.retails_price} ৳
                </p>

                <div className='flex flex-col gap-2 items-center lg:flex-row'>
                  <button 
                        onClick={() => handleBuy(product, 1)}
                        className="border-[#FF8800] text-nowrap border text-xs text-[#FF8800] w-full px-2 py-1.5 rounded-full font-semibold transition-colors "
                      >
                        Buy Now
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          handleCart(product, 1)
                        }}
                        className="bg-[#FF8800] text-nowrap border border-transparent text-xs text-white w-full px-2 py-1.5 rounded-full font-semibold transition-colors "
                      >
                        Add to Cart
                    </button>
                  </div>
              </li>
            );
          }) : <p className="text-black text-center">No products found</p>
          }
          </ul>
          
          {
            
              pages.length > 0 && 
              <div className="flex flex-col lg:flex-row justify-between text-black items-center mt-10 pagination gap-3  bg-[#f1f5f6] rounded-md p-2">
                <Pagination
                  currentPage={currentPage}
                  totalPage={totalPage}
                  onPageChange={(page) => setCurrentPage(page)}
                />
                <div className="lg:text-md text-xs text-center">
                  <p>Showing {currentPage} page of ({totalPage} page)</p>
                </div>
            </div>
            
          }
          
        </div>
        
      </div>

    </div>
  );
};

export default Page;
