import { ScaleLoader } from "react-spinners";
export default function Loader() {
  return <div className="fixed inset-0 flex items-center justify-center bg-white z-[9999]">
    {/* <ScaleLoader color='#115e59'/> */}
    <div>
    <svg className="loaderSvg" viewBox="0 0 1320 300">
        <text className="loaderText" x="50%" y="50%" dy=".35em" text-anchor="middle">
            Morshed Mart
        </text>
    </svg>
</div>    
</div>
}