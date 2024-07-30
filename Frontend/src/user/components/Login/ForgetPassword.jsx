
import { useState } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { forgetPasswordFecthApi } from "../../../redux/ThunkApi";

export default function ForgetPassword() {
  const [formData, setFormData] = useState({
    email: "",
  });

  const navigate = useNavigate();
  const diapacth=useDispatch()

  const formHandler = async (e) => {
    e.preventDefault();
diapacth(forgetPasswordFecthApi({formData,toast,setFormData,navigate}))
   

  };

  const inputHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
   
      <div className="flex justify-center items-center mt-10">
        <div className="bg-gray-200 text-gray-800 w-full md:w-3/4 lg:w-2/4 xl:w-2/4 p-8 rounded-lg shadow-lg">
          <form onSubmit={formHandler}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email Id :- :
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={inputHandler}
                placeholder="Enter Email Id"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="mt-6 flex justify-center">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Forget Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
