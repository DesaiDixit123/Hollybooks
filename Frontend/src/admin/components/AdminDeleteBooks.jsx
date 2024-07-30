import { useState } from 'react';
import axios from 'axios';

const DeleteProduct = () => {
  const [id, setId] = useState('');

  const handleDelete = async () => {
    try {
      // Make sure to include the product ID in the URL
      const response = await axios.delete(`/api/products/${id}`);
      alert('Product deleted successfully');
      setId(''); // Clear input field after successful deletion
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete the product');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 p-4">
      <div className="bg-gray-900 p-8 rounded shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-white mb-6">Delete Product</h2>
        <div className="mb-4">
          <label className="block text-white mb-1" htmlFor="id">Product ID</label>
          <input
            type="text"
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white"
            placeholder="Enter Product ID"
            required
          />
        </div>
        <button 
          onClick={handleDelete} 
          className="w-full p-2 rounded bg-red-600 text-white hover:bg-red-500"
        >
          Delete Product
        </button>
      </div>
    </div>
  );
};

export default DeleteProduct;
