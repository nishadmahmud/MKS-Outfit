"use client";

import { House } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Breadcrumbs = () => {
  const pathname = usePathname();
  const pathArray = pathname.split("/").filter((path) => path);

  return (
    <nav className="text-gray-800 text-sm my-4 font-medium mt-3 md:mt-4">
      <ul className="flex items-center space-x-2">
        <li>
          <Link href="/">
            <span className="text-gray-800 hover:underline text-xs"><House size={13}></House></span>
          </Link>
        </li>
        {pathArray.slice(0, -1).map((path, index) => {  // Exclude last item
          const href = "/" + pathArray.slice(0, index + 1).join("/");
          const formattedPath = path.replace(/-/g, " "); // Convert hyphens to spaces

          return (
            <li key={index} className="flex items-center text-xs">
              <span className="mx-2">/</span>
              <div>
                <span className="text-gray-800 hover:underline capitalize">
                  {formattedPath}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
