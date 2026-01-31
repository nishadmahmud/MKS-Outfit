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
  const categories = await categoriesRes.json();




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

        <CategoryShowcase
          title="Winter Collection"
          bannerImage="https://images.unsplash.com/photo-1548624313-0396c75e4b1a?q=80&w=1000&auto=format&fit=crop"
          categoryLink="/category/winter"
        />
        <CategoryShowcase
          title="Women's Sharee"
          bannerImage="https://images.unsplash.com/photo-1583391733958-e026639f18b7?q=80&w=1000&auto=format&fit=crop"
          categoryLink="/category/sharee"
        />

        <Banner2 banner={banner}></Banner2>

        <CategoryShowcase
          title="Kids (Boys)"
          bannerImage="https://images.unsplash.com/photo-1519238263496-6362d74c1123?q=80&w=1000&auto=format&fit=crop"
          categoryLink="/category/kids-boys"
        />
        <CategoryShowcase
          title="Kids (Girls)"
          bannerImage="https://images.unsplash.com/photo-1519457431-44ccd64a579b?q=80&w=1000&auto=format&fit=crop"
          categoryLink="/category/kids-girls"
        />
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




