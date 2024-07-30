import { Router } from "express";
import { addRating, getRatingsForBook } from "../controllers/rating.js";

export const ratingRouter = Router()


ratingRouter.post("/rate", addRating)
ratingRouter.get("/ratings/:bookId", getRatingsForBook)