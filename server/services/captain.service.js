import Car from "../models/car.model.js";

export const createCarDetails = async ({color, number, capacity, type, userId}) => {
        console.log(color, number, capacity, type, userId);
        
        if(!color || !number || !capacity || !type || !userId) {
            throw new Error("All field are required");
        }

        const car = await Car.create({
            color, number, capacity, type, captain: userId
        })

        console.log(car);
    
        return car;
}