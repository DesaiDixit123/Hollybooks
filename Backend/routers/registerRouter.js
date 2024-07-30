import { Router } from "express";
import upload, {
    forgetPassword,
    getAllCountries,
    getAllCountriesWithPhoneCodes,
    getCitiesByState,
    getStatesByCountry,
    getUser,
    login,
    register,
    resetPassword,
    updatePassword,
    userLogout,
    verificationUser,
    verifyUser,
} from "../controllers/register.js";

export const userRouters = Router();

userRouters.get("/countries", getAllCountries);
userRouters.get("/states/:countryCode", getStatesByCountry);
userRouters.get("/cities/:countryCode/:stateCode", getCitiesByState);
userRouters.get("/countriesWithPhoneCodes", getAllCountriesWithPhoneCodes);
userRouters.route("/").get(verificationUser, verifyUser);
userRouters.route("/user").get(getUser)
userRouters.post("/register", upload.single("profileImg"), register);
userRouters.route("/login").post(login);
userRouters.route("/forget-password").post(forgetPassword);
userRouters.route("/reset-password/:token").post(resetPassword);
userRouters.route("/update-password").post(updatePassword);
userRouters.route("/logout").post(userLogout);