'use client'

import { useState } from "react";
import { InputHTMLAttributes } from "react";

export default function FloatingLabelInput({ placeholder, value, onChange, type, name, icon: Icon}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative w-full">
      <input
      
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full px-2 py-2.5 text-base bg-transparent border 
                   border-gray-300 focus:border-gray-800 focus:outline-none 
                   transition-colors duration-300 text-black rounded-md"
      />
      <label
        className={`absolute flex items-center gap-1.5 left-0 transition-all duration-300 ease-in-out px-2 pointer-events-none
          ${isFocused || value ? "top-0 text-sm text-gray-800 -translate-y-4 pl-0 bg-white" : "top-2.5 text-base text-gray-400"}
        `}
      >
        {/* <span className="text-red-500">* </span> */}
      {
        Icon ? <Icon className="w-4 h-4" /> : ""
      }
        {placeholder}
      </label>
    </div>
  );
}
