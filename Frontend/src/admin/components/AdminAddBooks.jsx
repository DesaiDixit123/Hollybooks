import  { useState } from 'react';
import axios from 'axios';

const AdminAddBooks = () => {
  const [formData, setFormData] = useState({
    img: '',
    img1: '',
    img2: '',
    img3: '',
    img4: '',
    title: '',
    price: '',
    dis: '',
    qnt: '',
    discription: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/products', formData);
      console.log('Book added successfully:', response.data);
      // Reset form or show success message
      setFormData({
        img: '',
        img1: '',
        img2: '',
        img3: '',
        img4: '',
        title: '',
        price: '',
        dis: '',
        qnt: '',
        discription: '',
      });
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 p-4">
      <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-white mb-6">Add Books</h2>
        
        <div className="mb-4">
          <label className="block text-white mb-1" htmlFor="img">Image1 URL</label>
          <input
            type="text"
            name="img"
            id="img"
            value={formData.img}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-white mb-1" htmlFor="img1">Image2 URL</label>
          <input
            type="text"
            name="img1"
            id="img1"
            value={formData.img1}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-white mb-1" htmlFor="img2">Image3 URL</label>
          <input
            type="text"
            name="img2"
            id="img2"
            value={formData.img2}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-white mb-1" htmlFor="img3">Image4 URL</label>
          <input
            type="text"
            name="img3"
            id="img3"
            value={formData.img3}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-white mb-1" htmlFor="img4">Image5 URL</label>
          <input
            type="text"
            name="img4"
            id="img4"
            value={formData.img4}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-white mb-1" htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />
        </div>
        
        <div className="flex gap-4 mb-4">
          <div className="w-full">
            <label className="block text-white mb-1" htmlFor="price">Price</label>
            <input
              type="number"
              name="price"
              id="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div className="w-full">
            <label className="block text-white mb-1" htmlFor="dis">Discount</label>
            <input
              type="text"
              name="dis"
              id="dis"
              value={formData.dis}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-white mb-1" htmlFor="qnt">Quantity</label>
          <input
            type="number"
            name="qnt"
            id="qnt"
            value={formData.qnt}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-white mb-1" htmlFor="discription">Description</label>
          <textarea
            name="discription"
            id="discription"
            value={formData.discription}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />
        </div>
        
        <button type="submit" className="w-full p-2 rounded bg-blue-600 text-white hover:bg-blue-500">
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AdminAddBooks;
