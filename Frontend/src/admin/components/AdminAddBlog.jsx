import { useState } from "react";
import { useDispatch } from "react-redux";
import { addBlogsAPI } from "../../redux/BlogThunkApi";

const AdminAddBlog = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    image: "",
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData); // Log the form data

    try {
      await dispatch(addBlogsAPI(formData)).unwrap().then(() => {
        // Reset form or show success message
        setFormData({
          title: "",
          content: "",
          author: "",
          image: "",
        });
      });
    } catch (error) {
      console.error("Error adding blog:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded shadow-lg w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold text-white mb-6">Add Blog</h2>

        <div className="mb-4">
          <label className="block text-white mb-1" htmlFor="title">
            Title
          </label>
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

        <div className="mb-4">
          <label className="block text-white mb-1" htmlFor="content">
            Content
          </label>
          <textarea
            name="content"
            id="content"
            value={formData.content}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-white mb-1" htmlFor="author">
            Author
          </label>
          <input
            type="text"
            name="author"
            id="author"
            value={formData.author}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-white mb-1" htmlFor="image">
            Image URL
          </label>
          <input
            type="text"
            name="image"
            id="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full p-2 rounded bg-blue-600 text-white hover:bg-blue-500"
        >
          Add Blog
        </button>
      </form>
    </div>
  );
};

export default AdminAddBlog;
