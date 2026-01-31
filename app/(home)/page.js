import HeroSlider from "../Components/HeroSlider";
import BannerSection from '../Components/BannerSection';
import FeaturedCategories from '../Components/FeaturedCategories';
import NewArrivalUi from "../Components/NewArrivalUi";
import PromotionModal from "../Components/PromotionModal";
import BrandMarquee from "../Components/BrandMarquee";
import TrendingNow from "../Components/TrendingNow";
import Banner from "../Components/Banner";
import Banner2 from "../Components/Banner2";
import CategoryShowcase from "../Components/CategoryShowcase";



export const userId = 230;
export const fetcher = (url) => fetch(url).then(res => res.json());



export default async function Home() {


  const bannerRes = await fetch(`${process.env.NEXT_PUBLIC_API}/get-banners/${userId}`, {
    cache: 'no-cache'
  })
  const banner = await bannerRes.json();

  const categoriesRes = await fetch(`${process.env.NEXT_PUBLIC_API}/public/categories/${userId}`, {
    cache: 'no-cache'
  });
  const categoriesData = await categoriesRes.json();
  const categories = categoriesData?.data || [];

  // Get first 4 categories for showcase
  const showcaseCategories = categories.slice(0, 4);

  // Fetch products for these 4 categories
  const showcaseData = await Promise.all(showcaseCategories.map(async (category) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/public/categorywise-products/${category.category_id}?page=1&limit=8`, {
        cache: 'no-cache'
      });
      const data = await res.json();
      return {
        ...category,
        products: data?.data || []
      };
    } catch (error) {
      console.error(`Error fetching products for category ${category.name}:`, error);
      return {
        ...category,
        products: []
      };
    }
  }));




  return (
    <>
      {/* <SelectRegionModal></SelectRegionModal> */}
      <PromotionModal />
      <HeroSlider />
      {/* <BrandMarquee /> */}
      <div className="pb-10">
        <FeaturedCategories />
        <NewArrivalUi />
        <Banner banner={banner}></Banner>
        <TrendingNow></TrendingNow>

        {/* Dynamic Category Showcases - Remaining */}
        {showcaseData.slice(2).map((category, index) => (
          <CategoryShowcase
            key={category.category_id || index + 2}
            title={category.name}
            bannerImage={category.image_url || "https://images.unsplash.com/photo-1548624313-0396c75e4b1a?q=80&w=1000&auto=format&fit=crop"}
            products={category.products}
            categoryLink={`/category/${category.category_id}?category=${encodeURIComponent(category.name)}`}
          />
        ))}

        <Banner2 banner={banner}></Banner2>



        {/* Dynamic Category Showcases - First 2 */}
        {showcaseData.slice(0, 2).map((category, index) => (
          <CategoryShowcase
            key={category.category_id || index}
            title={category.name}
            bannerImage={category.image_url || "https://images.unsplash.com/photo-1548624313-0396c75e4b1a?q=80&w=1000&auto=format&fit=crop"}
            products={category.products}
            categoryLink={`/category/${category.category_id}?category=${encodeURIComponent(category.name)}`}
          />
        ))}
        {/* <SmallBanner banner={banner}/> */}

        {/* <VideoSection></VideoSection> */}
        {/* <BannerSection categories={categories} banner={banner}/> */}
        {/* <HalfSelveePolo></HalfSelveePolo> */}
        {/* <OfferPage categories={categories}></OfferPage> */}
        {/* <BenefitsSection></BenefitsSection> */}
      </div>

    </>
  );
}




