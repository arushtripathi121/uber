import express from "express";

const app = express();
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from "cookie-parser";

import cors from 'cors';
import connectToDb from "./config/db.js";

import userRouter from './routes/user.routes.js';

connectToDb();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

// app.use("/", (req, res) => {
//     res.send("server is working fine");
// })

app.use("/user/", userRouter);

export default app;