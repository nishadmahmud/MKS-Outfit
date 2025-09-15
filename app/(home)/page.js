
import HeroSlider from "../Components/HeroSlider";
import BannerSection from '../Components/BannerSection';
import FeaturedCategories from '../Components/FeaturedCategories';
import NewArrival from "../Components/NewArrival";
import PromotionModal from "../Components/PromotionModal";
import SmallBanner from "../Components/SmallBanner";
import OfferPage from "../Components/OfferPage";
import HalfSelveePolo from "../Components/HalfSelveePolo";
import BenefitsSection from "../Components/BenefitsSection";
import VideoSection from "../Components/VideoSection";
import BrandMarquee from "../Components/BrandMarquee";
import TrendingNow from "../Components/TrendingNow";
import Banner from "../Components/Banner";
import Banner2 from "../Components/Banner2";
import MensCollection from "../Components/MensCollection";


export const userId = 230;
export const fetcher = (url) => fetch(url).then(res => res.json());



export default async function Home() {


  const bannerRes = await fetch(`${process.env.NEXT_PUBLIC_API}/get-banners/${userId}`,{
    cache : 'no-cache'
  })
  const banner = await bannerRes.json();

  const categoriesRes = await fetch(`${process.env.NEXT_PUBLIC_API}/public/categories/${userId}`,{
    cache : 'no-cache'
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
        <NewArrival /> 
        <Banner banner={banner}></Banner>
        <TrendingNow></TrendingNow>
        <Banner2 banner={banner}></Banner2>
        <MensCollection></MensCollection>
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




