import express, { json, urlencoded } from "express";
import dotenv from "dotenv";
import { db_Con } from "./configs/db_Con.js";
import { userRouters } from "./routers/registerRouter.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { adminRouter } from "./routers/adminRouter.js";
import { productRouter } from "./routers/productRouter.js";
import { userRouter } from "./routers/userRouter.js";
import { ratingRouter } from "./routers/ratingRouter.js";
import { blogRouter } from "./routers/blogRouter.js";
import { orderRouter } from "./routers/orderRouter.js";
// import { shippingRouter } from "./routers/shippingRouter.js";

dotenv.config();
const app = express();
app.use(cors());
db_Con(process.env.dbUrl);
app.use(json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));

app.use("/api", userRouters);
app.use("/api1", adminRouter);
app.use("/api", productRouter);
app.use('/api', userRouter)
app.use("/api/ratings", ratingRouter)
app.use("/api", blogRouter)
app.use("/api", orderRouter)

const PORT = process.env.port;
app.listen(PORT, console.log(`http://localhost:${PORT}`));