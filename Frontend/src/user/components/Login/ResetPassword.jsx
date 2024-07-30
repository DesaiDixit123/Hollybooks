
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { resetPasswordFecthApi } from "../../../redux/ThunkApi";
export default function ResetPassword() {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const { token } = useParams(); // Fetch the token from the URL
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showEyeIcon, setShowEyeIcon] = useState(false);
  const dispacth=useDispatch()
  const formHandler = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    dispacth(resetPasswordFecthApi({formData,navigate,toast,token,setShowEyeIcon}))

  
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
    <>
  
    
    <div className="flex justify-center items-center mt-10">
      <div className="bg-gray-200 text-gray-800 w-full md:w-3/4 lg:w-2/4 xl:w-2/4 p-8 rounded-lg shadow-lg">
        <form onSubmit={formHandler}>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Reset Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={inputHandler}
              placeholder="Enter new password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
             {showEyeIcon && (
              <span onClick={togglePass} className="absolute top-9 right-3 cursor-pointer">
                {showPassword ? (
                  <FaEye />
                ) : (
                  <FaEyeSlash />
                )}
              </span>
            )}
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium">
              Re-Enter Password:
            </label>
            <input
              type="text"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={inputHandler}
              placeholder="Re-enter new password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}
