import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const UserModel = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: [3, 'Last name must be of at least 3 characters']
    },
    lastName: {
        type : String,
        minLength: [3, 'Last name must be of at least 3 characters']
    },
    email : {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    socketId: {
        type: String,
    },
    role: {
        type: String,
        default: "USER"
    }
}, {
    timestamps: true
})

UserModel.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

UserModel.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};

const User = mongoose.model("User", UserModel);
export default User;


