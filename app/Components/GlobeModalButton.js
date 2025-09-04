"use client";

import React, { useContext, useEffect, useState } from "react";
import { Globe } from "lucide-react";
import RegionModal from "./RegionModal";
import { storeContext } from "../StoreContext/store";
import Select from "react-select";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import useStore from "../CustomHooks/useStore";

countries.registerLocale(enLocale);

const GlobeModalButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { selectedCountry, setSelectedCountry } = useContext(storeContext);

  const { country, setCountry } = useStore();
  const [countryOptions, setCountryOptions] = useState([]);

  // Load countries
  useEffect(() => {
    const countryNames = countries.getNames("en", { select: "official" });
    const formattedCountries = Object.entries(countryNames).map(([code, name]) => ({
      value: code,
      label: name,
    }));
    setCountryOptions(formattedCountries);
  }, []);

  // Load from localStorage on mount, or default to Bangladesh
useEffect(() => {
  if (typeof window === "undefined") return;

  const stored = localStorage.getItem("selectedCountry");
  let initialCountry;

  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (parsed.value && parsed.label) {
        initialCountry = parsed;
      } else {
        console.error("Stored country missing value/label, defaulting to Bangladesh");
      }
    } catch (e) {
      console.error("Invalid stored country format, defaulting to Bangladesh");
    }
  }

  if (!initialCountry) {
    initialCountry = { value: "BD", label: "Bangladesh" };
    localStorage.setItem("selectedCountry", JSON.stringify(initialCountry));
    return;
  }

  setSelectedCountry(initialCountry);
  setCountry(initialCountry);
}, []);


useEffect(() => {
  if (selectedCountry?.value && selectedCountry?.label) {
    localStorage.setItem("selectedCountry", JSON.stringify(selectedCountry));
    setCountry(selectedCountry);
  }
}, [selectedCountry, setCountry]);

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)} className="py-2 md:text-black text-teal-700">
        <Globe />
      </button>

      <RegionModal onClose={() => setIsModalOpen(false)} isOpen={isModalOpen}>
        <h2 className="text-xl font-semibold mb-4">Select a Country</h2>

        <Select
          options={countryOptions}
          onChange={(option) => {
            setSelectedCountry(option);
            setIsModalOpen(false);
          }}
          value={selectedCountry}
          className="text-black"
        />
      </RegionModal>
    </div>
  );
};

export default GlobeModalButton;
