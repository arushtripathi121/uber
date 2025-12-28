import mongoose from "mongoose";

const CarModel = new mongoose.Schema(
  {
    color: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
      unique: true,
    },
    capacity: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["car", "moto", "auto"],
      required: true,
    },
    captain: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Car = mongoose.model("Car", CarModel);
export default Car;
