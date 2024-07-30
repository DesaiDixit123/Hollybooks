import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteProduct,
  getProducts,
  updateProduct,
} from "../../redux/products/ProductsThunk";
import AdminUpdateBooks from "./AdminUpdateBooks";
import AdminAddBooks from "./AdminAddBooks";
import { NavLink } from "react-router-dom";
// import UpdateProductForm from './UpdateProductForm'; // Import your UpdateProductForm component

const AdminProductsList = () => {
  const dispatch = useDispatch();
  const { allProducts, loading, error } = useSelector(
    (state) => state.ProductSliceProvider
  );

  const [editMode, setEditMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productPerPage = 5;

  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;

  const currentProducts = allProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handleDelete = (productId) => {
    dispatch(deleteProduct(productId))
      .unwrap()
      .then(() => {
        dispatch(getProducts());
      })
      .catch((err) => {
        console.error("Failed to delete product: ", err);
      });
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setEditMode(true);
  };

  const handleUpdate = (updatedProduct) => {
    dispatch(updateProduct(updatedProduct))
      .unwrap()
      .then(() => {
        dispatch(getProducts());
        setEditMode(false);
        setSelectedProduct(null);
      })
      .catch((err) => {
        console.error("Failed to update product: ", err);
      });
  };

  const handleAddNewBook = () => {
    // Logic to add a new book or redirect to a new book form
    <AdminAddBooks />;
  };

  const handeleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };
  if (loading) {
    return <div className="text-white">Loading products...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(allProducts.length / productPerPage); i++) {
      pageNumbers.push(i);
    }
    return pageNumbers.map((number) => (
      <button
        key={number}
        id={number}
        onClick={handeleClick}
        className={`${
          currentPage === Number ? "bg-blue-500" : "bg-gray-500"
        } hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mx-1`}
      >
        {number}
      </button>
    ));
  };
  return (
    <div className="min-h-screen bg-gray-800 p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Products List</h2>
        <NavLink
          to={"/admin/addbooks"}
          onClick={handleAddNewBook}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Add New Book
        </NavLink>
      </div>
      {editMode ? (
        <AdminUpdateBooks product={selectedProduct} onUpdate={handleUpdate} />
      ) : (
        <>
        <div className="overflow-y-auto max-h-96">

          <table className="w-full bg-gray-900 text-white border border-gray-700 rounded">
            <thead>
              <tr>
                <th className="p-2 border-b">ID</th>
                <th className="p-2 border-b">Image1</th>
                <th className="p-2 border-b">Image2</th>
                <th className="p-2 border-b">Image3</th>
                <th className="p-2 border-b">Image4</th>
                <th className="p-2 border-b">Image5</th>
                <th className="p-2 border-b">Title</th>
                <th className="p-2 border-b">Price</th>
                <th className="p-2 border-b">Discount</th>
                <th className="p-2 border-b">Quantity</th>
                <th className="p-2 border-b">Description</th>
                <th className="p-2 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.length > 0 ? (
                currentProducts.map((product, index) => {
                  const discriptionWord = product.discription.split(" ");
                  const discriptionTitle =
                    discriptionWord.length > 5
                      ? `${discriptionWord.slice(0, 10).join("")}...`
                      : product.discription;
                  return (
                    <>
                      <tr key={product._id}>
                        <td className="p-2 border-b">{indexOfFirstProduct + index +1}</td>
                        <td className="p-2 border-b">
                          <img
                            src={product.img}
                            alt={product.title}
                            className="w-16 h-16 object-cover"
                          />
                        </td>
                        <td className="p-2 border-b">
                          <img
                            src={product.img1}
                            alt={product.title}
                            className="w-16 h-16 object-cover"
                          />
                        </td>
                        <td className="p-2 border-b">
                          <img
                            src={product.img2}
                            alt={product.title}
                            className="w-16 h-16 object-cover"
                          />
                        </td>
                        <td className="p-2 border-b">
                          <img
                            src={product.img3}
                            alt={product.title}
                            className="w-16 h-16 object-cover"
                          />
                        </td>
                        <td className="p-2 border-b">
                          <img
                            src={product.img4}
                            alt={product.title}
                            className="w-16 h-16 object-cover"
                          />
                        </td>
                        <td className="p-2 border-b">{product.title}</td>
                        <td className="p-2 border-b">₹{product.price}</td>
                        <td className="p-2 border-b">{product.dis}%</td>
                        <td className="p-2 border-b">{product.qnt}</td>
                        <td className="p-2 border-b">{discriptionTitle}</td>
                        <td className="p-2 border-b">
                          <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2 w-[100px]"
                            onClick={() => handleEdit(product)}
                          >
                            Edit
                          </button>
                          <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded w-[100px] mt-[30px]"
                            onClick={() => handleDelete(product._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="8" className="p-2 text-center">
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
          <div className="flex justify-center mt-4">{renderPageNumbers()}</div>
        </>
      )}
    </div>
  );
};

export default AdminProductsList;
