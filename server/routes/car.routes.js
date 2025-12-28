import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { addCarDetails } from '../controllers/captain.controller.js';
const router = express.Router();


router.post('/addCarDetails', authMiddleware, addCarDetails);

export default router;