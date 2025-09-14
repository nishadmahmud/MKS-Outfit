const mensTShirtCategoryId = 7346;

export const mensTShirtCategory = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/public/categorywise-products/${mensTShirtCategoryId}&limit=12`
  );
  const data = await res.json();
  return data;
};
