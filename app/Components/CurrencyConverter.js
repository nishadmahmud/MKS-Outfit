"use client"
import { useEffect } from "react"
import useStore from "../CustomHooks/useStore"

const CurrencyConverter = ({ baseBDT, wholesalePrice }) => {
  const {
    selectedCountry,
    setSelectedCountry,
    countries,
    setConvertedPrice
  } = useStore()

  useEffect(() => {
    if (!selectedCountry) return;
    
    const price =
      selectedCountry.value === "BD"
        ? baseBDT
        : wholesalePrice;

    setConvertedPrice(price)
  }, [selectedCountry, baseBDT, wholesalePrice])

  
  const handleCountryChange = (e) => {
    const value = e.target.value
    const country = countries.find((c) => c.value === value)
    if (country) {
      setSelectedCountry(country)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white text-black rounded-lg shadow-md overflow-hidden border border-gray-200">
      <div className="p-5 hidden">
        <div className="space-y-2">
          <label htmlFor="currency-select" className="text-sm font-medium">
            Select the countryii
          </label>
          <select
            id="currency-select"
            value={selectedCountry?.value}
            onChange={handleCountryChange}
            className="w-full px-3 py-2 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {countries.map((country) => (
              <option key={country.value} value={country.value}>
                {country.symbol} {country.label} ({country.value})
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

export default CurrencyConverter
