import { model, Schema } from "mongoose";

const blogsSchema = Schema({
    title: { type: String },
    content: { type: String },
    author: { type: String },
    image: { type: String },
    createdAt: { type: Date, default: Date.now }

})


export const $Blog = model("blog", blogsSchema)