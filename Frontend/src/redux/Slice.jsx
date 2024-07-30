/* eslint-disable react-refresh/only-export-components */
import { createSlice } from "@reduxjs/toolkit";
import {
  countriesWithPhoneCodesApi,
  fetchAllCities,
  fetchAllCountry,
  fetchAllStates,
  forgetPasswordFecthApi,
  loginUserFetchApi,
  UserValidation,
  registerApi,
  resetPasswordFecthApi,
  updetPasswordFecthApi,
  logoutUserHandler,
  userAddToWishlistAPI,
  userRemoveToWishlistAPI,
  getBlogData,
} from "./ThunkApi";

const initialState = {
  num: 0,
  countries: [],
  states: [],
  cities: [],
  loading: false,
  error: null,
  process: false,
  userData: {
    _id: '',
    cart: [],
    
  },
  message: "",
  blogs: [],
};
const slice = createSlice({
  name: "mySlice",
  initialState,
  reducers: {
    addItemToWishlist: (state, action) => {
      state.userData.wishlist.push(action.payload);
    },
    removeItemFromWishlist: (state, action) => {
      state.userData.wishlist = state.userData.wishlist.filter(
        (item) => item.id !== action.payload.id
      );
    },

    // updateUserData: (state, action) => {
    //   state.userData = action.payload;
    // },

    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    updateUserData: (state, action) => {
      state.userData = {
          ...state.userData,
          ...action.payload
      };
  },
 
  },

  extraReducers: (builder) => {
    builder
      .addCase(registerApi.pending, (state) => {
        state.loading = true;
      })

      .addCase(registerApi.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.userData = action.payload.data;
        state.process = true;
      })

      .addCase(registerApi.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.process = false;
      })
      // Countries with Phone Codes
      .addCase(countriesWithPhoneCodesApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(countriesWithPhoneCodesApi.fulfilled, (state, action) => {
        state.loading = false;
        state.countries = action.payload;
      })
      .addCase(countriesWithPhoneCodesApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch All States
      .addCase(fetchAllStates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllStates.fulfilled, (state, action) => {
        state.loading = false;
        state.states = action.payload;
      })
      .addCase(fetchAllStates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch All Cities
      .addCase(fetchAllCities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCities.fulfilled, (state, action) => {
        state.loading = false;
        state.cities = action.payload;
      })
      .addCase(fetchAllCities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch All Country (States and Cities)
      .addCase(fetchAllCountry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCountry.fulfilled, (state, action) => {
        state.loading = false;
        state.states = action.payload.states;
        state.cities = action.payload.cities;
      })
      .addCase(fetchAllCountry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(loginUserFetchApi.pending, (state) => {
        state.loading = true;
      })

      .addCase(loginUserFetchApi.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.userData = action.payload.data;
        state.process = true;
      })

      .addCase(loginUserFetchApi.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.process = false;
      })
      .addCase(forgetPasswordFecthApi.pending, (state) => {
        state.loading = true;
      })

      .addCase(forgetPasswordFecthApi.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.userData = action.payload.data;
        state.process = true;
      })

      .addCase(forgetPasswordFecthApi.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.process = false;
      })
      .addCase(resetPasswordFecthApi.pending, (state) => {
        state.loading = true;
      })

      .addCase(resetPasswordFecthApi.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.userData = action.payload.data;
        state.process = true;
      })

      .addCase(resetPasswordFecthApi.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.process = false;
      })
      .addCase(updetPasswordFecthApi.pending, (state) => {
        state.loading = true;
      })

      .addCase(updetPasswordFecthApi.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.userData = action.payload.data;
        state.process = true;
      })

      .addCase(updetPasswordFecthApi.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.process = false;
      })
      .addCase(UserValidation.pending, (state) => {
        state.loading = true;
      })

      .addCase(UserValidation.fulfilled, (state, action) => {
        const { message, process, userData } = action.payload;
        state.loading = false;
        state.message = message;
        state.process = process;
        if (process) state.userData = userData;
      })

      .addCase(UserValidation.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.process = false;
      })

      .addCase(logoutUserHandler.pending, (state) => {
        state.loading = true;
      })

      .addCase(logoutUserHandler.fulfilled, (state) => {
        state.loading = false;
        state.userData = null;
      })

      .addCase(userAddToWishlistAPI.fulfilled, (state, action) => {
        console.log(action.payload);
        // state.userData = action.payload.userData; // Make sure this is only updating the wishlist
      })
      .addCase(userRemoveToWishlistAPI.fulfilled, (state, action) => {
        state.userData = action.payload.userData; // Make sure this is only updating the wishlist
      });
  },
});

export const { addItemToWishlist, removeItemFromWishlist,setUserData, updateUserData } = slice.actions;
export const MySlice = slice.reducer;
