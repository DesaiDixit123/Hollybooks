
import { useState } from "react";
import { useDispatch } from "react-redux";
// import { UserProvider } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";

export default function UpdatePassword() {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const dispacth=useDispatch()

  // const { setUserData } = useContext(UserProvider);
  const navigate = useNavigate();
  const formHandler = async (e) => {
    e.preventDefault();
dispacth({formData,navigate})
  
  };

  const inputHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex justify-center items-center mt-10">
      <div className="bg-gray-200 text-gray-800 w-full md:w-3/4 lg:w-2/4 xl:w-2/4 p-8 rounded-lg shadow-lg">
        <form onSubmit={formHandler}>
          <div>
            <label htmlFor="oldPassword" className="block text-sm font-medium">
              Old Password :
            </label>
            <input
              type="password"
              id="oldPassword"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={inputHandler}
              placeholder="Email or Username"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium">
              New Password:
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={inputHandler}
              placeholder="Last Name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="confirmNewPassword"
              className="block text-sm font-medium"
            >
              Re-Enter New Password:
            </label>
            <input
              type="text"
              id="confirmNewPassword"
              name="confirmNewPassword"
              value={formData.confirmNewPassword}
              onChange={inputHandler}
              placeholder="Last Name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
