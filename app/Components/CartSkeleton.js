const CartSkeleton = () => {
  return (
    <div className="bg-white min-h-screen w-11/12 mx-auto pt-5 poppins">
      <div className="pb-8 pt-16">
        <div className="h-8 bg-gray-200 rounded w-48 mb-6 animate-pulse"></div>

        <div className="rounded-md">
          <div className="overflow-x-auto rounded-md">
            <table className="w-full border-collapse rounded-md">
              <thead>
                <tr className="bg-gray-50 border">
                  <th className="py-4 px-4 text-left">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  </th>
                  <th className="py-4 px-4 text-left">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  </th>
                  <th className="py-4 px-4 text-left">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  </th>
                  <th className="py-4 px-4 text-left">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  </th>
                  <th className="py-4 px-4 text-right">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  </th>
                  <th className="py-4 px-4 text-right">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  </th>
                  <th className="py-4 px-4 text-center"></th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3].map((item) => (
                  <tr key={item} className="border">
                    <td className="py-4 px-4">
                      <div className="w-20 h-20 bg-gray-200 rounded-md animate-pulse"></div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="h-8 bg-gray-200 rounded animate-pulse w-24"></div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-20 ml-auto"></div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-24 ml-auto"></div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="h-5 w-5 bg-gray-200 rounded animate-pulse mx-auto"></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartSkeleton
