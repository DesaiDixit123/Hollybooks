import { model, Schema } from "mongoose";

const ProductsSchema = Schema({

    img: { type: String },
    img1: { type: String },
    img2: { type: String },
    img3: { type: String },
    img4: { type: String },
    title: { type: String },
    price: { type: Number },
    ratings: { type: String },
    dis: { type: Number, default: 0 },
    qnt: { type: Number },
    discription: { type: String }

});

export const $productModel = model("products", ProductsSchema);