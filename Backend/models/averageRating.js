import mongoose, { model, Schema } from "mongoose";

const averageRating = Schema({
    bookId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Book' },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, trim: true }
}, { timestamps: true });

export const $Rating = model("Rating", averageRating);