import User from "../models/user.model.js";

export const createUser = async({firstName, lastName, email, password, role}) => {
    if(!firstName || !email || !password) {
        throw new Error("All field are required");
    }

    const user = await User.create({
        firstName, lastName, password, email, role
    });

    return user;
}