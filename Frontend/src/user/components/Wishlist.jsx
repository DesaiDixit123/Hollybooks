
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userRemoveToWishlistAPI } from "../../redux/ThunkApi";

export default function Wishlist() {
  const dispatch = useDispatch();
  const { allProducts } = useSelector((state) => state.ProductSliceProvider);
  const { userData } = useSelector((state) => state.MySliceProvider);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    if (userData && userData.wishlist) {
      setWishlist(userData.wishlist);
    }
  }, [userData]);


  const handleRemoveFromWishlist = (productId) => {
    if (!userData) {
      alert("Please log in to remove items from your wishlist.");
      return;
    }
    
    dispatch(
      userRemoveToWishlistAPI({
        productId,
        userId: userData._id,
      })
    )
  };

 
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Your Wishlist</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {allProducts.map((product) =>
              userData?.wishlist.includes(product._id) ? (
                <tr key={product._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      className="h-16 w-16 object-cover"
                      src={product.img}
                      alt={product.title}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {product.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleRemoveFromWishlist(product._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ) : null
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
