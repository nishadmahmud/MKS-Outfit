import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import RangeSlider from "react-range-slider-input";
const FilterProduct = ({products,setFilteredItems}) => {
    const [range, setRange] = useState([0, 0]);
    const [max, setMax] = useState(100);
    const [isInStock,setIsInStock] = useState(false);
    const [storage, setStorage] = useState("");
    ;
    const [isChecked, setIsChecked] = useState(false);
    const [selectedColor, setSelectedColor] = useState(null);
    // const [selectedBrand,setSelectedBrand] = useState('');
    const [isExpanded, setIsExpanded] = useState(true);
    const [isStorageExpanded, setIsStorageExpanded] = useState(true);
  
    const [contentHeight, setContentHeight] = useState(undefined);
   
    const contentRef = useRef(null);

     useEffect(() => {
      let maximum = 0;
       if(products){
             maximum = Math.max(...products.map(item => item.retails_price,-Infinity));
               setRange([0, maximum]);
               setMax(maximum)
       }      
    },[products])

      const uniqueStorageList = products ? [...new Set(products.filter(item => item.storage !== null).map(item => item.storage))] : null;
      const uniqueRamList = products ? [...new Set(products.filter(item => item.ram !== null).map(item => item.ram))] : null;
      

      useEffect(() => {
          if (!products) return;
            const newList = [...products]
            const rangedProducts = newList.filter(item => item.retails_price >= range[0] && item.retails_price <= range[1]);
            setFilteredItems(rangedProducts);
      },[range,products])

     


      useEffect(() => {
        if(!products) return
        if (!isInStock){
          setFilteredItems(products);
          return
        } 
          const newList = [...products]
          const stockProducts = newList.filter(item => item.status !==  "Stock out");
          setFilteredItems(stockProducts);
      },[isInStock])


      useEffect(() => {
        if(!products) return
        if (!storage){
          setFilteredItems(products);
          return
        } 
          const newList = [...products]
          const storageBasedProducts = newList.filter(item => item.storage ===  storage);
          setFilteredItems(storageBasedProducts);
      },[isInStock])



        useEffect(() => {
            if (contentRef.current) {
              setContentHeight(contentRef.current.scrollHeight)
            }
          }, [isStorageExpanded])



    return (
        <div className="col-span-1 border border-gray-300 rounded-xl text-black space-y-5">
          <div className="bg-white p-3 rounded-xl">
            <h4 className=" mb-3">Price Range</h4>
            <RangeSlider
              min={0}
              max={max}
              value={range}
              onInput={(value) => setRange(value)}
            />
            <div className="flex justify-between gap-2 mt-5">
              <input
                type="text"
                value={range[0]}
                className="w-1/2 outline-none bg-[#F2F3F7]"
              
              />
              <input
                type="text"
                value={range[1]}
                className="w-1/2 outline-none bg-[#F2F3F7]"
              />
          </div>
          </div>
          {/* availability checkbox */}
          <div className="p-3 bg-white rounded-lg border mx-2">
            <div className="w-full max-w-xs rounded-lg ">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex w-full items-center justify-between text-left"
                aria-expanded={isExpanded}
              >
                <span className="text-base font-medium text-gray-900">Availability</span>
                {isExpanded ? (
                  <ChevronUp className="h-5 w-5 text-gray-500 transition-transform duration-300" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500 transition-transform duration-300" />
                )}
              </button>
              <div
                ref={contentRef}
                className={`mt-3 overflow-hidden transition-all duration-300 ease-in-out ${
                  isExpanded ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ maxHeight: isExpanded ? contentHeight : 0 }}
              >
                <div>
                    <input type="checkbox" name="in-stock" id="in-stock" checked={isInStock} value={isInStock} onChange={() => setIsInStock(!isInStock)}/>
                    <label htmlFor="in-stock" className="ml-2 text-base">In Stock</label>
                    </div>
                    <div>
                     
                    </div>
                    <div>
                    {/* <input type="checkbox" name="pre-order" id="pre-order" />
                    <label htmlFor="pre-order" className="ml-2 text-base">Pre Order</label> */}
                    </div>
              </div>
            </div>
          </div>

         

          {/* size checkbox */}
          <div className="p-3 bg-white rounded-lg border mx-2">
              <button
                onClick={() => setIsSizeExpanded(!isSizeExpanded)}
                className="flex w-full items-center justify-between text-left"
                aria-expanded={isTypeExpanded}
              >
                <span className="text-base font-medium text-gray-900">Size</span>
                {isSizeExpanded ? (
                  <ChevronUp className="h-5 w-5 text-gray-500 transition-transform duration-300" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500 transition-transform duration-300" />
                )}
              </button>
              <div
                ref={contentRef}
                className={`mt-3 overflow-hidden transition-all duration-300 ease-in-out ${
                  isSizeExpanded ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ maxHeight: isSizeExpanded ? contentHeight : 0 }}
              >
                <div>
                    <input type="checkbox" name="in-stock" id="12/128" />
                    <label htmlFor="12/128" className="ml-2 text-base">12/128</label>
                    </div>
                    <div>
                    <input type="checkbox" name="online-order" id="12/256" />
                    <label htmlFor="12/256" className="ml-2 text-base">12/256</label>
                    </div>
                    <div>
                    <input type="checkbox" name="pre-order" id="16/512" />
                    <label htmlFor="16/512" className="ml-2 text-base">16/512</label>
                    </div>
              </div>
          </div>

         


          <div className="color-filter bg-white p-3 rounded-lg">
            {/* <h3 className="font-semibold text-sm mb-4">BY COLOR</h3> */}
            <div className="flex gap-2">
              {colors.map((color, idx) => (
                <input
                  type="checkbox"
                  checked={color === selectedColor && isChecked}
                  key={idx}
                  value={color}
                  onClick={(e) => {
                    setSelectedColor(color), colorChecked(e);
                  }}
                  className={`cursor-pointer rounded-full border-2 border-gray-300 appearance-none ${
                    selectedColor === color ? "border-gray-800" : ""
                  }`}
                  style={{
                    backgroundColor: color,
                    width: "30px",
                    height: "30px",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
    );
};

export default FilterProduct;