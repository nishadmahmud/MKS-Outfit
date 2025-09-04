'use client'
import React, { useContext } from 'react';
import { X } from 'lucide-react';
import CurrencyConverter from './CurrencyConverter';
import { storeContext } from '../StoreContext/store'; 

const SelectRegionModal = () => {
  const { isSelectRegion, setIsSelectRegion } = useContext(storeContext);

  const handleClose = () => {
    setIsSelectRegion(false);
  };

  if (!isSelectRegion) return null;

  return (
    <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center z-[9999] items-center px-4">
      <dialog
        open
        className="relative p-0.5 lg:p-1 rounded-lg flex flex-col justify-center bg-white text-black"
      >

        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-30 bg-red-500 hover:bg-red-600 p-1 rounded-full shadow-lg transition-all duration-200 hover:scale-110 group focus:outline-none focus:ring-2 focus:ring-red-300"
          aria-label="Close promotion"
        >
          <X className="w-4 h-4 text-white group-hover:text-gray-100 transition-colors duration-200" />
        </button>

        {/* Currency Converter */}
        {/* <CurrencyConverter baseBDT={500} wholesalePrice={800}  /> */}
      </dialog>
    </div>
  );
};

export default SelectRegionModal;
