/* eslint-disable react-refresh/only-export-components */
// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// export const registerApi = createAsyncThunk(
//   "registerApi",
//   async ({form, setFormData, toast, setShowEyeIcon}) => {
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
//         toast.error(response.data.message);
//         setShowEyeIcon(false);
//         // navigate("/login");
//       }

//       return response.data;
//     } catch (error) {
//       return toast.error( error.response.data.message)
//     }
//   }
// );

// export const countriesWithPhoneCodesApi=createAsyncThunk(
//     "countriesWithPhoneCodesApi",
//     async({setCountries})=>{
//        try {
//         const response=await  axios.get("api/countriesWithPhoneCodes")
//         return setCountries(response.data)

//        } catch (error) {
//         console.error("Failed to fetch countries with phone codes:", error);

//        }
//     }
// )

// export const fetchAllStates=createAsyncThunk(
//     "states",
//     async({formData,setStates,setCities})=>{
//         try {
//             const response = await axios.get(`/api/states/${formData.country}`);
//               setStates(response.data.data);
//               setCities([])
//         } catch (error) {
//             console.error(`Failed to fetch states for ${formData.country}:`, error);
//         }
//     }
// )

// export const fetchAllCities=createAsyncThunk(
//     "cities",
//     async({formData,setCities})=>{
//          try {
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
//     }
// )

// export const fetchAllCountry=createAsyncThunk(
//     "country",
//     async({formData,setStates,setCities})=>{
//          try {
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
//     }
// )

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Register API
export const registerApi = createAsyncThunk(
  "registerApi",
  async ({ form, setFormData, toast, setShowEyeIcon }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/register", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.message) {
        setFormData({
          fname: "",
          lname: "",
          username: "",
          email: "",
          contact_no: "",
          country_phone_code: "+91", // Default to India code
          birth_date: "",
          gender: "male",
          address: "",
          country: "IND", // Assuming "IND" is the isoCode for India
          state: "GJ", // Assuming "GJ" is the isoCode for Gujarat
          city: "Ahmedabad",
          password: "",
          confirmPassword: "",
          profileImg: "",
        });
        toast.error(response.data.message);
        setShowEyeIcon(false);
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Fetch Countries with Phone Codes
// export const countriesWithPhoneCodesApi = createAsyncThunk(
//     "countriesWithPhoneCodesApi",
//     async ({ setCountries }) => {
//       try {
//         const response = await axios.get("api/countriesWithPhoneCodes");
//         return response.data; // Ensure this is what your reducer expects
//       } catch (error) {
//         console.error("Failed to fetch countries with phone codes:", error);
//       }
//     }
//   );

// // Fetch States based on selected country
// export const fetchAllStates = createAsyncThunk(
//     "states",
//     async ({ formData, setStates, setCities }) => {
//       try {
//         const response = await axios.get(`/api/states/${formData.country}`);
//         setStates(response.data.data);
//         setCities([]);
//       } catch (error) {
//         console.error(`Failed to fetch states for ${formData.country}:`, error);
//       }
//     }
//   );

// // Fetch Cities based on selected state
// export const fetchAllCities = createAsyncThunk(
//     "cities",
//     async ({ formData, setCities }) => {
//       try {
//         const response = await axios.get(`/api/cities/${formData.country}/${formData.state}`);
//         setCities(response.data.data);
//       } catch (error) {
//         console.error(`Failed to fetch cities for ${formData.state}, ${formData.country}:`, error);
//       }
//     }
//   );

// // Fetch States and Cities when the component mounts if default country and state are set
// export const fetchAllCountry = createAsyncThunk(
//   "fetchAllCountry",
//   async ({ country, state }, { rejectWithValue }) => {
//     try {
//       const stateResponse = await axios.get(`/api/states/${country}`);
//       const cityResponse = state
//         ? await axios.get(`/api/cities/${country}/${state}`)
//         : { data: { data: [] } };

//       return {
//         states: stateResponse.data.data,
//         cities: cityResponse.data.data,
//       };
//     } catch (error) {
//       return rejectWithValue("Failed to fetch initial states and cities.");
//     }
//   }
// );

// Fetch Countries with Phone Codes
export const countriesWithPhoneCodesApi = createAsyncThunk(
  "countriesWithPhoneCodesApi",
  async () => {
    try {
      const response = await axios.get("api/countriesWithPhoneCodes");
      return response.data; // Ensure this is what your reducer expects
    } catch (error) {
      console.error("Failed to fetch countries with phone codes:", error);
      throw error;
    }
  }
);

// Fetch States based on selected country
export const fetchAllStates = createAsyncThunk(
  "states",
  async (country, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/states/${country}`);
      return response.data.data; // Adjust if necessary
    } catch (error) {
      console.error(`Failed to fetch states for ${country}:`, error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Fetch Cities based on selected state
export const fetchAllCities = createAsyncThunk(
  "cities",
  async ({ country, state }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/cities/${country}/${state}`);
      return response.data.data; // Adjust if necessary
    } catch (error) {
      console.error(`Failed to fetch cities for ${state}, ${country}:`, error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Fetch States and Cities when the component mounts if default country and state are set
export const fetchAllCountry = createAsyncThunk(
  "fetchAllCountry",
  async ({ country, state }, { rejectWithValue }) => {
    try {
      const stateResponse = await axios.get(`/api/states/${country}`);
      const cityResponse = state
        ? await axios.get(`/api/cities/${country}/${state}`)
        : { data: { data: [] } };

      return {
        states: stateResponse.data.data,
        cities: cityResponse.data.data,
      };
    } catch (error) {
      console.error("Failed to fetch initial states and cities:", error);
      return rejectWithValue("Failed to fetch initial states and cities.");
    }
  }
);

export const loginUserFetchApi = createAsyncThunk(
  "loginUserFetchApi",
  async ({
    formData,
    // setUserData,
    toast,
    navigate,
    setFormData,
    setShowEyeIcon,
  }) => {
    try {
      const response = await axios.post("/api/login", formData);

      const { process, message } = response.data;

      if (process) {
        // setUserData(data);
        toast.success(message, {
          position: "top-right",
          style: { marginTop: "50px", marginRight: "10px" },
        });
        navigate("/");
      } else {
        toast.error(message, {
          position: "top-right",
          style: { marginTop: "50px", marginRight: "10px" },
        });
      }

      setFormData({
        identifiers: "",
        password: "",
      });
      setShowEyeIcon(false);

      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || error.message, {
        position: "top-right",
        style: { marginTop: "50px", marginRight: "10px" },
      });
    }
  }
);

export const forgetPasswordFecthApi = createAsyncThunk(
  "forgetPasswordFetchApi",
  async ({ formData, toast, setFormData, navigate }) => {
    try {
      const response = await axios.post("/api/forget-password", formData);
      // toast.error(response.data.message);

      if (response.data.process) {
        setFormData({
          email: "",
        });
        toast.success(response.data.message, {
          style: { marginTop: "50px", marginRight: "10px" },
        });
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      toast.error(error.message, {
        style: { marginTop: "50px", marginRight: "10px" },
      });
    }
  }
);

export const resetPasswordFecthApi = createAsyncThunk(
  "resetPasswordFecthApi",
  async ({ formData, navigate, toast, token, setShowEyeIcon }) => {
    try {
      const response = await axios.post(`/api/reset-password/${token}`, {
        password: formData.password,
      });

      if (response.data.process) {
        toast.success(response.data.message);

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        toast.error(response.data.message);
      }
      setShowEyeIcon(false);
    } catch (error) {
      toast.error(error.message);
      toast.error("An error occurred while resetting the password.");
    }
  }
);

export const updetPasswordFecthApi = createAsyncThunk(
  "updatePasswordApi",
  async ({ formData, navigate }) => {
    try {
      const response = await axios.post("/api/update-password", formData);
      console.log(response.data);

      const { process } = response.data;

      if (process) {
        // setUserData(data);
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const UserValidation = createAsyncThunk("UserValidation", async () => {
  const response = await axios.get("/api");
  // setUserData(response.data.userData);
  return response.data;
});

export const logoutUserHandler = createAsyncThunk(
  "logoutUserHandler",
  async ({ dispatch }) => {
    const res = await axios.post("/api/logout");
    dispatch(UserValidation());
    return res.data;
  }
);

export const userAddToWishlistAPI = createAsyncThunk(
  "userAddToWishlistAPI",
  async ({ productId, userId }, { dispatch }) => {
    const res = await axios.post("/api/addToWishlist", { productId, userId });
    console.log(res);
    dispatch(UserValidation());
    return res.data;
  }
);
export const userRemoveToWishlistAPI = createAsyncThunk(
  "userRemoveToWishlistAPI",
  async ({ userId, productId }, { dispatch }) => {
    const res = await axios.post("/api/removeWishlist", { userId, productId });
    console.log(res);
    dispatch(UserValidation());
    return res.data;
  }
);

export const getBlogData = createAsyncThunk("getBlogData", async () => {
  const res = await axios.get("/api/blogs");
  console.log(res.data); // Ensure this logs the expected blog data
  return res.data;
});

export const userAddToCart = createAsyncThunk(
  "userAddToCart",
  async ({ productId, userId },{ dispatch }) => {
    const res = await axios.post("/api/addToCart", { productId, userId });
    console.log(res)
    dispatch(UserValidation());
    return res.data;
  }
);


export const userRemoveCart=createAsyncThunk(
  "userRemoveCart",
  async({productId,userId},{ dispatch })=>{
    const res =await axios.post("/api/removeCart",{productId,userId})
console.log(res)
    dispatch(UserValidation());
    return res.data
  }
)

export const userPlaceOrder = (orderData) => async (dispatch) => {
  try {
      // Make sure the orderData includes all required fields
      console.log(orderData);

      // Replace with your actual API call
      const response = await axios.post('/api/order', orderData);

      // Handle successful response
      dispatch({ type: 'PLACE_ORDER_SUCCESS', payload: response.data });
  } catch (error) {
      // Handle errors
      dispatch({ type: 'PLACE_ORDER_FAILURE', payload: error.message });
  }
};

export const clearCart = createAsyncThunk(  
  'clearCart',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/clearcart', { userId });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);