import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const connectToDb = () => {
    try {
        mongoose.connect(process.env.dburi);
    } catch(e) {
        console.log(e);
    }
}

export default connectToDb;