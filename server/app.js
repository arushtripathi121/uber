import express from "express";

const app = express();
import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';

app.use(cors());

app.use("/", (req, res) => {
    res.send("server is working fine");
})

export default app;