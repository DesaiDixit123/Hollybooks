import { $Blog } from "../models/blogModel.js";
// Create a new blog post
export const createdBlog = async(req, res) => {
    try {
        console.log("Request Body:", req.body); // Log the request body

        const { title, content, author, image } = req.body;

        if (!title || !content || !author || !image) {
            return res.status(400).send({
                process: false,
                message: "All fields are required!",
            });
        }

        const existingBlog = await $Blog.findOne({
            $or: [{ title }, { author }],
        });

        if (existingBlog) {
            return res.status(409).send({
                process: false,
                message: "Blog already exists",
            });
        }

        const newBlog = new $Blog({ title, content, author, image });
        await newBlog.save();

        res.status(201).send({
            process: true,
            message: "Blog created successfully",
            data: newBlog,
        });
    } catch (error) {
        console.error("Error creating blog:", error.message);
        res.status(500).send({
            process: false,
            message: error.message,
        });
    }
};

// Get all blog posts
export const getBlog = async(req, res) => {
    try {
        const blogs = await $Blog.find({});
        res.status(200).send(blogs);
    } catch (error) {
        console.error('Error fetching blogs:', error.message);
        res.status(500).send({
            process: false,
            message: error.message
        });
    }
};

// Update a blog post
export const updatedBlog = async(req, res) => {
    try {
        const { id } = req.params;
        const updatedBlog = req.body;

        const blog = await $Blog.findByIdAndUpdate(id, updatedBlog, { new: true });

        if (blog) {
            res.status(200).send({
                process: true,
                message: "Blog updated successfully",
                data: blog
            });
        } else {
            res.status(404).send({
                process: false,
                message: "Blog not found"
            });
        }
    } catch (error) {
        console.error('Error updating blog:', error.message);
        res.status(500).send({
            process: false,
            message: error.message
        });
    }
};

// Delete a blog post
export const deletedBlog = async(req, res) => {
    try {
        const { id } = req.params;
        const blog = await $Blog.findByIdAndDelete(id);

        if (blog) {
            res.status(200).send({
                process: true,
                message: "Blog deleted successfully",
                data: blog
            });
        } else {
            res.status(404).send({
                process: false,
                message: "Blog not found"
            });
        }
    } catch (error) {
        console.error('Error deleting blog:', error.message);
        res.status(500).send({
            process: false,
            message: error.message
        });
    }
};