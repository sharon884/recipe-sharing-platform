import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import { STATUS_CODES } from "../constants/statusCodes.js";



const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;


        if (!name || !email || !password) {
            return res.status(STATUS_CODES.BAD_REQUEST).json({
                message: "All fields are required",
            });
        }


        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(STATUS_CODES.BAD_REQUEST).json({
                message: "User already exists",
            });
        }


        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });


        const token = generateToken(user._id);


        return res.status(STATUS_CODES.CREATED).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token,
        });

    } catch (error) {
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            message: error.message,
        });
    }
};



const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;


        if (!email || !password) {
            return res.status(STATUS_CODES.BAD_REQUEST).json({
                message: "Email and password are required",
            });
        }


        const user = await User.findOne({ email });

        if (!user) {
            return res.status(STATUS_CODES.UNAUTHORIZED).json({
                message: "Invalid email ",
            });
        }


        const isPasswordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordMatch) {
            return res.status(STATUS_CODES.UNAUTHORIZED).json({
                message: "Invalid password",
            });
        }


        const token = generateToken(user._id);


        return res.status(STATUS_CODES.OK).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token,
        });

    } catch (error) {
        return res.status(
            STATUS_CODES.INTERNAL_SERVER_ERROR
        ).json({
            message: error.message,
        });
    }
};


export { registerUser, loginUser };