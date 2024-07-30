import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaCartArrowDown, FaHeart } from 'react-icons/fa';
import { userAddToCart, userAddToWishlistAPI } from '../../../redux/ThunkApi';

export default function BookDetail() {
  const { id } = useParams();
  const { allProducts } = useSelector((state) => state.ProductSliceProvider);
  const [book, setBook] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.MySliceProvider);

  useEffect(() => {
    const foundBook = allProducts.find((product) => product._id === id);
    setBook(foundBook);
    if (foundBook) {
      setSelectedImage(foundBook.img); // Set default image
    }
  }, [id, allProducts]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  if (!book) {
    return <div>Loading...</div>;
  }

  const handleAddToWishlist = (productId) => {
    if (!userData) {
      alert("Please log in to add items to your wishlist.");
      return;
    }
    alert("Added to wishlist successfully");
    dispatch(
      userAddToWishlistAPI({
        productId,
        userId: userData._id,
      })
    );
  };

  const handleAddToCart = (productId) => {
    if (!userData) {
      alert("Please log in to add items to your cart.");
      return;
    }
    dispatch(
      userAddToCart({
        productId,
        userId: userData._id,
      })
    );
  };

  return (
    <div className="container mx-auto p-4 pt-[30px]">
      <div className="flex flex-col lg:flex-row gap-4 pt-[50px]">
        {/* Small Images on the Left */}
        <div className="flex flex-col gap-4 w-full lg:w-[150px] p-[30px]">
          {[book.img, book.img1, book.img2, book.img3, book.img4].map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Thumbnail ${index}`}
              className="w-[100px] h-[100px] border border-gray-300 rounded-lg cursor-pointer hover:opacity-75"
              onClick={() => handleImageClick(img)}
            />
          ))}
        </div>

        {/* Large Image and Details on the Right */}
        <div className="flex-1">
          <div className="flex justify-center mb-4">
            <img
              src={selectedImage}
              alt={book.title}
              className=" h-[300px] w-[300px] border border-gray-300 rounded-lg"
            />
          </div>
          <div className="mt-4 ml-[200px]">
            <h1 className="text-2xl font-bold mb-2">{book.title}</h1>
            <p className="text-lg mb-2"><span className='font-bold'>Price: </span> ₹{book.price}</p>
            <p className="text-lg mb-2"><span className='font-bold'>Discount: </span> {book.dis}</p>
            <p className="text-lg mb-2"><span className='font-bold'>Quantity:</span> {book.qnt}</p>
            <p className="text-md mb-4"> <span className='font-bold'>Description:</span> {book.discription}</p>
            <div className="flex gap-4">
              <button
                onClick={() => handleAddToCart(book._id)}
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600"
              >
                <FaCartArrowDown />
                Add to Cart
              </button>
           
              <button
                onClick={() => handleAddToWishlist(book._id)}
                type="button"
                className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-600"
              >
                <FaHeart />
                Add to Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
