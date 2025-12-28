import React, { useState } from "react";
import { FaCarSide, FaTaxi, FaMotorcycle, FaCar } from "react-icons/fa";

const rides = [
  {
    id: "go",
    name: "Uber Go",
    time: "3 mins away · 8:41 PM",
    desc: "Affordable compact rides",
    price: "₹109.94",
    icon: <FaCarSide className="text-gray-700" size={36} />,
  },
  {
    id: "auto",
    name: "Auto",
    time: "3 mins away · 8:41 PM",
    desc: "Faster",
    price: "₹60.00",
    icon: <FaTaxi className="text-green-600" size={36} />,
    badge: "⚡ Faster",
  },
  {
    id: "xl",
    name: "UberXL",
    time: "5 mins away · 8:43 PM",
    desc: "Comfortable SUVs",
    price: "₹170.24",
    icon: <FaCar className="text-black" size={36} />,
  },
  {
    id: "bike",
    name: "Bike",
    time: "4 mins away · 8:42 PM",
    desc: "Quick bike rides",
    price: "₹33.45",
    icon: <FaMotorcycle className="text-orange-500" size={36} />,
  },
];

const BookRide = () => {
  const [selected, setSelected] = useState("go");

  return (
    <main className="h-full bg-white rounded-xl shadow-md p-6 flex flex-col">
      <h1 className="text-2xl font-bold mb-1">Choose a ride</h1>
      <p className="text-gray-600 mb-4">Rides we think you'll like</p>

      <div className="flex flex-col gap-3">
        {rides.map((ride) => (
          <div
            key={ride.id}
            onClick={() => setSelected(ride.id)}
            className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition border
              ${
                selected === ride.id
                  ? "border-black bg-gray-50"
                  : "border-transparent hover:bg-gray-50"
              }`}
          >
            <div className="flex items-center gap-4">
              {ride.icon}
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-lg">{ride.name}</p>
                  {ride.badge && (
                    <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded">
                      {ride.badge}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600">{ride.time}</p>
                <p className="text-sm text-gray-500">{ride.desc}</p>
              </div>
            </div>

            <p className="font-bold text-lg">{ride.price}</p>
          </div>
        ))}
      </div>

      <div className="mt-auto pt-4 flex items-center justify-between border-t">
        <div className="flex items-center gap-2 text-gray-700 font-medium">
        Cash
        </div>
        <button className="bg-black text-white px-6 py-3 rounded-lg font-semibold">
          Request Uber Go
        </button>
      </div>
    </main>
  );
};

export default BookRide;
