import { model, Schema } from "mongoose";

const orderSchema = Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    products: [{
        productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
    }],
    totalAmount: { type: Number, required: true },
    shippingDetails: {
        country: { type: String },
        fname: { type: String },
        lname: { type: String },
        address1: { type: String },
        address2: { type: String },
        city: { type: String },
        state: { type: String },
        phone: { type: String },
        email: { type: String }
    },
    orderDate: { type: Date, default: Date.now() }
})


export const $OrderDetails = model("order", orderSchema)