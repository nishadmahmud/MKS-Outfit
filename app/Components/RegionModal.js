// components/RegionModal.js
import React from "react";

const RegionModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center 
                 bg-black bg-opacity-40 h-screen backdrop-blur-sm 
                 transition-opacity duration-300"
    >
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative transform transition-transform duration-300 scale-95 hover:scale-100">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default RegionModal;
