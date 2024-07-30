import { Router } from "express";
import { adminLogin, verificationAdmin, verifyAdmin } from "../controllers/adminLogin.js";

export const adminRouter = Router()

adminRouter.route("/admin/login").post(adminLogin)
adminRouter.route("/admin").get(verificationAdmin, verifyAdmin)