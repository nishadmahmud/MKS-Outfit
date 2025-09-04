
import HeroSlider from "../Components/HeroSlider";
import BannerSection from '../Components/BannerSection';
import FeaturedCategories from '../Components/FeaturedCategories';
import NewArrival from "../Components/NewArrival";
import PromotionModal from "../Components/PromotionModal";
import SmallBanner from "../Components/SmallBanner";
import MensBanner from "../Components/MensBanner";
import SolidTshirt from "../Components/SolidTshirt";
import OfferPage from "../Components/OfferPage";
import HalfSelveePolo from "../Components/HalfSelveePolo";
import BenefitsSection from "../Components/BenefitsSection";
import VideoSection from "../Components/VideoSection";
import SummerCollection from "../Components/SummerCollection";
import BrandMarquee from "../Components/BrandMarquee";


export const userId = 203;
export const fetcher = (url) => fetch(url).then(res => res.json());



export default async function Home() {

  const promotionRes = await fetch(`${process.env.NEXT_PUBLIC_API}/latest-ecommerce-offer-list/${userId}`);
  const promotion = await promotionRes.json();

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
      <PromotionModal promotionBanner={promotion?.data[0]}/>
      <HeroSlider />
      {/* <BrandMarquee /> */}
      <div>
        {/* <FeaturedCategories /> */}
        {/* <NewArrival banner={banner}/>  */}
        {/* <MensBanner banner={banner}></MensBanner> */}
        {/* <SummerCollection></SummerCollection> */}
        {/* <SmallBanner banner={banner}/> */}
        {/* <SolidTshirt></SolidTshirt> */}
        {/* <VideoSection></VideoSection> */}
        {/* <BannerSection categories={categories} banner={banner}/> */}
        {/* <HalfSelveePolo></HalfSelveePolo> */}
        {/* <OfferPage categories={categories}></OfferPage> */}
        {/* <BenefitsSection></BenefitsSection> */}
      </div>
        
    </>
  );
}




