import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getBlogData = createAsyncThunk(
    "getBlogData",
    async () => {
      const res = await axios.get("/api/blogs");
      console.log(res.data); // Ensure this logs the expected blog data
      return res.data;
    }
  );
  
 export const addBlogsAPI = createAsyncThunk(
    "addBlogsAPI",
    async ( formData ) => {
      const response = await axios.post("/api/blogs", formData);
      console.log(response.data);
      return response.data;
    }
  );

  export const updatedBlogApi=createAsyncThunk(
    "updatedBlogApi",
    async(updatedBlog)=>{
      try {
        const res=await axios.put(`/api/blogs/${updatedBlog._id}`,updatedBlog)

        return res.data
      } catch (error) {
        console.log(error.message)
      }
    }
  )


  export const deletedBlogApi=createAsyncThunk(
    "deletedBlogApi",
    async(blogId)=>{
      try {
        const res=await axios.delete(`/api/blogs/${blogId}`)
        return res.data
      } catch (error) {
        console.log(error.message)
        
      }
    }
  )