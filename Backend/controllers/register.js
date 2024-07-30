import isEmail from "validator/lib/isEmail.js";
import { User } from "../models/register.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { City, Country, State } from "country-state-city";
import randomStrg from "randomstring";
import nodemailer from "nodemailer";
import { config } from "../configs/config.js";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// Configure Cloudinary
cloudinary.config({
    cloud_name: "dsslrk2kp",
    api_key: "484848599243754",
    api_secret: "ep3eD6VwdS9ixMoLKKoCsxnEl70",
});

// Configure multer storage to use Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        format: async(req, file) => "png", // supports promises as well
        public_id: (req, file) => "computed-filename-using-request",
        folder: "expriment", // Optional - folder for the uploaded files
        allowed_formats: ["jpg", "jpeg", "png", "gif"],
        transformation: [{ width: 500, height: 500, crop: "limit" }],
    },
});

// Set up multer
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return cb(new Error("Only image files are allowed!"), false);
        }
        cb(null, true);
    },
    limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB
});

export default upload;

const sendResetPasswordMail = async(email, name, token) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.emailUser,
                pass: config.emailPassword,
            },
        });

        const mailOptions = {
            from: config.emailUser,
            to: email,
            subject: "For reset password",
            html: `Hi ${name}, please copy this link and <a href="http://localhost:5173/reset-password/${token}">reset your password</a>`,
        };

        await transporter.sendMail(mailOptions);
        console.log("Mail has been sent");
    } catch (error) {
        console.log("Error sending email:", error.message);
        throw new Error("Failed to send reset password email.");
    }
};

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

// Fetch all countries with phone codes
export const getAllCountriesWithPhoneCodes = (req, res) => {
    try {
        const countries = Country.getAllCountries();
        const countriesWithPhoneCodes = countries.map((country) => ({
            name: country.name,
            isoCode: country.isoCode,
            phoneCode: country.phonecode,
        }));
        res.status(200).send({
            process: true,
            message: "Countries with phone codes retrieved successfully",
            data: countriesWithPhoneCodes,
        });
    } catch (error) {
        res.status(500).send({
            process: false,
            message: "Failed to fetch countries with phone codes",
            error: error.message,
        });
    }
};

export const register = async(req, res) => {
    try {
        const {
            fname,
            lname,
            username,
            contact_no,
            email,
            password,
            confirmPassword,
            birth_date,
            gender,
            address,
            country,
            state,
            city,
            country_phone_code,
        } = req.body;
        const profileImg = req.file ? req.file.path : null;
        // Check if all required fields are present
        if (!fname ||
            !lname ||
            !username ||
            !contact_no ||
            !email ||
            !password ||
            !confirmPassword ||
            !birth_date ||
            !gender ||
            !address ||
            !country ||
            !state ||
            !city ||
            !country_phone_code ||
            !profileImg
        ) {
            throw new Error("All Fields Are Required");
        }

        // Validate username strength (adjust criteria as needed)
        if (username.length < 3 || username.length > 20) {
            throw new Error("Username must be between 3 to 20 characters");
        }
        if (!/^[a-zA-Z0-9._-]+$/.test(username)) {
            throw new Error(
                "Username can only contain letters, numbers, dots, underscores, and hyphens"
            );
        }

        // Validate contact number
        if (!/^\d{10}$/.test(contact_no)) {
            throw new Error("The contact number must be exactly 10 digits long");
        }

        // Validate password
        if (password.length < 6) {
            throw new Error("Password must be at least 6 characters long");
        }
        if (!/[a-z]/.test(password)) {
            throw new Error("Password must contain at least one lowercase letter");
        }
        if (!/[A-Z]/.test(password)) {
            throw new Error("Password must contain at least one uppercase letter");
        }
        if (!/[0-9]/.test(password)) {
            throw new Error("Password must contain at least one number");
        }
        if (!/[^a-zA-Z0-9]/.test(password)) {
            throw new Error("Password must contain at least one special character");
        }
        if (password !== confirmPassword) {
            throw new Error("Password and confirmPassword do not match");
        }

        // Validate email
        if (!isEmail(email)) {
            throw new Error("Invalid Email Format");
        }

        // Validate birth_date
        const birthDateRegex = /^\d{4}-\d{2}-\d{2}$/; // Format YYYY-MM-DD
        if (!birthDateRegex.test(birth_date)) {
            throw new Error("Invalid birth date format. Use YYYY-MM-DD.");
        }

        // Validate gender
        const validGenders = ["male", "female", "other"];
        if (!validGenders.includes(gender.toLowerCase())) {
            throw new Error(
                "Invalid gender. Choose from 'male', 'female', or 'other'."
            );
        }

        // Hash the password
        const hashPassword = await bcrypt.hash(password, 10);

        // Check if user already exists
        const findUser = await User.findOne({
            $or: [{ username }, { email }],
        });
        if (findUser) {
            throw new Error("User already exists.");
        }

        // Save user data to database
        const response = await User({
            fname,
            lname,
            username,
            contact_no,
            email,
            password: hashPassword,
            birth_date,
            gender,
            address,
            country,
            state,
            city,
            country_phone_code,
            profileImg,
        }).save();
        console.log(response);

        // Send success response
        res.status(200).send({
            process: true,
            message: "Register Success!",
            data: response,
        });
    } catch (error) {
        // Send error response
        res.status(201).send({
            process: false,
            message: error.message,
        });
    }
};

export const getUser = async(req, res) => {
    try {
        const users = await User.find({});
        res.send({ process: true, data: users });
    } catch (error) {
        res.status(500).send({ process: false, message: 'Failed to fetch users' });
    }
};
export const login = async(req, res) => {
    try {
        const { identifiers, password } = req.body;

        if (!identifiers) throw new Error("Username/email required");
        if (!password) throw new Error("Password is required");

        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifiers);
        let findUser;
        if (isEmail) {
            findUser = await User.findOne({ email: identifiers });
        } else {
            findUser = await User.findOne({ username: identifiers });
        }

        console.log(findUser);

        if (!findUser) throw new Error("User Not Found!");

        const checkPassword = await bcrypt.compare(password, findUser.password);
        if (checkPassword) {
            const createToken = jwt.sign({ id: findUser._id },
                process.env.secureToken, { expiresIn: "30m" }
            );
            await User.findByIdAndUpdate(findUser._id, {
                token: createToken,
            });

            const cookieExpireTime = 30 * 60 * 1000;
            const userDataToSend = {
                _id: findUser._id,
                username: findUser.username,
                email: findUser.email,
                profileImg: findUser.profileImg, // Add any other user data needed
            };
            res
                .cookie("userCookie", createToken, {
                    maxAge: cookieExpireTime,
                    httpOnly: true,
                })
                .status(200)
                .send({
                    process: true,
                    message: "Login Success!",
                    data: findUser,
                });
        } else {
            throw new Error("Password is incorrect");
        }
    } catch (error) {
        res.status(201).send({
            process: false,
            message: error.message,
        });
    }
};

export const verificationUser = (req, res, next) => {
    try {
        const token = req.cookies.userCookie;
        if (!token) throw new Error("Token not found");

        const verifyToken = jwt.verify(token, process.env.secureToken);
        if (!verifyToken) throw new Error("Token is invalid");

        req.verifyTokenid = verifyToken.id;
        next();
    } catch (error) {
        res.status(201).send({
            process: false,
            message: error.message,
        });
    }
};

export const verifyUser = async(req, res) => {
    try {
        const id = req.verifyTokenid;

        if (!id) throw new Error("User not verified");

        const finduser = await User.findById(id);
        res.status(200).send({
            process: true,
            message: "User Verified!",
            userData: finduser,
        });
    } catch (error) {
        res.status(400).send({
            process: false,
            message: error.message,
        });
    }
};
export const userLogout = (req, res) => {
    res.clearCookie("userCookie");
    res.status(200).send({
        message: "User logout successfully",
    });
};

export const forgetPassword = async(req, res) => {
    try {
        const email = req.body.email;
        const userData = await User.findOne({ email: email });

        if (userData) {
            const randomString = randomStrg.generate();
            await User.updateOne({ email: email }, { $set: { token: randomString } });

            await sendResetPasswordMail(userData.email, userData.fname, randomString);
            res.status(200).send({
                process: true,
                message: "Please check your inbox and reset your password.",
            });
        } else {
            res.status(400).send({
                process: false,
                message: "This email does not exist.",
            });
        }
    } catch (error) {
        res.status(400).send({
            process: false,
            message: error.message,
        });
    }
};

export const resetPassword = async(req, res) => {
    try {
        const token = req.params.token;
        const password = req.body.password;

        if (!token || !password) {
            return res.status(400).send({
                process: false,
                message: "Invalid request. Missing token or password.",
            });
        }

        const tokenData = await User.findOne({ token: token });

        if (tokenData) {
            const hashPassword = await bcrypt.hash(password, 10);

            await User.findByIdAndUpdate(
                tokenData._id, { $set: { password: hashPassword, token: "" } }, { new: true }
            );

            res.status(200).send({
                process: true,
                message: "Password has been reset successfully",
            });
        } else {
            res.status(200).send({
                process: false,
                message: "This link has expired",
            });
        }
    } catch (error) {
        res.status(400).send({
            process: false,
            message: error.message,
        });
    }
};

export const updatePassword = async(req, res) => {
    try {
        const userId = req.verifyTokenid;
        const { oldPassword, newPassword, confirmNewPassword } = req.body;

        if (!oldPassword || !newPassword || !confirmNewPassword) {
            throw new Error("All fields are required");
        }

        // Validate new password
        if (newPassword.length < 6) {
            throw new Error("Password must be at least 6 characters long");
        }
        if (!/[a-z]/.test(newPassword)) {
            throw new Error("Password must contain at least one lowercase letter");
        }
        if (!/[A-Z]/.test(newPassword)) {
            throw new Error("Password must contain at least one uppercase letter");
        }
        if (!/[0-9]/.test(newPassword)) {
            throw new Error("Password must contain at least one number");
        }
        if (!/[^a-zA-Z0-9]/.test(newPassword)) {
            throw new Error("Password must contain at least one special character");
        }
        if (newPassword !== confirmNewPassword) {
            throw new Error("New password and confirm password do not match");
        }

        // Find the user
        const user = await User.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }

        // Check if old password matches
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            throw new Error("Old password is incorrect");
        }

        // Hash the new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        // Update the password in the database
        user.password = hashedNewPassword;
        await user.save();

        res.status(200).send({
            process: true,
            message: "Password updated successfully",
        });
    } catch (error) {
        res.status(400).send({
            process: false,
            message: error.message,
        });
    }
};