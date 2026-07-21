import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
    console.log("=========== AUTH DEBUG ===========");
    console.log("Cookies:", req.cookies);
    console.log("Headers Cookie:", req.headers.cookie);

    const token = req.cookies?.token;

    console.log("Token:", token);

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Please login first",
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found",
            });
        }

        req.user = user;
        next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({
            success: false,
            message: "Invalid token",
        });
    }
};