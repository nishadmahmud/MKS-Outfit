"use client";

import Image from "next/image";
import Link from "next/link";
import noImg from "/public/no-image.jpg";

const Search = ({ searchedItem, setSearchText, setSearchedItem, searchBarRef }) => {
  const sanitizeSlug = (str) => {
    return str
      ?.toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  };

  const updateRecentViews = (product) => {
    if (!product?.id) return;

    let recentViews = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");

    recentViews = recentViews.filter((p) => p.id !== product.id);

    recentViews.unshift({
      id: product.id,
      name: product.name,
      image: product.image_path || (product.images && product.images[0]) || noImg,
      price: product.retails_price,
      discount: product.discount || 0,
    });

    if (recentViews.length > 6) recentViews.pop();

    localStorage.setItem("recentlyViewed", JSON.stringify(recentViews));
  };

  return (
    <>
      <div
        ref={searchBarRef}
        className="bg-white text-black min-w-[25rem] md:w-[20rem] lg:w-[36rem] p-5 absolute lg:top-[5rem] top-[10rem] z-[1000] lg:left-[33rem] lg:z-50 left-1/2 transform -translate-x-1/2 rounded-md max-h-[21.5rem] overflow-y-auto shadow-xl"
      >
        <h5 className="text-right">Products</h5>
        <div className="flex flex-col gap-3">
          {searchedItem && searchedItem.length > 0 ? (
            searchedItem.map((item, idx) => (
              <Link
                onClick={() => {
                  setSearchText("");
                  setSearchedItem([]);
                  updateRecentViews(item);
                }}
                href={`/products/${sanitizeSlug(item?.brand_name || item?.name)}/${item?.id}`}
                key={idx}
                className="flex gap-2 items-center z-50 hover:bg-gray-200"
              >
                {item?.images?.length > 0 ? (
                  <Image
                    src={item?.images[0] || noImg}
                    height={50}
                    width={50}
                    alt="mobile-phone"
                    quality={75}
                  />
                ) : item?.image_path ? (
                  <Image src={item.image_path || noImg} height={50} width={50} alt="product" />
                ) : (
                  <Image src={noImg || noImg} height={50} width={50} alt="mobile-phone" quality={75} />
                )}
                <h3 className="text-black text-sm font-medium z-50 text-wrap">{item.name}</h3>
              </Link>
            ))
          ) : (
            <p>No Products</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Search;
