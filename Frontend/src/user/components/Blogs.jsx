import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogData } from '../../redux/BlogThunkApi';

export default function Blogs() {
  const dispatch = useDispatch();
  const { blogs, loading, error } = useSelector((state) => state.BlogSliceProvider);

  useEffect(() => {
    if (loading === 'idle') {
      dispatch(getBlogData());
    }
  }, [dispatch, loading]);

  if (loading === 'loading') return <p className="text-center text-gray-600">Loading...</p>;
  if (loading === 'failed') return <p className="text-center text-red-600">Error: {error}</p>;

  if (!blogs || blogs.length === 0) return <p className="text-center text-gray-600">No blogs available.</p>;

  return (
    <div className="bg-gray-100 p-8">
      <div className="container mx-auto">
        <div className="flex flex-wrap gap-8">
          {blogs.map((blog) => (
            <div key={blog.id} className="bg-white p-6 rounded-lg shadow-lg w-full flex flex-col md:flex-row">
              <div className="md:w-1/3 mb-4 md:mb-0">
                <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover rounded-lg" />
                <div className="mt-4 text-center">
                  <p className="font-bold text-xl">{blog.title}</p>
                  <p className="text-gray-600">Author: {blog.author}</p>
                </div>
              </div>
              <div className="md:w-2/3 pl-4">
                <p className="text-gray-700">{blog.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
