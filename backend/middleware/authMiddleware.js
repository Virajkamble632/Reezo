import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
    console.log("=========== AUTH DEBUG ===========");
    console.log("Cookies:", req.cookies);
    console.log("Headers Cookie:", req.headers.cookie);

    const authHeader = req.headers.authorization;
    const tokenFromHeader = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
    const tokenFromAltHeader = req.headers["x-auth-token"] || req.headers["x-access-token"] || req.headers.token;
    const tokenFromBody = req.body?.token;
    const tokenFromQuery = req.query?.token;
    const token = req.cookies?.token || tokenFromHeader || tokenFromAltHeader || tokenFromBody || tokenFromQuery;

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