import User from "../models/user.model.js";

export const createUser = async({firstName, lastName, email, password}) => {
    if(!firstName || !email || !password) {
        throw new Error("All field are required");
    }

    const user = await User.create({
        firstName, lastName, password, email
    });

    return user;
}