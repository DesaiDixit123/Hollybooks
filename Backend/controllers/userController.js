import { User } from "../models/register.js";

export const userAddToWishlist = async(req, res) => {
    try {
        const { userId, productId } = req.body;

        // console.log(req.body);
        const findUser = await User.findById(userId);

        if (!findUser) throw new Error("User not found!");
        const addInWishlist = findUser.wishlist;

        if (addInWishlist.includes(productId))
            throw new Error("Product already added in wishlist");
        addInWishlist.push(productId);

        const updateUser = await User.findByIdAndUpdate({ _id: userId }, {
            wishlist: addInWishlist,
        });

        if (updateUser) {
            res.status(200).send({
                process: true,
                msg: "Add to wishlist successfully",
            });
        }
    } catch (error) {
        res.status(201).send({
            process: false,
            msg: error.msg,
        });
    }
};

export const userRemoveWishlist = async(req, res) => {
    try {
        const { userId, productId } = req.body;

        const findUser = await User.findById(userId);

        if (!findUser) throw new Error("User not found!");
        console.log("line:47", findUser);

        const updateStatus = await User.findByIdAndUpdate(userId, {
            wishlist: findUser.wishlist.filter(
                (item) => item.toString() !== productId
            ),
        });
        // findUser.wishlist = findUser.wishlist.filter(item => item.toString() !== productId)

        if (updateStatus) {
            res.status(200).send({
                process: true,
                msg: "Product removed from wishlist",
                data: findUser,
            });
        }
    } catch (error) {
        res.status(202).send({
            process: true,
            msg: error.msg,
            data: findUser,
        });
    }
};

export const addToCart = async(req, res) => {
    try {
        const { productId, userId } = req.body;
        const findUser = await User.findById(userId);

        if (!findUser) {
            throw new Error("User not found");
        }

        if (findUser.cart.includes(productId)) {
            throw new Error("Product already added in cart");
        }

        findUser.cart.push(productId);
        await findUser.save();

        res.status(200).send({
            process: true,
            msg: "Product added to cart",
            data: findUser,
        });
    } catch (error) {
        res.status(400).send({
            process: false,
            msg: error.message,
        });
    }
};

export const removeToCart = async(req, res) => {
    try {
        const { productId, userId } = req.body;
        const findUser = await User.findById(userId);

        if (!findUser) {
            throw new Error("User not found");
        }

        const updatedCart = findUser.cart.filter((item) => item.toString() !== productId);

        if (updatedCart.length === findUser.cart.length) {
            throw new Error("Product not found in cart");
        }

        findUser.cart = updatedCart;
        await findUser.save();

        res.status(200).send({
            process: true,
            msg: "Product removed from cart",
            data: findUser,
        });
    } catch (error) {
        res.status(400).send({
            process: false,
            msg: error.message,
        });
    }
};