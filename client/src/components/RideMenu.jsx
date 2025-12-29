import React from "react";
import go from "../assets/go.png";
import xl from "../assets/xl.png";
import moto from "../assets/moto.png";

const RideMenu = () => {
  return (
    <main className="w-full h-full">
      <div className="pt-8 px-8 flex flex-col gap-3">
        <div className="text-4xl font-semibold">Choose a ride</div>
        <div className="text-lg font-semibold">Rides we think you'll like</div>
      </div>

      <section className="flex flex-col gap-4 bg-white">
        <div className="flex flex-row items-center justify-between p-5">
          <div className="flex gap-4 items-center">
            <div className="w-24 h-24 flex items-center justify-center rounded-xl">
              <img src={go} className="w-24 object-contain" />
            </div>

            <div>
              <div className="text-xl font-semibold">Uber Go</div>
              <div className="text-gray-600">4 mins away · 4:15 PM</div>
              <div className="text-sm text-gray-500">Faster</div>
            </div>
          </div>

          <div className="font-bold text-3xl">₹179.99</div>
        </div>

        <div className="flex flex-row items-center justify-between p-5">
          <div className="flex gap-4 items-center">
            <div className="w-24 h-24 flex items-center justify-center rounded-xl">
              <img src={xl} className="w-24 object-contain" />
            </div>

            <div>
              <div className="text-xl font-semibold">Uber XL</div>
              <div className="text-gray-600">4 mins away · 4:15 PM</div>
              <div className="text-sm text-gray-500">Faster</div>
            </div>
          </div>

          <div className="font-bold text-3xl">₹179.99</div>
        </div>

        <div className="flex flex-row items-center justify-between p-5">
          <div className="flex gap-4 items-center">
            <div className="w-24 h-24 flex items-center justify-center rounded-xl">
              <img src={moto} className="w-24 object-contain" />
            </div>

            <div>
              <div className="text-xl font-semibold">Uber Moto</div>
              <div className="text-gray-600">4 mins away · 4:15 PM</div>
              <div className="text-sm text-gray-500">Faster</div>
            </div>
          </div>

          <div className="font-bold text-3xl">₹179.99</div>
        </div>
      </section>
    </main>
  );
};

export default RideMenu;
