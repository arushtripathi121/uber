import { validationResult } from "express-validator";
import User from "../models/user.model.js";
import Car from "../models/car.model.js";
import { createUser } from "../services/user.service.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { firstName, lastName, email, password, role } = req.body;

    const hashPassword = await User.hashPassword(password);

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        errors: "User already exist",
      });
    }

    const user = await createUser({
      firstName,
      lastName,
      email,
      password: hashPassword,
      role,
    });

    const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("user", token);

    res.status(200).json({
      token,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      error: e,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        errors: "No user found",
      });
    }

    const checkPassword = await user.comparePassword(password);

    if (!checkPassword) {
      return res.status(400).json({
        errors: "Entered wrong password",
      });
    }

    const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("user", token);

    return res.status(200).json({
      token,
      user,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      errors: "Internal server error",
    });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const { id, role } = req.user;

    let captainDetails = false;
    if (role === "DRIVER") {
      const captain = await Car.findOne({ captain: id });
      if (captain) {
        captainDetails = true;
      }
    }

    res.status(200).json({user: req.user, captainDetails});
  } catch (e) {
    console.log(e);
    res.status(500).json({
      errors: "Internal server error",
    });
  }
};
