import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { CiStar } from "react-icons/ci";
import { FaCartArrowDown, FaHeart } from "react-icons/fa";
import {
  userAddToCart,
  userAddToWishlistAPI,
  userRemoveCart,
  userRemoveToWishlistAPI,
  UserValidation,
} from "../../../redux/ThunkApi";
import { ImCancelCircle } from "react-icons/im";
import {
  addRatingAPI,
  fetchRatingForBook,
} from "../../../redux/products/ProductsThunk";
import { toast } from 'react-toastify';
Modal.setAppElement("#root");

export default function Allbooks({ limit }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allProducts } = useSelector((state) => state.ProductSliceProvider);
  const { userData } = useSelector((state) => state.MySliceProvider);
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    if (userData) {
      if (userData.wishlist) {
        setWishlist(userData.wishlist);
      }
      if (userData.cart) {
        setCart(userData.cart);
      }
    }
  }, [userData]);

  useEffect(() => {
    allProducts.forEach((product) => {
      dispatch(fetchRatingForBook(product._id))
        .then((response) => {
          setRatings((prevRatings) => ({
            ...prevRatings,
            [product._id]: response.data,
          }));
        })
        .catch((error) => console.error("Failed to fetch ratings:", error));
    });
  }, [allProducts, dispatch]);

  const handleAddToWishlist = (productId) => {
    if (!userData) {
      toast.success("Please log in to add items to your wishlist.");
      return;
    }
    alert("added successfully");
    dispatch(
      userAddToWishlistAPI({
        productId,
        userId: userData._id,
      })
    );
  };

  const handleRemoveFromWishlist = (productId) => {
    if (!userData) {
      toast.success("Please log in to remove items from your wishlist.");
      return;
    }

    dispatch(
      userRemoveToWishlistAPI({
        productId,
        userId: userData._id,
      })
    );
  };

  const handleProductClick = (id) => {
    navigate(`/bookdetail/${id}`);
  };

  const openRatingModal = (bookId) => {
    setSelectedBookId(bookId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBookId(null);
    setRating(0);
    setComment("");
  };

  const handleRatingSubmit = () => {
    if (selectedBookId && rating) {
      if (!userData || !userData._id) {
        alert("User not authenticated");
        return;
      }
      dispatch(
        addRatingAPI({
          bookId: selectedBookId,
          rating,
          comment,
          userId: userData._id,
        })
      )
        .then(() => {
          closeModal();
        })
        .catch((error) => {
          console.error("Failed to submit rating:", error);
        });
    }
  };

  const displayProducts = limit ? allProducts.slice(0, 6) : allProducts;

  const getAverageRating = (bookId) => {
    const bookRatings = ratings[bookId];
    if (!bookRatings || bookRatings.length === 0) return 0;
    const total = bookRatings.reduce((acc, rating) => acc + rating.rating, 0);
    return total / bookRatings.length;
  };

  const handleAddToCart = (productId) => {
    if (!userData) {
      toast.success("Please log in to add items to your cart.");
      return;
    }

    dispatch(
      userAddToCart({
        productId,
        userId: userData._id,
      })
    );
  };

  const handleRemoveFromCart = (productId) => {
    if (!userData) {
      toast.success("Please log in to remove items from your wishlist.");
      return;
    }

    dispatch(
      userRemoveCart({
        productId,
        userId: userData._id,
      })
    );
  };

  return (
    <>
      <div className="mb-[80px] mt-[30px] p-[20px]">
        <div className="grid grid-cols-3 gap-10 w-[95%] m-auto pl-[50px] p-[20px] relative">
          {displayProducts.map((val) => {
            const titleWords = val.title.split(" ");
            const truncatedTitle =
              titleWords.length > 5
                ? `${titleWords.slice(0, 5).join(" ")}...`
                : val.title;

            const discountedPrice = val.price - (val.price * val.dis) / 100;
            const averageRating = getAverageRating(val._id);
            return (
              <div key={val._id} className="border-2 border-gray-600 w-[330px]">
                <div>
                  <img
                    src={val.img}
                    alt=""
                    className="w-[100%] p-[20px] h-[300px] cursor-pointer"
                    onClick={() => handleProductClick(val._id)}
                  />
                </div>

                <div className="pl-[20px] pb-[20px] pr-[20px]">
                  <div>
                    <p className="font-bold text-[20px]">{truncatedTitle}</p>
                  </div>
                  <div className="flex justify-between font-semibold pt-[15px] text-[20px]">
                    <p>
                      <div className="flex gap-2">
                        <p className="text-green-700">
                          ₹ {discountedPrice.toFixed(2)}
                        </p>
                        <p className="line-through text-red-500">
                          ₹ {val.price}
                        </p>
                      </div>
                    </p>
                  </div>
                  <div>
                    <div className="flex justify-center text-[30px] gap-4 pt-[15px] font-bold">
                      {[...Array(5)].map((_, index) => (
                        <span key={index}>
                          <CiStar
                            className={`cursor-pointer ${
                              index < averageRating
                                ? "text-yellow-500"
                                : "text-gray-400"
                            }`}
                            onClick={() => openRatingModal(val._id)}
                          />
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="pl-[30px] flex gap-5 justify-center">
                    {userData !== undefined ? (
                      wishlist.includes(val._id) ? (
                        <>
                          <div className="relative group">
                            <button
                              onClick={() => handleRemoveFromCart(val._id)}
                              type="button"
                              className="btn btn-secondary mx-3 flex border-2 border-gray-500 w-[50px] justify-center mt-[20px] h-[40px] items-center text-[20px] rounded-[10px] gap-[20px] font-bold bg-gray-700 text-white"
                              data-toggle="tooltip"
                              data-placement="bottom"
                              title="Remove From Cart"
                            >
                              <FaCartArrowDown />
                            </button>
                          </div>

                          <div className="relative group">
                            <button
                              onClick={() => handleRemoveFromWishlist(val._id)}
                              type="button"
                              className="btn btn-secondary mx-3 flex border-2 border-gray-500 w-[50px] justify-center mt-[20px] h-[40px] items-center text-[20px] rounded-[10px] gap-[20px] font-bold bg-gray-700 text-white"
                              data-toggle="tooltip"
                              data-placement="bottom"
                              title="Remove From Wishlist"
                            >
                              <FaHeart />
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="relative group">
                            <button
                              onClick={() => handleAddToCart(val._id)}
                              type="button"
                              className="btn btn-secondary mx-3 flex border-2 border-gray-500 w-[50px] justify-center mt-[20px] h-[40px] items-center text-[20px] rounded-[10px] gap-[20px] font-bold bg-gray-700 text-white"
                              data-toggle="tooltip"
                              data-placement="bottom"
                              title="Add To Cart"
                            >
                              <FaCartArrowDown />
                            </button>
                          </div>

                          <div className="relative group">
                            <button
                              onClick={() => handleAddToWishlist(val._id)}
                              type="button"
                              className="btn btn-secondary mx-3 flex border-2 border-gray-500 w-[50px] justify-center mt-[20px] h-[40px] items-center text-[20px] rounded-[10px] gap-[20px] font-bold bg-gray-700 text-white"
                              data-toggle="tooltip"
                              data-placement="bottom"
                              title="Add To Wishlist"
                            >
                              <FaHeart />
                            </button>
                          </div>
                        </>
                      )
                    ) : (
                      <>
                        <div className="relative group">
                          <button
                            onClick={() => handleAddToCart(val._id)}
                            type="button"
                            className="btn btn-secondary mx-3 flex border-2 border-gray-500 w-[50px] justify-center mt-[20px] h-[40px] items-center text-[20px] rounded-[10px] gap-[20px] font-bold bg-gray-700 text-white"
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title="Add To Cart"
                          >
                            <FaCartArrowDown />
                          </button>
                        </div>

                        <div className="relative group">
                          <button
                            onClick={() => handleAddToWishlist(val._id)}
                            type="button"
                            className="btn btn-secondary mx-3 flex border-2 border-gray-500 w-[50px] justify-center mt-[20px] h-[40px] items-center text-[20px] rounded-[10px] gap-[20px] font-bold bg-gray-700 text-white"
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title="Add To Wishlist"
                          >
                            <FaHeart />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Rating Modal"
        className="max-w-[600px] p-[20px] mx-auto mt-[50px] bg-white border-2 border-gray-300 rounded-lg"
      >
        <div className="flex justify-end">
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-800"
          >
            <ImCancelCircle size={24} />
          </button>
        </div>
        <div className="p-[20px]">
          <h2 className="text-2xl font-bold mb-4">Rate and Review</h2>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Rating:
            </label>
            <div className="flex">
              {[...Array(5)].map((_, index) => (
                <span
                  key={index}
                  className={`cursor-pointer text-3xl ${
                    index < rating ? "text-yellow-500" : "text-gray-400"
                  }`}
                  onClick={() => setRating(index + 1)}
                >
                  <CiStar />
                </span>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Comment:
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-md"
              rows="4"
            ></textarea>
          </div>
          <button
            onClick={handleRatingSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </Modal>
    </>
  );
}
