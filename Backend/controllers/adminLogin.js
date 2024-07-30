import { User } from "../models/register.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
export const adminLogin = async(req, res) => {
    try {
        const { identifiers, password } = req.body;
        if (!identifiers) throw new Error("Username/Email Requried");
        if (!password) throw new Error("Password is reqried");

        const findUser = await User.findOne({
            $or: [
                { email: identifiers },
                {
                    username: identifiers,
                },
            ],
        });
        if (!findUser) throw new Error("Admin not found");
        if (!findUser.isAuth) throw new Error("You are not admin");
        const checkPassword = await bcrypt.compare(password, findUser.password);
        if (checkPassword) {
            const createToken = jwt.sign({ id: findUser._id },
                process.env.secureToken, { expiresIn: "30m" }
            );

            await User.findByIdAndUpdate(findUser._id, {
                token: createToken,
            });


            const cookieExpireTime = 30 * 60 * 1000;
            res
                .cookie("adminCokie", createToken, {
                    maxAge: cookieExpireTime,
                    httpOnly: true,
                })
                .status(200)
                .send({
                    process: true,
                    message: "Admin Login Successfully!",
                    data: findUser,
                });
        } else {
            throw new Error("Password is incorrect");
        }
        // console.log(!findUser.isAuth)
    } catch (error) {
        res.status(201).send({
            process: false,
            message: error.message,
        });
    }
};
export const verificationAdmin = (req, res, next) => {
    try {
        // console.log("Cookies: ", req.cookies); // Check if the cookies are being received
        const token = req.cookies.adminCokie;
        if (!token) throw new Error("Token not found");
        const verifyToken = jwt.verify(token, process.env.secureToken);
        if (!verifyToken) throw new Error("Token is invalid");
        req.verifyTokenId = verifyToken.id;
        next();
    } catch (error) {
        res.status(201).send({
            process: false,
            message: error.message,
        });
    }
};

export const verifyAdmin = async(req, res) => {
    try {
        const id = req.verifyTokenId

        if (!id) throw new Error("User not verified!")
        const findUser = await User.findById(id)
        res.status(200).send({
            process: true,
            message: "User verified!",
            userData: findUser
        })
    } catch (error) {
        res.status(201).send({
            process: false,
            message: error.message
        })
    }
}