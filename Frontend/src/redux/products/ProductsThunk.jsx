import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addProductsAPI = createAsyncThunk(
  "addProductsAPI",
  async ({ inputData }) => {
    const response = await axios.post("/api/products", inputData);
    console.log(response.data);
    return response.data;
  }
);

export const getProducts = createAsyncThunk("getProducts", async () => {
  const res = await axios.get("/api/products");
  console.log(res.data);
  return res.data;
});


export const deleteProduct = createAsyncThunk(
  "admin/deleteProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/products/${productId}`);
      return productId; // Return the productId so we can use it to remove the product from the state
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const updateProduct = createAsyncThunk(
  "admin/updateProduct",
  async (updatedProduct, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/products/${updatedProduct._id}`, updatedProduct);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const addRatingAPI = async (ratingData) => {
  try {
    console.log('Sending request with:', ratingData); // Log the data
    const response = await axios.post('/api/ratings/rate', ratingData);
    console.log('Response:', response);
    return response.data;
  } catch (error) {
    console.error('Failed to submit rating:', error);
    throw error;
  }
};
export const fetchRatingForBook = createAsyncThunk(
  "ratings/fetch",
  async (bookId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/ratings/ratings/${bookId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


