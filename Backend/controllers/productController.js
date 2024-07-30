import { $productModel } from "../models/productsModel.js";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { User } from "../models/register.js";

cloudinary.config({
    cloud_name: "dsslrk2kp",
    api_key: "484848599243754",
    api_secret: "ep3eD6VwdS9ixMoLKKoCsxnEl70",
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        format: async(req, res) => "png",
        public_id: (req, res) => "computed-filename-using-request",
        allowed_formats: ["jpg", "png", "jpeg", "gif"],
        transformation: [{ width: 500, height: 500, crop: "limit" }],
    },
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|png|jpeg|gif)$/)) {
            return cb(new Error("Only image files are allowd"), false);
        }
        cb(null, true);
    },
    limits: { fileSize: 1024 * 1024 * 5 },
});

export default upload;
export const addProducts = async(req, res) => {
    try {
        const {
            img,
            img1,
            img2,
            img3,
            img4,
            title,
            ratings,
            price,
            dis,
            qnt,
            discription,
        } = req.body;

        const profileImg = req.file ? req.file.path : null;

        if (!img || !title || !price || !dis || !qnt || !discription)
            throw new Error("All fields are required");

        const findProduct = await $productModel.findOne({
            $or: [{ title }, { img }],
        });

        if (findProduct) throw new Error("Product already added");

        const response = await new $productModel({
            img,
            img1,
            img2,
            img3,
            img4,
            title,
            ratings,
            price,
            dis,
            qnt,
            discription,
        }).save();

        res.status(200).send({
            process: true,
            msg: "product added",
            data: response,
        });
    } catch (err) {
        res.status(201).send({
            process: false,
            msg: err.message,
        });
    }
};

export const getProducts = async(req, res) => {
    res.send(await $productModel.find({}));
};

export const deleteProduct = async(req, res) => {
    try {
        const { id } = req.params; // Use req.params instead of req.body

        const findProduct = await $productModel.findByIdAndDelete(id);

        if (findProduct) {
            res.status(200).send({
                process: true,
                msg: "Product deleted successfully",
                data: findProduct,
            });
        } else {
            throw new Error("Product not found");
        }
    } catch (error) {
        res.status(201).send({
            process: false,
            msg: error.message,
        });
    }
};

export const updateProduct = async(req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = req.body;

        const product = await $productModel.findByIdAndUpdate(id, updatedProduct, {
            new: true,
        });

        if (product) {
            res.status(200).send({
                process: true,
                msg: "Product updated successfully",
                data: product,
            });
        } else {
            throw new Error("Product not found");
        }
    } catch (error) {
        res.status(201).send({
            process: false,
            msg: error.message,
        });
    }
};
const getDailyChecks = async() => {
    const data = await $productModel.aggregate([
        { $match: { action: "check_book" } },
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
                count: { $sum: 1 },
            },
        },
        { $sort: { _id: 1 } }, // Sort by date
    ]);
    return data;
};

export const getAllUser = async(req, res) => {
    try {
        // Fetch daily user check data from the database
        const dailyChecks = await getDailyChecks(); // You need to implement this function
        res.json(dailyChecks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getTotalUsersOverTime = async() => {
    return await User.aggregate([{
            $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                totalUsers: { $sum: 1 },
            },
        },
        { $sort: { _id: 1 } }, // Sort by date
    ]);
};

// Endpoint to fetch total users over time
export const getTotalUsers = async(req, res) => {
    try {
        const data = await getTotalUsersOverTime();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const TotalUsers = async(req, res) => {
    try {
        // const totalUsers = await User.countDocuments({});
        const totalUsers = await User.find();
        console.log(totalUsers);
        res.json({ count: totalUsers });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const TotalBooks = async(req, res) => {
    try {
        const totalBooks = await $productModel.find()
        res.json({ count: totalBooks });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// POST /api/clearCart
export const clearCart = async(req, res) => {
    try {
        const { userId } = req.body;

        // Validate userId
        if (!userId) {
            return res.status(400).send({
                process: false,
                msg: "User ID is required",
            });
        }


        // Update the user's cart to be empty
        const result = await User.updateOne({ _id: userId }, { $set: { cart: [] } });

        if (result.matchedCount === 0) {
            return res.status(404).send({
                process: false,
                msg: "User not found or cart not present",
            });
        }

        res.status(200).send({
            process: true,
            msg: "Cart cleared successfully",
        });
    } catch (error) {
        console.error("Error clearing cart:", error); // Log error details
        res.status(500).send({
            process: false,
            msg: error.message,
        });
    }
};