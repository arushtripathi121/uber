import { validationResult } from "express-validator"
import User from "../models/user.model.js";
import { createUser } from "../services/user.service.js";


export const registerUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }

        const {firstName, lastName, email, password} = req.body;

        const hashPassword = await User.hashPassword(password);

        const user = await createUser({firstName, lastName, email, password: hashPassword});

        const token = await user.generateAuthToken();

        res.status(200).json({
            token, user
        })
    }
    catch(e) {
        console.log(e);
        res.status(500).json({
            error: e,
        })
    }
}