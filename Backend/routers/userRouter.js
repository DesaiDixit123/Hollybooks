import { Router } from "express";
import {
    addToCart,
    removeToCart,
    userAddToWishlist,
    userRemoveWishlist,
} from "../controllers/userController.js";
import { verificationUser } from "../controllers/register.js";

export const userRouter = Router();

userRouter.route("/addToWishlist").post(verificationUser, userAddToWishlist);
userRouter.route("/removeWishlist").post(verificationUser, userRemoveWishlist);
userRouter.route("/addToCart").post(verificationUser, addToCart);
userRouter.route("/removeCart").post(verificationUser, removeToCart);