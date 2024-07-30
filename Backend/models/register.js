import { model, Schema } from "mongoose";

const userSchema = Schema({
    fname: { type: String },
    lname: { type: String },
    username: { type: String },
    email: { type: String },
    contact_no: { tupe: String },
    birth_date: { type: String },
    gender: { type: String },
    address: { type: String },
    country: { type: String },
    state: { type: String },
    city: { type: String },
    country_phone_code: { type: Number },
    profileImg: { type: String },
    password: { type: String },
    isAuth: { type: Boolean, default: false },
    token: { type: String, default: "" },
    cart: { type: Array, default: [] },
    wishlist: { type: Array, default: [] },

    createdAt: { type: Date, default: Date.now }
});

export const User = model("User", userSchema);