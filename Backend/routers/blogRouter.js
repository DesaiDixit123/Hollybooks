import { Router } from "express";
import { createdBlog, deletedBlog, getBlog, updatedBlog } from "../controllers/blogController.js";

export const blogRouter = Router()


blogRouter.route("/blogs").post(createdBlog).get(getBlog)
blogRouter.route("/blogs/:id").delete(deletedBlog)
blogRouter.route("/blogs/:id").put(updatedBlog)