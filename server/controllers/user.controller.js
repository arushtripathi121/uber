import { validationResult } from "express-validator"
import User from "../models/user.model.js";
import { createUser } from "../services/user.service.js";


export const registerUser = async (req, res) => {
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
            token
        })
    }
    catch(e) {
        console.log(e);
        res.status(500).json({
            error: e,
        })
    }
}

export const loginUser = async(req, res) => {

    try {

    const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }

    const { email, password } = req.body;

    const user = await User.findOne({email});

    if(!user) {
        return res.status(404).json({
            errors: 'No user found'
        })
    }
    
    const checkPassword = await user.comparePassword(password);

    if(!checkPassword) {
        return res.status(400).json({
            errors: 'Entered wrong password'
        })
    }

    const token = await user.generateAuthToken();

    return res.status(200).json({
        token
    })
}
catch(e) {
    console.log(e);
    return res.status(500).json({
        errors: 'Internal server error'
    })
}
}