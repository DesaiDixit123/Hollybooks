import mongoose from "mongoose";
import { $Rating } from "../models/averageRating.js";
import { $productModel } from "../models/productsModel.js";
import { User } from "../models/register.js";

export const addRating = async(req, res) => {
    try {
        const { bookId, userId, rating, comment } = req.body;

        if (!mongoose.Types.ObjectId.isValid(bookId) ||
            !mongoose.Types.ObjectId.isValid(userId)
        ) {
            throw new Error("Invalid bookId or userId");
        }

        const newRating = await new $Rating({
            bookId,
            userId,
            rating,
            comment,
        }).save();

        await $productModel.findByIdAndUpdate(bookId, {
            $push: { ratings: newRating._id },
            $set: { averageRating: await calculateAverageRating(bookId) },
        });

        res.status(200).send({ message: "Rating added successfully", newRating });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};
export const calculateAverageRating = async(bookId) => {
    const ratings = await $Rating.find({ bookId });
    const averageRating =
        ratings.reduce((acc, rating) => acc + rating.rating, 0) / ratings.length;
    return averageRating;
};

export const getRatingsForBook = async(req, res) => {
    try {
        const { bookId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(bookId)) {
            throw new Error("Invalid bookId");
        }

        const ratings = await $Rating.find({ bookId }).populate("userId", "username");
        res.send(ratings);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};