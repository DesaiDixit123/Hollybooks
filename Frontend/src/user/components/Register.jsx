// /* eslint-disable react-hooks/exhaustive-deps */
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { registerApi } from "../../redux/ThunkApi";
// import { FaEye, FaEyeSlash } from "react-icons/fa6";
// export default function UserRegister() {
//   const [formData, setFormData] = useState({
//     fname: "",
//     lname: "",
//     username: "",
//     email: "",
//     contact_no: "",
//     country_phone_code: "+91", // Default to India code
//     birth_date: "",
//     gender: "male",
//     address: "",
//     country: "IND", // Assuming "IND" is the isoCode for India
//     state: "GJ", // Assuming "GJ" is the isoCode for Gujarat
//     city: "Ahmedabad",
//     password: "",
//     confirmPassword: "",
//   });

//   const [profileImg, setProfileImg] = useState(null); // New state for profile image
//   const [showPassword, setShowPassword] = useState(false);
//   const [showEyeIcon, setShowEyeIcon] = useState(false);
//   const [countries, setCountries] = useState([]);
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   // Fetch all countries with phone codes
//   useEffect(() => {
//     const fetchCountriesWithPhoneCodes = async () => {
//       try {
//         const response = await axios.get("/api/countriesWithPhoneCodes");
//         setCountries(response.data.data);
//       } catch (error) {
//         console.error("Failed to fetch countries with phone codes:", error);
//       }
//     };

//     fetchCountriesWithPhoneCodes();
//   }, []);

//   // Fetch states based on selected country
//   useEffect(() => {
//     const fetchStates = async () => {
//       try {
//         const response = await axios.get(`/api/states/${formData.country}`);
//         setStates(response.data.data);
//         setCities([]); // Clear cities when country changes
//       } catch (error) {
//         console.error(`Failed to fetch states for ${formData.country}:`, error);
//       }
//     };

//     if (formData.country) {
//       fetchStates();
//     }
//   }, [formData.country]);

//   // Fetch cities based on selected state
//   useEffect(() => {
//     const fetchCities = async () => {
//       try {
//         const response = await axios.get(
//           `/api/cities/${formData.country}/${formData.state}`
//         );
//         setCities(response.data.data);
//       } catch (error) {
//         console.error(
//           `Failed to fetch cities for ${formData.state}, ${formData.country}:`,
//           error
//         );
//       }
//     };

//     if (formData.state) {
//       fetchCities();
//     }
//   }, [formData.state]);

//   // Fetch states and cities when the component mounts if default country and state are set
//   useEffect(() => {
//     if (formData.country) {
//       const fetchStates = async () => {
//         try {
//           const response = await axios.get(`/api/states/${formData.country}`);
//           setStates(response.data.data);

//           // Fetch cities for the default state if set
//           if (formData.state) {
//             const response = await axios.get(
//               `/api/cities/${formData.country}/${formData.state}`
//             );
//             setCities(response.data.data);
//           }
//         } catch (error) {
//           console.error("Failed to fetch initial states and cities:", error);
//         }
//       };

//       fetchStates();
//     }
//   }, []);

//   const formHandler = async (e) => {
//     e.preventDefault();

//     const form = new FormData(); // Use FormData to handle file upload
//     for (const key in formData) {
//       form.append(key, formData[key]);
//     }
//     if (profileImg) {
//       form.append("profileImg", profileImg);
//     }
//     // console.log(form)

//     dispatch(registerApi(form));
//     dispatch(registerApi(setFormData));
//     dispatch(registerApi(toast));
//     dispatch(registerApi(navigate));
//     dispatch(registerApi(setShowEyeIcon));
//   };

//   const inputHandler = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     if (e.target.name === "password" || e.target.name === "confirmPassword") {
//       setShowEyeIcon(e.target.value.length > 0);
//     }
//   };

//   const fileHandler = (e) => {
//     setProfileImg(e.target.files[0]);
//   };
//   const togglePass = () => {
//     setShowPassword(!showPassword);
//   };
//   return (
//     <>
//       <div className="flex justify-center items-center mt-10">
//         <div className="bg-gray-200 text-gray-800 w-full md:w-3/4 lg:w-2/4 xl:w-2/4 p-8 rounded-lg shadow-lg">
//           <form onSubmit={formHandler}>
//             {/* Form fields */}
//             {/* First Name and Last Name */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label htmlFor="fname" className="block text-sm font-medium">
//                   First Name:
//                 </label>
//                 <input
//                   type="text"
//                   id="fname"
//                   name="fname"
//                   value={formData.fname}
//                   onChange={inputHandler}
//                   placeholder="First Name"
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="lname" className="block text-sm font-medium">
//                   Last Name:
//                 </label>
//                 <input
//                   type="text"
//                   id="lname"
//                   name="lname"
//                   value={formData.lname}
//                   onChange={inputHandler}
//                   placeholder="Last Name"
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 />
//               </div>
//             </div>

//             {/* Username */}
//             <div className="mt-4">
//               <label htmlFor="username" className="block text-sm font-medium">
//                 Username:
//               </label>
//               <input
//                 type="text"
//                 id="username"
//                 name="username"
//                 value={formData.username}
//                 onChange={inputHandler}
//                 placeholder="Username"
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               />
//             </div>

//             {/* Email */}
//             <div className="mt-4">
//               <label htmlFor="email" className="block text-sm font-medium">
//                 Email:
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={inputHandler}
//                 placeholder="Email"
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               />
//             </div>

//             {/* Country Code and Contact Number */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//               <div>
//                 <label
//                   htmlFor="country_phone_code"
//                   className="block text-sm font-medium"
//                 >
//                   Country Code:
//                 </label>
//                 <select
//                   name="country_phone_code"
//                   id="country_phone_code"
//                   value={formData.country_phone_code}
//                   onChange={inputHandler}
//                   className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 >
//                   <option value="">Select country_phone_code</option>
//                   {countries.map((country) => (
//                     <option key={country.isoCode} value={country.phoneCode}>
//                       {country.phoneCode}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div>
//                 <label
//                   htmlFor="contact_no"
//                   className="block text-sm font-medium"
//                 >
//                   Contact Number:
//                 </label>
//                 <input
//                   type="tel"
//                   id="contact_no"
//                   name="contact_no"
//                   value={formData.contact_no}
//                   onChange={inputHandler}
//                   placeholder="Contact Number"
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 />
//               </div>
//             </div>

//             {/* Birth Date and Gender */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//               <div>
//                 <label
//                   htmlFor="birth_date"
//                   className="block text-sm font-medium"
//                 >
//                   Birth Date:
//                 </label>
//                 <input
//                   type="date"
//                   id="birth_date"
//                   name="birth_date"
//                   value={formData.birth_date}
//                   onChange={inputHandler}
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="gender" className="block text-sm font-medium">
//                   Gender:
//                 </label>
//                 <select
//                   id="gender"
//                   name="gender"
//                   value={formData.gender}
//                   onChange={inputHandler}
//                   className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 >
//                   <option value="male">Male</option>
//                   <option value="female">Female</option>
//                   <option value="other">Other</option>
//                 </select>
//               </div>
//             </div>

//             {/* Address */}
//             <div className="mt-4">
//               <label htmlFor="address" className="block text-sm font-medium">
//                 Address:
//               </label>
//               <input
//                 type="text"
//                 id="address"
//                 name="address"
//                 value={formData.address}
//                 onChange={inputHandler}
//                 placeholder="Address"
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               />
//             </div>

//             {/* Country */}
//             <div className="mt-4">
//               <label htmlFor="country" className="block text-sm font-medium">
//                 Country:
//               </label>
//               <select
//                 id="country"
//                 name="country"
//                 value={formData.country}
//                 onChange={inputHandler}
//                 className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               >
//                 <option value="">Select Country</option>
//                 {countries.map((country) => (
//                   <option key={country.isoCode} value={country.isoCode}>
//                     {country.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* State */}
//             <div className="mt-4">
//               <label htmlFor="state" className="block text-sm font-medium">
//                 State:
//               </label>
//               <select
//                 id="state"
//                 name="state"
//                 value={formData.state}
//                 onChange={inputHandler}
//                 className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               >
//                 <option value="">Select State</option>
//                 {states.map((state) => (
//                   <option key={state.isoCode} value={state.isoCode}>
//                     {state.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* City */}
//             <div className="mt-4">
//               <label htmlFor="city" className="block text-sm font-medium">
//                 City:
//               </label>
//               <select
//                 id="city"
//                 name="city"
//                 value={formData.city}
//                 onChange={inputHandler}
//                 className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               >
//                 <option value="">Select City</option>
//                 {cities.map((city) => (
//                   <option key={city.name} value={city.name}>
//                     {city.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Profile Image */}
//             <div className="mt-4">
//               <label htmlFor="profileImg" className="block text-sm font-medium">
//                 Profile Image:
//               </label>
//               <input
//                 type="file"
//                 id="profileImg"
//                 name="profileImg"
//                 onChange={fileHandler}
//                 className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white focus:outline-none"
//               />
//             </div>

//             {/* Password and Confirm Password */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//               <div>
//                 <label htmlFor="password" className="block text-sm font-medium">
//                   Password:
//                 </label>
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   id="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={inputHandler}
//                   placeholder="Password"
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 />
//                 {showEyeIcon && (
//                   <span onClick={togglePass}>
//                     {showPassword ? (
//                       <FaEye className="absolute top-[220px] right-[400px] cursor-pointer" />
//                     ) : (
//                       <FaEyeSlash className="absolute top-[220px] right-[400px] cursor-pointer" />
//                     )}
//                   </span>
//                 )}
//               </div>
//               <div>
//                 <label
//                   htmlFor="confirmPassword"
//                   className="block text-sm font-medium"
//                 >
//                   Confirm Password:
//                 </label>
//                 <input
//                   type="password"
//                   id="confirmPassword"
//                   name="confirmPassword"
//                   value={formData.confirmPassword}
//                   onChange={inputHandler}
//                   placeholder="Confirm Password"
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 />
//               </div>
//             </div>

//             {/* Submit Button */}
//             <div className="mt-6">
//               <button
//                 type="submit"
//                 className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
//               >
//                 Register
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }




// /* eslint-disable react-hooks/exhaustive-deps */
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { FaEye, FaEyeSlash } from "react-icons/fa6";
// // import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// export default function UserRegister() {
//   const [formData, setFormData] = useState({
//     fname: "",
//     lname: "",
//     username: "",
//     email: "",
//     contact_no: "",
//     country_phone_code: "+91", // Default to India code
//     birth_date: "",
//     gender: "male",
//     address: "",
//     country: "IND", // Assuming "IND" is the isoCode for India
//     state: "GJ", // Assuming "GJ" is the isoCode for Gujarat
//     city: "Ahmedabad",
//     password: "",
//     confirmPassword: "",
//   });

//   const [profileImg, setProfileImg] = useState(null); // New state for profile image
//   const [showPassword, setShowPassword] = useState(false);
//   const [showEyeIcon, setShowEyeIcon] = useState(false);
//   const [countries, setCountries] = useState([]);
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);
//   // const navigate=useNavigate()

//   // Fetch all countries with phone codes
//   useEffect(() => {
//     const fetchCountriesWithPhoneCodes = async () => {
//       try {
//         const response = await axios.get("/api/countriesWithPhoneCodes");
//         setCountries(response.data.data);
//       } catch (error) {
//         console.error("Failed to fetch countries with phone codes:", error);
//       }
//     };

//     fetchCountriesWithPhoneCodes();
//   }, []);

//   // Fetch states based on selected country
//   useEffect(() => {
//     const fetchStates = async () => {
//       try {
//         const response = await axios.get(`/api/states/${formData.country}`);
//         setStates(response.data.data);
//         setCities([]); // Clear cities when country changes
//       } catch (error) {
//         console.error(`Failed to fetch states for ${formData.country}:`, error);
//       }
//     };

//     if (formData.country) {
//       fetchStates();
//     }
//   }, [formData.country]);

//   // Fetch cities based on selected state
//   useEffect(() => {
//     const fetchCities = async () => {
//       try {
//         const response = await axios.get(
//           `/api/cities/${formData.country}/${formData.state}`
//         );
//         setCities(response.data.data);
//       } catch (error) {
//         console.error(
//           `Failed to fetch cities for ${formData.state}, ${formData.country}:`,
//           error
//         );
//       }
//     };

//     if (formData.state) {
//       fetchCities();
//     }
//   }, [formData.state]);

//   // Fetch states and cities when the component mounts if default country and state are set
//   useEffect(() => {
//     if (formData.country) {
//       const fetchStates = async () => {
//         try {
//           const response = await axios.get(`/api/states/${formData.country}`);
//           setStates(response.data.data);

//           // Fetch cities for the default state if set
//           if (formData.state) {
//             const response = await axios.get(
//               `/api/cities/${formData.country}/${formData.state}`
//             );
//             setCities(response.data.data);
//           }
//         } catch (error) {
//           console.error("Failed to fetch initial states and cities:", error);
//         }
//       };

//       fetchStates();
//     }
//   }, []);

//   const formHandler = async (e) => {
//     e.preventDefault();

//     const form = new FormData(); // Use FormData to handle file upload
//     for (const key in formData) {
//       form.append(key, formData[key]);
//     }
//     if (profileImg) {
//       form.append("profileImg", profileImg);
//     }

//     try {
//       const response = await axios.post("/api/register", form, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
      
      
      
//       if (response.data.message) {
//         setFormData({
//           fname: "",
//           lname: "",
//           username: "",
//           email: "",
//           contact_no: "",
//           country_phone_code: "+91", // Default to India code
//           birth_date: "",
//           gender: "male",
//           address: "",
//           country: "IND", // Assuming "IND" is the isoCode for India
//           state: "GJ", // Assuming "GJ" is the isoCode for Gujarat
//           city: "Ahmedabad",
//           password: "",
//           confirmPassword: "",
//           profileImg: "",
//         });
        
//         setShowEyeIcon(false);

//         toast.error(response.data.message)
//         // navigate("/login"); 
//       }
    
//     } catch (error) {
//       toast.error(error.message);
    
//     }

    
//   };

//   const inputHandler = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     if (e.target.name === "password" || e.target.name === "confirmPassword") {
//       setShowEyeIcon(e.target.value.length > 0);
//     }
//   };

//   const fileHandler = (e) => {
//     setProfileImg(e.target.files[0]);
//   };
//   const togglePass = () => {
//     setShowPassword(!showPassword);
//   };
//   return (
//     <>
   
//       <div className="flex justify-center items-center mt-10">
//         <div className="bg-gray-200 text-gray-800 w-full md:w-3/4 lg:w-2/4 xl:w-2/4 p-8 rounded-lg shadow-lg">
//           <form onSubmit={formHandler}>
//             {/* Form fields */}
//             {/* First Name and Last Name */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label htmlFor="fname" className="block text-sm font-medium">
//                   First Name:
//                 </label>
//                 <input
//                   type="text"
//                   id="fname"
//                   name="fname"
//                   value={formData.fname}
//                   onChange={inputHandler}
//                   placeholder="First Name"
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="lname" className="block text-sm font-medium">
//                   Last Name:
//                 </label>
//                 <input
//                   type="text"
//                   id="lname"
//                   name="lname"
//                   value={formData.lname}
//                   onChange={inputHandler}
//                   placeholder="Last Name"
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 />
//               </div>
//             </div>

//             {/* Username */}
//             <div className="mt-4">
//               <label htmlFor="username" className="block text-sm font-medium">
//                 Username:
//               </label>
//               <input
//                 type="text"
//                 id="username"
//                 name="username"
//                 value={formData.username}
//                 onChange={inputHandler}
//                 placeholder="Username"
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               />
//             </div>

//             {/* Email */}
//             <div className="mt-4">
//               <label htmlFor="email" className="block text-sm font-medium">
//                 Email:
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={inputHandler}
//                 placeholder="Email"
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               />
//             </div>

//             {/* Country Code and Contact Number */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//               <div>
//                 <label
//                   htmlFor="country_phone_code"
//                   className="block text-sm font-medium"
//                 >
//                   Country Code:
//                 </label>
//                 <select
//                   name="country_phone_code"
//                   id="country_phone_code"
//                   value={formData.country_phone_code}
//                   onChange={inputHandler}
//                   className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 >
//                   <option value="">Select country_phone_code</option>
//                   {countries.map((country) => (
//                     <option key={country.isoCode} value={country.phoneCode}>
//                       {country.phoneCode}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div>
//                 <label
//                   htmlFor="contact_no"
//                   className="block text-sm font-medium"
//                 >
//                   Contact Number:
//                 </label>
//                 <input
//                   type="tel"
//                   id="contact_no"
//                   name="contact_no"
//                   value={formData.contact_no}
//                   onChange={inputHandler}
//                   placeholder="Contact Number"
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 />
//               </div>
//             </div>

//             {/* Birth Date and Gender */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//               <div>
//                 <label
//                   htmlFor="birth_date"
//                   className="block text-sm font-medium"
//                 >
//                   Birth Date:
//                 </label>
//                 <input
//                   type="date"
//                   id="birth_date"
//                   name="birth_date"
//                   value={formData.birth_date}
//                   onChange={inputHandler}
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="gender" className="block text-sm font-medium">
//                   Gender:
//                 </label>
//                 <select
//                   id="gender"
//                   name="gender"
//                   value={formData.gender}
//                   onChange={inputHandler}
//                   className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 >
//                   <option value="male">Male</option>
//                   <option value="female">Female</option>
//                   <option value="other">Other</option>
//                 </select>
//               </div>
//             </div>

//             {/* Address */}
//             <div className="mt-4">
//               <label htmlFor="address" className="block text-sm font-medium">
//                 Address:
//               </label>
//               <input
//                 type="text"
//                 id="address"
//                 name="address"
//                 value={formData.address}
//                 onChange={inputHandler}
//                 placeholder="Address"
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               />
//             </div>

//             {/* Country */}
//             <div className="mt-4">
//               <label htmlFor="country" className="block text-sm font-medium">
//                 Country:
//               </label>
//               <select
//                 id="country"
//                 name="country"
//                 value={formData.country}
//                 onChange={inputHandler}
//                 className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               >
//                 <option value="">Select Country</option>
//                 {countries.map((country) => (
//                   <option key={country.isoCode} value={country.isoCode}>
//                     {country.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* State */}
//             <div className="mt-4">
//               <label htmlFor="state" className="block text-sm font-medium">
//                 State:
//               </label>
//               <select
//                 id="state"
//                 name="state"
//                 value={formData.state}
//                 onChange={inputHandler}
//                 className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               >
//                 <option value="">Select State</option>
//                 {states.map((state) => (
//                   <option key={state.isoCode} value={state.isoCode}>
//                     {state.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* City */}
//             <div className="mt-4">
//               <label htmlFor="city" className="block text-sm font-medium">
//                 City:
//               </label>
//               <select
//                 id="city"
//                 name="city"
//                 value={formData.city}
//                 onChange={inputHandler}
//                 className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               >
//                 <option value="">Select City</option>
//                 {cities.map((city) => (
//                   <option key={city.name} value={city.name}>
//                     {city.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Profile Image */}
//             <div className="mt-4">
//               <label htmlFor="profileImg" className="block text-sm font-medium">
//                 Profile Image:
//               </label>
//               <input
//                 type="file"
//                 id="profileImg"
//                 name="profileImg"
//                 onChange={fileHandler}
//                 className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white focus:outline-none"
//               />
//             </div>

//             {/* Password and Confirm Password */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//               <div>
//                 <label htmlFor="password" className="block text-sm font-medium">
//                   Password:
//                 </label>
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   id="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={inputHandler}
//                   placeholder="Password"
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 />
//                 {showEyeIcon && (
//                   <span onClick={togglePass}>
//                     {showPassword ? (
//                       <FaEye className="absolute top-[220px] right-[400px] cursor-pointer" />
//                     ) : (
//                       <FaEyeSlash className="absolute top-[220px] right-[400px] cursor-pointer" />
//                     )}
//                   </span>
//                 )}
//               </div>
//               <div>
//                 <label
//                   htmlFor="confirmPassword"
//                   className="block text-sm font-medium"
//                 >
//                   Confirm Password:
//                 </label>
//                 <input
//                   type="password"
//                   id="confirmPassword"
//                   name="confirmPassword"
//                   value={formData.confirmPassword}
//                   onChange={inputHandler}
//                   placeholder="Confirm Password"
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 />
//               </div>
//             </div>

//             {/* Submit Button */}
//             <div className="mt-6">
//               <button
//                 type="submit"
//                 className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
//               >
//                 Register
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }





import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';

export default function UserRegister() {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    username: '',
    email: '',
    contact_no: '',
    country_phone_code: '+91',
    birth_date: '',
    gender: 'male',
    address: '',
    country: 'IND',
    state: 'GJ',
    city: 'Ahmedabad',
    password: '',
    confirmPassword: '',
  });

  const [profileImg, setProfileImg] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showEyeIcon, setShowEyeIcon] = useState(false);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchCountriesWithPhoneCodes = async () => {
      try {
        const response = await axios.get('/api/countriesWithPhoneCodes');
        setCountries(response.data.data);
      } catch (error) {
        console.error('Failed to fetch countries with phone codes:', error);
      }
    };
    fetchCountriesWithPhoneCodes();
  }, []);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await axios.get(`/api/states/${formData.country}`);
        setStates(response.data.data);
        setCities([]);
      } catch (error) {
        console.error(`Failed to fetch states for ${formData.country}:`, error);
      }
    };

    if (formData.country) {
      fetchStates();
    }
  }, [formData.country]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(
          `/api/cities/${formData.country}/${formData.state}`
        );
        setCities(response.data.data);
      } catch (error) {
        console.error(
          `Failed to fetch cities for ${formData.state}, ${formData.country}:`,
          error
        );
      }
    };

    if (formData.state) {
      fetchCities();
    }
  }, [formData.state]);

  const formHandler = async (e) => {
    e.preventDefault();
    const form = new FormData();
    Object.keys(formData).forEach((key) => form.append(key, formData[key]));
    if (profileImg) {
      form.append('profileImg', profileImg);
    }

    try {
      const response = await axios.post('/api/register', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.message) {
        setFormData({
          fname: '',
          lname: '',
          username: '',
          email: '',
          contact_no: '',
          country_phone_code: '+91',
          birth_date: '',
          gender: 'male',
          address: '',
          country: 'IND',
          state: 'GJ',
          city: 'Ahmedabad',
          password: '',
          confirmPassword: '',
        });
        setProfileImg(null);
        setShowEyeIcon(false);
        toast.success('Registration successful!');
      }
    } catch (error) {
      toast.error('Registration failed!');
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 p-4">
      <form
        className="bg-gray-900 p-8 rounded shadow-lg w-full max-w-lg"
        onSubmit={formHandler}
      >
        <h2 className="text-2xl font-bold text-white mb-6">Register</h2>

        <div className="mb-4 flex flex-col items-center">
          <img
            src={
              profileImg
                ? URL.createObjectURL(profileImg)
                : 'https://via.placeholder.com/150'
            }
            alt="Profile"
            className="w-32 h-32 object-cover rounded-full mb-4"
          />
          <label className="block text-white mb-1" htmlFor="profileImg">
            Upload Profile Image
          </label>
          <input
            type="file"
            name="profileImg"
            id="profileImg"
            onChange={(e) => setProfileImg(e.target.files[0])}
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
        </div>

        {['fname', 'lname', 'username', 'email', 'contact_no', 'birth_date', 'address'].map((field, index) => (
          <div key={index} className="mb-4">
            <label className="block text-white mb-1" htmlFor={field}>
              {field.replace(/_/g, ' ').toUpperCase()}
            </label>
            <input
              type={field === 'birth_date' ? 'date' : 'text'}
              name={field}
              id={field}
              value={formData[field]}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
        ))}

        <div className="mb-4">
          <label className="block text-white mb-1" htmlFor="gender">
            Gender
          </label>
          <select
            name="gender"
            id="gender"
            value={formData.gender}
            onChange={(e) =>
              setFormData({ ...formData, gender: e.target.value })
            }
            className="w-full p-2 rounded bg-gray-700 text-white"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-white mb-1" htmlFor="country">
            Country
          </label>
          <select
            name="country"
            id="country"
            value={formData.country}
            onChange={(e) =>
              setFormData({ ...formData, country: e.target.value })
            }
            className="w-full p-2 rounded bg-gray-700 text-white"
          >
            {countries.map((country, index) => (
              <option key={index} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-white mb-1" htmlFor="state">
            State
          </label>
          <select
            name="state"
            id="state"
            value={formData.state}
            onChange={(e) =>
              setFormData({ ...formData, state: e.target.value })
            }
            className="w-full p-2 rounded bg-gray-700 text-white"
          >
            {states.map((state, index) => (
              <option key={index} value={state.code}>
                {state.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-white mb-1" htmlFor="city">
            City
          </label>
          <select
            name="city"
            id="city"
            value={formData.city}
            onChange={(e) =>
              setFormData({ ...formData, city: e.target.value })
            }
            className="w-full p-2 rounded bg-gray-700 text-white"
          >
            {cities.map((city, index) => (
              <option key={index} value={city.code}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-white mb-1" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              id="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-2"
            >
              {showPassword ? <FaEyeSlash color="white" /> : <FaEye color="white" />}
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-white mb-1" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            name="confirmPassword"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full p-2 rounded bg-blue-600 text-white hover:bg-blue-500"
        >
          Register
        </button>
      </form>
    </div>
  );
}
