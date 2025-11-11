"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import useSWR from "swr"
import ProductCard from "@/app/Components/ProductCard"
import Pagination from "@/app/Components/pagination"
import Slider from "rc-slider"
import "rc-slider/assets/index.css"

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function ProductListing({ params }) {
  const searchParams = useSearchParams()
  const searchedCategory = searchParams.get("subcategory") || "All Products"
  const searchedTotal = searchParams.get("total") || "100"
  const limit = 20
  const totalPage = Math.ceil(Number.parseInt(searchedTotal) / limit)
  const { slug: id } = params

  const [filteredItems, setFilteredItems] = useState([])
  const [sortBy, setSortBy] = useState("")
  const [priceRange, setPriceRange] = useState([0, 0])
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(0)
  const [brands, setBrands] = useState([])
  const [selectedBrand, setSelectedBrand] = useState("")
  const [availableSizes, setAvailableSizes] = useState([])
  const [selectedSizes, setSelectedSizes] = useState([])
  const [availableColors] = useState(["Black", "White", "Blue", "Gray", "Red"])
  const [selectedColors, setSelectedColors] = useState([])

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  const [currentPage, setCurrentPage] = useState(() => {
    if (typeof window !== "undefined") {
      return Number.parseInt(sessionStorage.getItem(`currentPage-${id}`) || "1")
    }
    return 1
  })

  const { data: products, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API}/public/subcategorywise-products/${id}`,
    fetcher,
  )

  useEffect(() => {
    if (isMobileSidebarOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMobileSidebarOpen])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileSidebarOpen && !event.target.closest(".mobile-sidebar") && !event.target.closest(".filter-button")) {
        setIsMobileSidebarOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isMobileSidebarOpen])

  // initialize filters
  useEffect(() => {
    if (products?.data?.length) {
      setFilteredItems(products.data)

      // brands
      const uniqueBrands = [...new Set(products.data.map((item) => item.brand_name))]
      setBrands(uniqueBrands)

      // sizes
      const allSizes = products.data.flatMap((p) => p.product_variants?.map((v) => v.name) || [])
      setAvailableSizes([...new Set(allSizes)])

      // prices
      const prices = products.data.map((item) => item.retails_price || 0)
      const max = Math.max(...prices)
      const min = Math.min(...prices)
      setPriceRange([min, max])
      setMinPrice(min)
      setMaxPrice(max)
    }
  }, [products])

  // sorting
  useEffect(() => {
    const filtered = [...(products?.data || [])]

    if (sortBy === "low-to-high") {
      filtered.sort((a, b) => a.retails_price - b.retails_price)
    } else if (sortBy === "high-to-low") {
      filtered.sort((a, b) => b.retails_price - a.retails_price)
    } else if (sortBy === "a-z") {
      filtered.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortBy === "z-a") {
      filtered.sort((a, b) => b.name.localeCompare(a.name))
    }

    setFilteredItems(filtered)
  }, [sortBy, products])

  // filtering logic
  useEffect(() => {
    if (products?.data) {
      let filtered = [...products.data]

      // price filter
      filtered = filtered.filter((item) => item.retails_price >= priceRange[0] && item.retails_price <= priceRange[1])

      // brand filter
      if (selectedBrand) {
        filtered = filtered.filter((item) => item.brand_name === selectedBrand)
      }

      // size filter
      if (selectedSizes.length > 0) {
        filtered = filtered.filter((item) =>
          item.product_variants?.some((variant) => selectedSizes.includes(variant.name)),
        )
      }

      // color filter (basic match in product name)
      if (selectedColors.length > 0) {
        filtered = filtered.filter((item) =>
          selectedColors.some((c) => item.name.toLowerCase().includes(c.toLowerCase())),
        )
      }

      setFilteredItems(filtered)
    }
  }, [priceRange, selectedBrand, selectedSizes, selectedColors, products])

  // helpers
  const handleSizeToggle = (size) => {
    setSelectedSizes((prev) => (prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]))
  }

  const handleColorToggle = (color) => {
    setSelectedColors((prev) => (prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]))
  }

  const clearAllFilters = () => {
    setSelectedSizes([])
    setSelectedColors([])
    setSelectedBrand("")
    setPriceRange([minPrice, maxPrice])
    if (products?.data?.length) {
      setFilteredItems(products.data)
    }
  }

  const FilterContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Filters</h2>
        <button onClick={clearAllFilters} className="text-sm text-red-500 hover:underline md:hidden">
          Clear all
        </button>
      </div>

      {/* Price Filter */}
      <div>
        <h3 className="font-medium mb-2">Price</h3>
        <Slider range min={minPrice} max={maxPrice} value={priceRange} onChange={(val) => setPriceRange(val)} />
        <div className="flex justify-between text-sm text-gray-600 mt-2">
          <span>৳ {priceRange[0]}</span>
          <span>৳ {priceRange[1]}</span>
        </div>
      </div>

      {/* Sizes */}
      <div>
        <h3 className="font-medium mb-2">Size</h3>
        <div className="flex flex-wrap gap-2">
          {availableSizes.map((size) => (
            <button
              key={size}
              className={`px-3 py-1 border rounded-md text-sm ${
                selectedSizes.includes(size)
                  ? "bg-black text-white"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
              onClick={() => handleSizeToggle(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div>
        <h3 className="font-medium mb-2">Brand</h3>
        {brands.map((b) => (
          <label key={b} className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              checked={selectedBrand === b}
              onChange={() => setSelectedBrand(selectedBrand === b ? "" : b)}
            />
            {b}
          </label>
        ))}
      </div>

      {/* Colors */}
      <div>
        <h3 className="font-medium mb-2">Color</h3>
        <div className="flex flex-wrap gap-2">
          {availableColors.map((color) => (
            <button
              key={color}
              className={`px-3 py-1 rounded-full border text-sm ${
                selectedColors.includes(color) ? "bg-black text-white" : "bg-white text-gray-700 border-gray-300"
              }`}
              onClick={() => handleColorToggle(color)}
            >
              {color}
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl text-black">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6">Home / Collections / {searchedCategory}</div>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-8">
        <div className="flex justify-between items-center md:items-start w-full md:w-64">
          
             <h1 className="md:text-3xl text-xl font-serif font-medium text-gray-900">
              {searchedCategory} <span className="text-sm">({filteredItems.length})</span>
            </h1>
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="md:hidden filter-button p-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-1 text-sm"
              aria-label="Open filters"
            >
              
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              Filter
            </button>

           
         

          <button onClick={clearAllFilters} className="text-sm text-red-500 hover:underline hidden md:block">
            Clear all
          </button>
        </div>

        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <div className="relative">
            <select
              className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-4 pr-10 text-sm leading-5 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-300 w-[90vw] md:w-[180px]"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="">Sort by</option>
              <option value="low-to-high">Price: Low to High</option>
              <option value="high-to-low">Price: High to Low</option>
              <option value="a-z">Name: A to Z</option>
              <option value="z-a">Name: Z to A</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Desktop Filters */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <div className="sticky top-24">
            <FilterContent />
          </div>
        </div>

        {isMobileSidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" />}

        <div
          className={`fixed top-0 left-0 h-full w-80 bg-white z-50 transform transition-transform duration-300 ease-in-out md:hidden mobile-sidebar ${
            isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-6 h-full overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium">Filters</h2>
              <button
                onClick={() => setIsMobileSidebarOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-md"
                aria-label="Close filters"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <FilterContent />
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No products found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredItems.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {totalPage && totalPage > 1 ? (
  <div className="mt-12 flex justify-center">
    <Pagination
      currentPage={currentPage}
      totalPages={totalPage}
      onPageChange={setCurrentPage}
    />
  </div>
): ""}

        </div>
      </div>
    </div>
  )
}

// Skeleton
function ProductCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[3/4] rounded-md bg-gray-200"></div>
      <div className="mt-3 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  )
}
