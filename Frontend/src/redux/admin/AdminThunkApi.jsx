import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const AdminThunkLogin = createAsyncThunk(
  "AdminLogin",
  async ({ formData, toast, navigate, setFormData, setShowEyeIcon }) => {
    try {
      const response = await axios.post("/api1/admin/login", formData);

      const { process, message } = response.data;

      if (process) {
        // setUserData(data);
        toast.success(message, {
          position: "top-right",
          style: { marginTop: "50px", marginRight: "10px" },
        });
        navigate("/admin");
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

export const AdminVelidation = createAsyncThunk("AdminVelidation", async () => {
  try {
    const response = await axios.get("/api1/admin");
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
});


export const fetchTotalUsers = createAsyncThunk(
  'admin/fetchTotalUsers',
  async () => {
    try {
      const response = await axios.get('/api/total-users');
      return response.data.count;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const fetchTotalBooks = createAsyncThunk(
  'admin/fetchTotalBooks',
  async () => {
    try {
      const response = await axios.get('/api/total-books');
      return response.data.count;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const fetchUserData = createAsyncThunk(
  'admin/fetchUserData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/user');
      return response.data; // Ensure the entire response data is returned
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



export const getAllOrder = createAsyncThunk(
  "admin/getAllOrder",
  async () => {
    try {
      const response = await axios.get("/api/order");
      return response.data; // Ensure this matches your expected format
    } catch (error) {
      return error.response.data;
    }
  }
);
