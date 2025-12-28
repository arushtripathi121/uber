import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.model.js";
dotenv.config();

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.user;

    if (!token) {
      return res.status(400).json({
        errors: "Unauthorized user",
      });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(400).json({
        errors: "Session expired",
      });
    }

    const { id } = decoded;

    const user = await User.findById(id);
    
    if (!user) {
      return res.status(400).json({
        errors: "No user found",
      });
    }

    const returnUser = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      socketId: user.socketId,
      role: user.role,
    };

    req.user = returnUser;
    next();
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      errors: "Internal server error",
    });
  }
};
