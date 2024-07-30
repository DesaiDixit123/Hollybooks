import { createSlice } from "@reduxjs/toolkit";
import { deleteProduct,  getProducts } from "./ProductsThunk";

const initialState = {
  allProducts: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "productSlice", // Updated to match the export name
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.allProducts = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set the error message
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.allProducts = state.allProducts.filter(
          (product) => product._id !== action.payload
        ); // Remove the deleted product from the list
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.error = action.payload; // Set the error message
      });
  },
});

export const ProductSlice = productSlice.reducer;
