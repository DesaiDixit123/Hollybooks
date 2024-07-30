import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAddToCart, userRemoveCart } from "../../redux/ThunkApi";
import { NavLink } from "react-router-dom";

export default function CartDetails() {
  const { allProducts } = useSelector((state) => state.ProductSliceProvider);
  const { userData } = useSelector((state) => state.MySliceProvider);
  const [cart, setCart] = useState([]);
  const [productQuantities, setProductQuantities] = useState({});
  const [subTotal, setSubTotal] = useState({});
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userData && userData.cart) {
      setCart(userData.cart);
      const initialQuantities = {};
      const initialSubTotal = {};

      userData.cart.forEach((productId) => {
        initialQuantities[productId] = 1;

        const product = allProducts.find((p) => p._id == productId);

        if (product) {
          initialSubTotal[productId] = product.price;
        }

        setProductQuantities(initialQuantities);
        setSubTotal(initialSubTotal);
      });
    }
  }, [userData, allProducts]);

  const handleQuantityChange = (productId, change) => {
    setProductQuantities((prevQuantities) => {
      const newQuantities = {
        ...prevQuantities,
        [productId]: prevQuantities[productId] + change,
      };

      const product = allProducts.find((e) => e._id == productId);

      setSubTotal((prevSubTotals) => ({
        ...prevSubTotals,
        [productId]: newQuantities[productId] * product.price,
      }));
      return newQuantities;
    });
  };

  useEffect(() => {
    let totalSum = 0;
    for (let i in subTotal) {
      totalSum += subTotal[i];
    }
    setTotal(totalSum);
  }, [subTotal]);

  const handleRemoveFromCart = (productId) => {
    if (!userData) {
      alert("Please log in to remove items from your cart.");
      return;
    }

    dispatch(
      userRemoveCart({
        productId,
        userId: userData._id,
      })
    );
  };

  return (
    <>
      <div className="pt-[50px] flex">
        <div className="w-2/3 pr-5">
          <h1 className="font-bold text-[50px]">Cart</h1>
          <div className="overflow-x-auto">
            <table className="min-w-[50%] divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {allProducts.map((product) =>
                  cart.includes(product._id) ? (
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex">
                          <button
                            className="w-[30px] h-[30px] rounded-[100%] bg-yellow-600 text-black font-bold text-[22px] flex justify-center items-center"
                            onClick={() => handleQuantityChange(product._id, -1)}
                          >
                            -
                          </button>
                          <input
                            type="text"
                            value={productQuantities[product._id] || 1}
                            readOnly
                            className="w-[50px] text-center outline-none font-bold text-[25px]"
                          />
                          <button
                            className="w-[30px] h-[30px] rounded-[100%] bg-yellow-600 text-black font-bold text-[22px] flex justify-center items-center"
                            onClick={() => handleQuantityChange(product._id, +1)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <span className="text-red-600">
                          ₹ {subTotal[product._id]}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button onClick={() => handleRemoveFromCart(product._id)}>
                          Remove
                        </button>
                      </td>
                    </tr>
                  ) : null
                )}
                <tr>
                  <td
                    colSpan={4}
                    className="text-[20px] font-bold text-right px-5 py-4"
                  >
                    Subtotals:
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-[20px] font-bold">
                    ₹ {total}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="w-1/3 pl-5 pt-[70px]">
          <div className="bg-gray-100 p-5 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Checkout</h2>
            <div className="mb-4">
              <p className="text-lg">Total Amount:</p>
              <p className="text-2xl font-bold">₹ {total}</p>
            </div>
            <NavLink to={"/processToCheckout"} state={{ total }}  className="w-[300px] bg-blue-600 text-white py-3 px-4 rounded-lg font-bold text-lg">
              Proceed to Checkout
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}
