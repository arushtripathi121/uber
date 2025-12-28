import React, { useState } from "react";
import api from "../api/api";
import { useUser } from "../context/AuthContext";

const CarDetailsEntry = () => {
  const { setIsCarDetailPresent } = useUser();
  const [form, setForm] = useState({
    color: "",
    number: "",
    capacity: "",
    type: "car",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await api.post("/car/addCarDetails", {
      color: form.color,
      number: form.number,
      capacity: form.capacity,
      type: form.type,
    });

    if (response.data) {
        setIsCarDetailPresent(true);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-xl shadow-lg p-10 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">
          Add Car Details
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Color
            </label>
            <input
              type="text"
              name="color"
              value={form.color}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white/80"
              placeholder="e.g., Black"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Number
            </label>
            <input
              type="text"
              name="number"
              value={form.number}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white/80"
              placeholder="e.g., BR18CH1234"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Capacity
            </label>
            <input
              type="number"
              name="capacity"
              value={form.capacity}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white/80"
              placeholder="e.g., 5"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Type</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white/80"
            >
              <option value="car">Car</option>
              <option value="moto">Moto</option>
              <option value="auto">Auto</option>
            </select>
          </div>
          <button
            type="submit"
            className="mt-6 w-full bg-black text-white font-bold py-3 rounded-lg hover:bg-gray-900 transition"
          >
            Add Car
          </button>
        </form>
      </div>
    </div>
  );
};

export default CarDetailsEntry;
