/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { AdminThunkLogin, AdminVelidation, fetchTotalBooks, fetchTotalUsers, fetchUserData, getAllOrder } from "./AdminThunkApi";

const initialState = {
  loading: false,
  error: null,
  process: false,
  adminData: null,
  message: "",
  isAdmin: false,
  // totalUsers: null,
  totalBooks:0,
  userData: [],
  order: [], 
};
const adminSlice = createSlice({
  name: "adminSlice",
  initialState,
  reducers: {
    setUserData(state, action) {
      state.userData = action.payload;
  },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AdminThunkLogin.pending, (state) => {
        state.loading = true;
      })

      .addCase(AdminThunkLogin.fulfilled, (state, action) => {
        console.log(action.payload);
        const { message, data, process } = action.payload;
        state.message = message;
        state.adminData = data;
        state.process = process;
        state.loading = false;
      })

      .addCase(AdminThunkLogin.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.process = false;
      })

      .addCase(AdminVelidation.pending, (state) => {
        state.loading = true;
        state.message = "pending";
      })

      .addCase(AdminVelidation.fulfilled, (state, action) => {
        console.log(action.payload);
        state.adminData = action.payload.userData;
        state.isAdmin = action.payload.process;
        state.message = "fullfilled";
        state.loading = false;
      })

      .addCase(AdminVelidation.rejected, (state, action) => {
        state.loading = false;
        // console.log(action);
      })
      
      
    .addCase(fetchTotalUsers.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchTotalUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.totalUsers = action.payload; // Add `totalUsers` to your state
    })
    .addCase(fetchTotalUsers.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })



      .addCase(fetchTotalBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTotalBooks.fulfilled, (state, action) => {
        state.totalBooks = action.payload; // Add `totalUsers` to your state
        state.loading = false;
      })
      .addCase(fetchTotalBooks.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.userData = action.payload.data; // Access data from payload
        state.loading = false;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(getAllOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload; // Ensure the data shape matches
      })
      .addCase(getAllOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
      
  },
});

export const { setUserData } = adminSlice.actions;
export const AdminSlice = adminSlice.reducer;
