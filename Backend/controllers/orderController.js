import { City, Country, State } from "country-state-city";
import { $OrderDetails } from "../models/orderModel.js";
import nodemailer from "nodemailer";
import { config } from "../configs/config.js";

// Fetch all countries
export const getAllCountries = (req, res) => {
    try {
        const countries = Country.getAllCountries();
        res.status(200).send({
            process: true,
            message: "Countries retrieved successfully",
            data: countries,
        });
    } catch (error) {
        res.status(500).send({
            process: false,
            message: "Failed to fetch countries",
            error: error.message,
        });
    }
};

// Fetch states of a selected country
export const getStatesByCountry = (req, res) => {
    const { countryCode } = req.params; // ISO code of the country

    try {
        const states = State.getStatesOfCountry(countryCode);
        res.status(200).send({
            process: true,
            message: `States of ${countryCode} retrieved successfully`,
            data: states,
        });
    } catch (error) {
        res.status(500).send({
            process: false,
            message: `Failed to fetch states of ${countryCode}`,
            error: error.message,
        });
    }
};

// Fetch cities of a selected state
export const getCitiesByState = (req, res) => {
    const { countryCode, stateCode } = req.params; // ISO codes of the country and state

    try {
        const cities = City.getCitiesOfState(countryCode, stateCode);
        res.status(200).send({
            process: true,
            message: `Cities of ${stateCode}, ${countryCode} retrieved successfully`,
            data: cities,
        });
    } catch (error) {
        res.status(500).send({
            process: false,
            message: `Failed to fetch cities of ${stateCode}, ${countryCode}`,
            error: error.message,
        });
    }
};

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'Gmail', // Or any other email service provider you use
    auth: {
        user: config.emailUser,
        pass: config.emailPassword
    }
});

// Order details function
export const orderDetails = async(req, res) => {
    try {
        const { userId, products, totalAmount, shippingDetails } = req.body;

        // Validate required fields
        // if (!userId || !products || !totalAmount || !shippingDetails || !shippingDetails.email) {
        //     throw new Error("All fields are required, including email in shippingDetails!");
        // }

        // Save order details
        const order = await $OrderDetails({
            userId,
            products,
            totalAmount,
            shippingDetails,
        }).save();

        console.log(order);

        // Send email notification
        const mailOptions = {
            from: config.emailUser, // Sender address
            to: shippingDetails.email, // Recipient address
            subject: 'Order Placed Successfully', // Subject line
            text: `Dear ${shippingDetails.fname} ${shippingDetails.lname},
            
            Your order has been successfully placed with the following details:
            
            Order ID: ${order._id}
            Total Amount: ₹ ${totalAmount}
            Shipping Address: ${shippingDetails.address1}, ${shippingDetails.address2}, ${shippingDetails.city}, ${shippingDetails.state}, ${shippingDetails.country}
            
            Thank you for shopping with us!
            
            Best regards,
            Hollybooks`
        };

        await transporter.sendMail(mailOptions);

        res.status(200).send({
            process: true,
            message: "Order details saved and email notification sent successfully",
        });
    } catch (error) {
        res.status(500).send({
            process: false,
            message: error.message,
        });
    }
};

export const getAllOrder = async(req, res) => {
    res.send(await $OrderDetails.find({}))
}

export const deleteOrder = async(req, res) => {
    try {
        const { id } = req.params

        const findOrder = await $OrderDetails.findByIdAndDelete(id)

        if (findOrder) {
            res.status(200).send({
                process: true,
                message: "Order data deleted successfully"
            })
        } else {
            if (!orderId) throw new Error("Order not found")
        }
    } catch (error) {
        res.status(201).send({
            process: false,
            message: error.message
        })
    }
}


export const cancelOrder = async(req, res) => {
    try {
        const { id } = req.params; // Order ID

        // Find and update the order status to 'Cancelled'
        const updatedOrder = await $OrderDetails.findByIdAndUpdate(
            id, { status: 'Cancelled' }, { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).send({
                process: false,
                message: "Order not found",
            });
        }

        // Send email notification about cancellation
        const mailOptions = {
            from: config.emailUser, // Sender address
            to: updatedOrder.shippingDetails.email, // Recipient address
            subject: 'Order Cancellation Notification', // Subject line
            text: `Dear ${updatedOrder.shippingDetails.fname} ${updatedOrder.shippingDetails.lname},
            
            We regret to inform you that your order with the following details has been cancelled:
            
            Order ID: ${updatedOrder._id}
            Total Amount: ₹ ${updatedOrder.totalAmount}
            Shipping Address: ${updatedOrder.shippingDetails.address1}, ${updatedOrder.shippingDetails.address2}, ${updatedOrder.shippingDetails.city}, ${updatedOrder.shippingDetails.state}, ${updatedOrder.shippingDetails.country}
            
            We apologize for any inconvenience this may have caused. If you have any questions, please contact our support team.
            
            Thank you for your understanding.
            
            Best regards,
            Hollybooks`
        };

        await transporter.sendMail(mailOptions);

        res.status(200).send({
            process: true,
            message: "Order cancelled and email notification sent successfully",
        });
    } catch (error) {
        res.status(500).send({
            process: false,
            message: error.message,
        });
    }
};