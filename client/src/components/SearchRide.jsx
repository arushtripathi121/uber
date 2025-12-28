import React from "react";
import { useBook } from "../context/BookContext";

const SearchRide = () => {

    const {setIsSearched, isSearched} = useBook();
  return (
    <main className="w-full h-full flex flex-col">
      <p className="text-2xl font-bold text-gray-900 ml-8 mt-10">Get a ride</p>

      <section className="bg-white rounded-xl mt-5 px-8 w-full max-w-md flex flex-col gap-4">
        <input
          type="text"
          placeholder="Pickup location"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
        />
        <input
          type="text"
          placeholder="Drop location"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
        />
        <button onClick={() => setIsSearched(!isSearched)} className="w-full bg-black text-white font-bold py-3 rounded-lg cursor-pointer transition hover:scale-101">
          Search
        </button>
      </section>
    </main>
  );
};

export default SearchRide;
