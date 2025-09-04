export default function CartSkeleton() {
  return (
    <div className="container mx-auto px-4 pb-8 pt-16">
      {/* Shopping Cart Title */}
      <div className="h-8 w-48 bg-gray-200 rounded mb-6 animate-pulse"></div>

      {/* Desktop Cart Table Skeleton */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 border">
              <th className="py-4 px-4 text-left">
                <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
              </th>
              <th className="py-4 px-4 text-left">
                <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
              </th>
              <th className="py-4 px-4 text-left">
                <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
              </th>
              <th className="py-4 px-4 text-center">
                <div className="h-6 w-20 bg-gray-200 rounded animate-pulse mx-auto"></div>
              </th>
              <th className="py-4 px-4 text-right">
                <div className="h-6 w-20 bg-gray-200 rounded animate-pulse ml-auto"></div>
              </th>
              <th className="py-4 px-4 text-right">
                <div className="h-6 w-16 bg-gray-200 rounded animate-pulse ml-auto"></div>
              </th>
              <th className="py-4 px-4 text-center">
                <div className="h-6 w-8 bg-gray-200 rounded animate-pulse mx-auto"></div>
              </th>
            </tr>
          </thead>
          <tbody>
            {[...Array(3)].map((_, index) => (
              <tr key={index} className="border">
                <td className="py-4 px-4">
                  <div className="w-20 h-20 bg-gray-200 rounded animate-pulse"></div>
                </td>
                <td className="py-4 px-4">
                  <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-2"></div>
                </td>
                <td className="py-4 px-4">
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                </td>
                <td className="py-4 px-4">
                  <div className="h-8 w-24 bg-gray-200 rounded animate-pulse mx-auto"></div>
                </td>
                <td className="py-4 px-4">
                  <div className="h-6 w-16 bg-gray-200 rounded animate-pulse ml-auto"></div>
                </td>
                <td className="py-4 px-4">
                  <div className="h-6 w-20 bg-gray-200 rounded animate-pulse ml-auto"></div>
                </td>
                <td className="py-4 px-4">
                  <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse mx-auto"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cart Items Skeleton */}
      <div className="md:hidden space-y-4">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="border rounded-lg p-4">
            <div className="flex gap-4">
              <div className="w-20 h-20 bg-gray-200 rounded animate-pulse flex-shrink-0"></div>
              <div className="flex-1">
                <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-3"></div>
                <div className="flex justify-between items-center mb-3">
                  <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse"></div>
                </div>
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Summary Skeleton */}
      <div className="grid md:grid-cols-2 gap-8 mt-8">
        <div></div>
        <div className="bg-white rounded-lg p-4 border">
          <div className="space-y-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="flex justify-between items-center">
                <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-5 w-16 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
            <div className="pt-3 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <div className="flex items-center mb-4">
              <div className="h-4 w-4 bg-gray-200 rounded animate-pulse mr-2"></div>
              <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="h-12 w-full bg-gray-200 rounded animate-pulse"></div>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="w-10 h-6 bg-gray-200 rounded animate-pulse"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
