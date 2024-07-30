/* eslint-disable react/prop-types */
import  { useState, useEffect } from 'react';

const AdminUpdateBooks = ({ product, onUpdate }) => {
  const [updatedProduct, setUpdatedProduct] = useState({ ...product });

  useEffect(() => {
    setUpdatedProduct(product);
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct({ ...updatedProduct, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(updatedProduct);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-700 p-4 rounded">
      <h3 className="text-xl font-bold text-white mb-4">Update Product</h3>
      <div className="mb-4">
        <label className="block text-white mb-2">img1</label>
        <input
          type="text"
          name="img"
          value={updatedProduct.img}
          onChange={handleChange}
          className="w-full p-2 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-white mb-2">img2</label>
        <input
          type="text"
          name="img1"
          value={updatedProduct.img1}
          onChange={handleChange}
          className="w-full p-2 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-white mb-2">img3</label>
        <input
          type="text"
          name="img2"
          value={updatedProduct.img2}
          onChange={handleChange}
          className="w-full p-2 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-white mb-2">img4</label>
        <input
          type="text"
          name="img3"
          value={updatedProduct.img3}
          onChange={handleChange}
          className="w-full p-2 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-white mb-2">img5</label>
        <input
          type="text"
          name="img4"
          value={updatedProduct.img4}
          onChange={handleChange}
          className="w-full p-2 rounded"
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-white mb-2">Title</label>
        <input
          type="text"
          name="title"
          value={updatedProduct.title}
          onChange={handleChange}
          className="w-full p-2 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-white mb-2">Price</label>
        <input
          type="number"
          name="price"
          value={updatedProduct.price}
          onChange={handleChange}
          className="w-full p-2 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-white mb-2">Discount</label>
        <input
          type="number"
          name="dis"
          value={updatedProduct.dis}
          onChange={handleChange}
          className="w-full p-2 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-white mb-2">Quantity</label>
        <input
          type="number"
          name="qnt"
          value={updatedProduct.qnt}
          onChange={handleChange}
          className="w-full p-2 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-white mb-2">Description</label>
        <textarea
          name="discription"
          value={updatedProduct.discription}
          onChange={handleChange}
          className="w-full p-2 rounded"
        />
      </div>
      <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Update
      </button>
    </form>
  );
};

export default AdminUpdateBooks;
