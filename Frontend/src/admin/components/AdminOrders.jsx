import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/products/ProductsThunk";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [productsDetails, setProductsDetails] = useState({});
  const { allProducts } = useSelector((state) => state.ProductSliceProvider);
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllOrders = async () => {
      try {
        // Fetch orders
        const response = await axios.get("/api/order");
        setOrders(response.data);

        // Dispatch to get products and then update state
        await dispatch(getProducts());
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    getAllOrders();
  }, [dispatch]);

  useEffect(() => {
    if (allProducts.length) {
      const productMap = allProducts.reduce((acc, product) => {
        acc[product._id] = product;
        return acc;
      }, {});
      setProductsDetails(productMap);
    }
  }, [allProducts]);

  const deleteButton = async (id) => {
    try {
      await axios.delete(`/api/order/${id}`);
      const response = await axios.get("/api/order");
      setOrders(response.data);
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const cancelButton = async (id) => {
    try {
      await axios.put(`/api/order/cancel/${id}`);
      const response = await axios.get("/api/order");
      setOrders(response.data);
    } catch (error) {
      console.error("Error canceling order:", error);
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-semibold mb-5">Admin Orders</h1>
      <div className="overflow-x-auto">
        <table className="bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b-2 border-gray-300">ID</th>
              <th className="py-2 px-4 border-b-2 border-gray-300">Name</th>
              <th className="py-2 px-4 border-b-2 border-gray-300">Contact No</th>
              <th className="py-2 px-4 border-b-2 border-gray-300">Address</th>
              <th className="py-2 px-4 border-b-2 border-gray-300">Country</th>
              <th className="py-2 px-4 border-b-2 border-gray-300">State</th>
              <th className="py-2 px-4 border-b-2 border-gray-300">City</th>
              <th className="py-2 px-4 border-b-2 border-gray-300">Product</th>
              <th className="py-2 px-4 border-b-2 border-gray-300">Total Amount</th>
              <th className="py-2 px-4 border-b-2 border-gray-300">Payment Status</th>
              <th className="py-2 px-4 border-b-2 border-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id}>
                <td className="py-2 px-4 border-b border-gray-300">{index + 1}</td>
                <td className="py-2 px-4 border-b border-gray-300">
                  {order.shippingDetails.fname} {order.shippingDetails.lname}
                </td>
                <td className="py-2 px-4 border-b border-gray-300">{order.shippingDetails.phone}</td>
                <td className="table_address">
                  {order.shippingDetails.address1} {order.shippingDetails.address2}
                </td>
                <td className="py-2 px-4 border-b border-gray-300">{order.shippingDetails.country}</td>
                <td className="py-2 px-4 border-b border-gray-300">{order.shippingDetails.state}</td>
                <td className="py-2 px-4 border-b border-gray-300">{order.shippingDetails.city}</td>
                <td className="table-width">
                  {order.products.map((product, index) => {
                    const productDetail = productsDetails[product.productId];
                    return productDetail ? (
                      <div key={index} className="flex items-center space-x-2">
                        <img
                          src={productDetail.img}
                          alt={productDetail.title}
                          className="w-16 h-16 object-cover"
                        />
                        <span>{productDetail.title}</span>
                      </div>
                    ) : (
                      <div key={index} className="flex items-center space-x-2">
                        <span>Product not found</span>
                      </div>
                    );
                  })}
                </td>
                <td className="py-2 px-4 border-b border-gray-300">₹ {order.totalAmount}</td>
                <td className="py-2 px-4 border-b border-gray-300">Paid</td>
                <td className="py-2 px-4 border-b border-gray-300">
                  <button
                    onClick={() => cancelButton(order._id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded w-[100px] p-2"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => deleteButton(order._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded w-[100px] p-2 mt-4"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;
