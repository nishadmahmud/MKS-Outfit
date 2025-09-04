  const solidTshirtCategoryId = 6750;
  const summerCollections = 6785;
  const halfSelveePoloCategoryId = 6797;

export const solidShirtCategory = async() => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/public/categorywise-products/${solidTshirtCategoryId}&limit=12`);
    const data = await res.json();
    return data
};
export const summerCollectionCategory = async() => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/public/categorywise-products/${summerCollections}&limit=12`);
    const data = await res.json();
    return data
};
export const halfSleveCategory = async() => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/public/categorywise-products/${halfSelveePoloCategoryId}&limit=12`);
    const data = await res.json();
    return data
};
