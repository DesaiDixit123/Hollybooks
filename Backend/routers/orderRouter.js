import { Router } from "express";
import { cancelOrder, deleteOrder, getAllCountries, getAllOrder, getCitiesByState, getStatesByCountry, orderDetails } from "../controllers/orderController.js";

export const orderRouter = Router()

orderRouter.route("/order").post(orderDetails)
orderRouter.route("/order").get(getAllOrder)
orderRouter.put("/order/cancel/:id", cancelOrder);
orderRouter.patch("/:id/payment-status")
orderRouter.patch("/:id/status")
orderRouter.delete("/order/:id", deleteOrder)
orderRouter.get("/countries", getAllCountries);
orderRouter.get("/states/:countryCode", getStatesByCountry);
orderRouter.get("/cities/:countryCode/:stateCode", getCitiesByState);