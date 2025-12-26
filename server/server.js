import http from "http";
import app from "./app.js";
import dotenv from 'dotenv';
dotenv.config();

const server  = http.createServer(app);

const port = process.env.port;

server.listen(port, () => {
    console.log("Server is working");
});