/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

const AdminUpdatedBlog = ({ blog, onUpdate }) => {
  const [updatedBlog, setUpdatedBlog] = useState({ ...blog });

  useEffect(() => {
    setUpdatedBlog(blog);
  }, [blog]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedBlog({ ...updatedBlog, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(updatedBlog);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-700 p-4 rounded">
      <h3 className="text-xl font-bold text-white mb-4">Update Blog</h3>
      <div className="mb-4">
        <label className="block text-white mb-2">Title</label>
        <input
          type="text"
          name="title"
          value={updatedBlog.title}
          onChange={handleChange}
          className="w-full p-2 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-white mb-2">content</label>
        <input
          type="text"
          name="content"
          value={updatedBlog.content}
          onChange={handleChange}
          className="w-full p-2 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-white mb-2">author</label>
        <input
          type="text"
          name="author"
          value={updatedBlog.author}
          onChange={handleChange}
          className="w-full p-2 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-white mb-2">image</label>
        <input
          type="text"
          name="image"
          value={updatedBlog.image}
          onChange={handleChange}
          className="w-full p-2 rounded"
        />
      </div>

      <button
        type="submit"
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Update
      </button>
    </form>
  );
};

export default AdminUpdatedBlog;
