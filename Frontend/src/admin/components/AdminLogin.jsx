/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
// import { UserProvider } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  AdminThunkLogin,
  AdminVelidation,
} from "../../redux/admin/AdminThunkApi";

export default function AdminLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { process, adminData } = useSelector(
    (state) => state.AdminSliceProvider
  );
  console.log("process", process);
  console.log("adminData", adminData);

  useEffect(() => {
    adminData != undefined
      ? process
        ? dispatch(AdminVelidation())
        : null
      : null;
  }, [adminData]);

  const [formData, setFormData] = useState({
    identifiers: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showEyeIcon, setShowEyeIcon] = useState(false);
  //   const { setUserData } = useContext(UserProvider);

  const formHandler = async (e) => {
    e.preventDefault();
    // console.log(formData)
    dispatch(
      AdminThunkLogin({
        formData,
        toast,
        navigate,
        setFormData,
        setShowEyeIcon,
      })
    );
  };

  const inputHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (e.target.name === "password") {
      setShowEyeIcon(e.target.value.length > 0);
    }
  };

  const togglePass = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center mt-10">
      <div className="bg-gray-200 text-gray-800 w-full md:w-3/4 lg:w-2/4 xl:w-2/4 p-8 rounded-lg shadow-lg bg-">
        <form onSubmit={formHandler}>
          <div>
            <label htmlFor="identifiers" className="block text-sm font-medium">
              Email or Username:
            </label>
            <input
              type="text"
              id="identifiers"
              name="identifiers"
              value={formData.identifiers}
              onChange={inputHandler}
              placeholder="Email or Username"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium">
              Password:
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={inputHandler}
              placeholder="Password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {showEyeIcon && (
              <span
                onClick={togglePass}
                className="absolute top-9 right-3 cursor-pointer"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            )}
          </div>

          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
