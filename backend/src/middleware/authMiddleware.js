import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { STATUS_CODES } from "../constants/statusCodes.js";

const protect = async (req, res, next) => {
    try {
        let token;


        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];


            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET
            );


            const user = await User.findById(
                decoded.userId
            ).select("-password");

            if (!user) {
                return res
                    .status(STATUS_CODES.UNAUTHORIZED)
                    .json({
                        message: "User not found",
                    });
            }


            req.user = user;

            return next();
        }

        return res
            .status(STATUS_CODES.UNAUTHORIZED)
            .json({
                message: "Not authorized, no token",
            });

    } catch (error) {
        return res
            .status(STATUS_CODES.UNAUTHORIZED)
            .json({
                message: "Not authorized, invalid token",
            });
    }
};

export { protect };