import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { UserProvider } from "../context/UserProvider";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserHandler } from "../../redux/ThunkApi";
import books from "../assests/books-removebg-preview.png";
import { CiHeart } from "react-icons/ci";
import { FaCartPlus } from "react-icons/fa6";

export default function Navigation() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [userDropMenu, setUserDropMenu] = useState(false);
  const { userData } = useContext(UserProvider);
  const wishlistLength = useSelector(
    (state) => state.MySliceProvider.userData?.wishlist.length || 0
  );
  const cartLength = useSelector(
    (state) => state.MySliceProvider.userData?.cart.length || 0
  );

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleUserMenu = () => {
    setUserDropMenu(!userDropMenu);
  };

  const logoutBtn = async () => {
    try {
      dispatch(logoutUserHandler({ dispatch }));
    } catch (error) {
      toast.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    // This will run every time wishlistLength changes
  }, [wishlistLength, cartLength]);

  return (
    <>
      <div className="flex justify-between bg-navColor-400 text-white h-[50px] items-center px-4 md:px-8 fixed top-0 w-full z-50">
        <div className="flex items-center">
          <img src={books} alt="" className="w-[100px]" />
          <ul className="hidden md:flex gap-10 ml-10">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/allbooks">All Books</NavLink>
            </li>
            {userData && (
              <li>
                <NavLink to="/addbooks">Add Books</NavLink>
              </li>
            )}
            <li>
              <NavLink to="/aboutus">About Us</NavLink>
            </li>
            <li>
              <NavLink to="/contactus">Contact Us</NavLink>
            </li>
          </ul>
        </div>

        <div className="flex-1 flex justify-center items-center">
          <div className="flex gap-2">
            <input
              type="text"
              className="border-2 outline-none p-2"
              placeholder="Search here"
            />
            <button className="border-2 border-black cursor-pointer bg-black text-white p-2">
              Search
            </button>
          </div>
        </div>

        <div className="flex items-center" onClick={toggleUserMenu}>
          {userData ? (
            <div className="flex items-center gap-4 cursor-pointer">
              {userData.profileImg ? (
                <img
                  src={userData.profileImg}
                  alt={userData.username}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
              )}
              <p>{userData.username}</p>

              {userDropMenu && (
                <div className="absolute bg-gray-400 top-[50px] w-[200px] text-center text-black text-[20px] z-50 duration-150 gap-5 rounded-[10px]">
                  <div>
                    <NavLink>Profile</NavLink>
                  </div>
                  <div>
                    <NavLink>Orders</NavLink>
                  </div>
                  <div>
                    <NavLink to={"/admin"}>Admin</NavLink>
                  </div>
                  <div>
                    <button onClick={logoutBtn}>Logout</button>
                  </div>
                </div>
              )}

              <NavLink to="/wishlist" className="relative">
                <CiHeart className="font-bold text-[30px]" />
                {wishlistLength > 0 && (
                  <span className="absolute top-[10px] right-[20px] text-[14px] bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistLength}
                  </span>
                )}
              </NavLink>

              <NavLink to={"/cartdetails"}>
                <FaCartPlus className="font-bold text-[30px] text-black" />
                {cartLength > 0 && (
                  <span className="absolute top-[20px] right-[30px] text-[14px] bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                    {cartLength}
                  </span>
                )}
              </NavLink>
            </div>
          ) : (
            <ul className="hidden md:flex gap-10">
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/register">Register</NavLink>
              </li>
            </ul>
          )}

          <button className="md:hidden" onClick={toggleMenu}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-navColor-400 text-white flex flex-col items-center mt-[50px]">
          <ul className="flex flex-col gap-4 py-4">
            <li>
              <NavLink to="/" onClick={toggleMenu}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/allbooks" onClick={toggleMenu}>
                All Books
              </NavLink>
            </li>
            {userData && (
              <li>
                <NavLink to="/addbooks" onClick={toggleMenu}>
                  Add Books
                </NavLink>
              </li>
            )}
            <li>
              <NavLink to="/aboutus" onClick={toggleMenu}>
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/contactus" onClick={toggleMenu}>
                Contact Us
              </NavLink>
            </li>
            {userData ? (
              <li>
                <div className="flex items-center gap-4">
                  <img
                    src={userData.profileImg}
                    alt={userData.username}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <p>{userData.username}</p>
                  <button
                    onClick={() => {
                      logoutBtn();
                      toggleMenu();
                    }}
                  >
                    Logout
                  </button>
                </div>
              </li>
            ) : (
              <>
                <li>
                  <NavLink to="/login" onClick={toggleMenu}>
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/register" onClick={toggleMenu}>
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </>
  );
}
