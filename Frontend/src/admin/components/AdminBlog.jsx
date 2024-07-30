import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import AdminAddBlog from "./AdminAddBlog";
import {
  deletedBlogApi,
  getBlogData,
  updatedBlogApi,
} from "../../redux/BlogThunkApi";
import AdminUpdatedBlog from "./AdminUpdatedBlog";
const AdminBlog = () => {
  const dispatch = useDispatch();
  const { blogs } = useSelector((state) => state.BlogSliceProvider);

  console.log(blogs);
  useEffect(() => {
    dispatch(getBlogData());
  }, [dispatch]);

  const [editMode, setEditMode] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  // const [currentPage, setCurrentPage] = useState(1);
  // const BlogsPerPage = 5;

  // if (!Array.isArray(blogs)) {
  //   console.error("Blogs is not an array:", blogs);
  //   return <div className="text-red-500">Error: Blogs data is not an array</div>;
  // }

  // const indexOfLastBlog = currentPage * BlogsPerPage;
  // const indexOfFirstBlog = indexOfLastBlog - BlogsPerPage;
  // const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const handleDelete = (blogId) => {
    dispatch(deletedBlogApi(blogId))
      .unwrap()
      .then(() => {
        dispatch(getBlogData());
      })
      .catch((err) => {
        console.error("Failed to delete blog: ", err);
      });
  };

  const handleEdit = (blog) => {
    setSelectedBlog(blog);
    setEditMode(true);
  };

  const handleUpdate = (updatedBlog) => {
    dispatch(updatedBlogApi(updatedBlog))
      .unwrap()
      .then(() => {
        dispatch(getBlogData());
        setEditMode(false);
        setSelectedBlog(null);
      })
      .catch((err) => {
        console.error("Failed to update Blog: ", err);
      });
  };

  const handleAddNewBlog = () => {
    <AdminAddBlog />;
  };

  // const handeleClick = (event) => {
  //   setCurrentPage(Number(event.target.id));
  // };

  // if (loading) {
  //   return <div className="text-white">Loading blogs...</div>;
  // }

  // if (error) {
  //   return <div className="text-red-500">Error: {error}</div>;
  // }

  // const renderPageNumbers = () => {
  //   const pageNumbers = [];
  //   for (let i = 1; i <= Math.ceil(blogs.length / BlogsPerPage); i++) {
  //     pageNumbers.push(i);
  //   }
  //   return pageNumbers.map((number) => (
  //     <button
  //       key={number}
  //       id={number}
  //       onClick={handeleClick}
  //       className={`${
  //         currentPage === number ? "bg-blue-500" : "bg-gray-500"
  //       } hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mx-1`}
  //     >
  //       {number}
  //     </button>
  //   ));
  // };

  return (
    <div className="min-h-screen bg-gray-800 p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Blog List</h2>
        <NavLink
          to={"/admin/addblog"}
          onClick={handleAddNewBlog}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Add New Blog
        </NavLink>
      </div>
      {editMode ? (
        <AdminUpdatedBlog blog={selectedBlog} onUpdate={handleUpdate} />
      ) : (
        <>
          <div className="overflow-y-auto max-h-96">
            <table className="w-full bg-gray-900 text-white border border-gray-700 rounded">
              <thead>
                <tr>
                  <th className="p-2 border-b">ID</th>
                  <th className="p-2 border-b">Title</th>
                  <th className="p-2 border-b">Content</th>
                  <th className="p-2 border-b">Author</th>
                  <th className="p-2 border-b">Image</th>
                  <th className="p-2 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.length > 0 ? (
                  blogs.map((blog, index) => {
                    const contentWord = blog.content.split("");
                    const contentTitle =
                      contentWord.length > 10
                        ? `${contentWord.slice(0, 60).join("")}...`
                        : blog.content;

                    return (
                      <tr key={blog._id}>
                        <td className="p-2 border-b">{index + 1}</td>
                        <td className="p-2 border-b">{blog.title}</td>
                        <td className="p-2 border-b">{contentTitle}</td>
                        <td className="p-2 border-b">{blog.author}</td>
                        <td className="p-2 border-b">
                          <img
                            src={blog.image}
                            alt={blog.title}
                            className="w-16 h-16 object-cover"
                          />
                        </td>
                        <td className="p-2 border-b">
                          <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2 w-[100px]"
                            onClick={() => handleEdit(blog)}
                          >
                            Edit
                          </button>
                          <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded w-[100px] mt-[30px]"
                            onClick={() => handleDelete(blog._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6" className="p-2 text-center">
                      No blogs found
                    </td>
                  </tr>
                )}
                
              </tbody>
            </table>
          </div>
          {/* <div className="flex justify-center mt-4">{renderPageNumbers()}</div> */}
        </>
      )}
    </div>
  );
};

export default AdminBlog;
