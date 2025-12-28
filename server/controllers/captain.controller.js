import Car from "../models/car.model.js";
import { createCarDetails } from "../services/captain.service.js";

export const addCarDetails = async (req, res) => {
  try {
    const { id, role } = req.user;

    if(!role || role !== "DRIVER") {
        return res.status(400).json({
            errors: 'This route is only for drivers'
        })
    }

    const { color, number, capacity, type } = req.body;

    if (!color || !number || !capacity || !type) {
      return res.status(400).json({
        errors: "Details are not present",
      });
    }

    let carExists = await Car.findOne({number});
    
    if(carExists) {
        return res.status(400).json({
            errors: 'car already registered'
        })
    }

    const car = await createCarDetails({color, number, capacity, type, userId: id}); 


    if(!car) {
        return res.status(404).json({
            errors: 'Car cannot be created'
        }) 
    }

    return res.status(200).json({
        message: 'car added successfully',
        car
    })

  } catch (e) {
    console.log(e);
    return res.status(500).json({
      errors: "Internal server error",
    });
  }
};
