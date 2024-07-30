import { createSlice } from "@reduxjs/toolkit";
import { addBlogsAPI, getBlogData } from "./BlogThunkApi";

const initialState = {
  blogs: [],
  loading: "idle",
  error: null,
};

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBlogData.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(getBlogData.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.blogs = action.payload; // Ensure this is an array
      })
      .addCase(getBlogData.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })

      .addCase(addBlogsAPI.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(addBlogsAPI.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.blogs = action.payload; // Ensure this is an array
      })
      .addCase(addBlogsAPI.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      });
  },
});

export default blogSlice.reducer;
