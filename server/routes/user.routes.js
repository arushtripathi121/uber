import express from 'express';
const router = express.Router();

import {body} from 'express-validator';
import { loginUser, registerUser } from '../controllers/user.controller.js';

router.post('/register', [
    body('email').isEmail().withMessage('Invalid email'),
    body('firstName').isLength({min: 3}).withMessage("First name must be of length 3"),
    body('password').isLength({min: 8}).withMessage("Password must be at least 8 characters long"),
], registerUser);

router.post('/login', [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min: 8}).withMessage("Password must be at least 8 characters long"),
], loginUser);

export default router;
