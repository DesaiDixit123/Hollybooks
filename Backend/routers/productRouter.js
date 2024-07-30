import { Router } from "express";
import { addProducts, clearCart, deleteProduct, getAllUser, getProducts, getTotalUsers, TotalBooks, TotalUsers, updateProduct } from "../controllers/productController.js";


export const productRouter = Router();

productRouter.route("/products").post(addProducts).get(getProducts);
productRouter.route("/products/:id").delete(deleteProduct)
productRouter.route("/products/:id").put(updateProduct)
productRouter.route("/clearcart").post(clearCart)
productRouter.get("/analytics/daily-checks", getAllUser)
productRouter.get("/users/total-over-time", getTotalUsers)
productRouter.get("/total-users", TotalUsers)
productRouter.get("/total-books", TotalBooks)