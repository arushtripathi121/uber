import React from "react";
import { useUser } from "../context/AuthContext";
import CarDetailsEntry from "../components/CarDetailsEntry";
import SearchRide from "../components/SearchRide";
import BookRide from "../components/BookRide";
import Map from "../components/Map";
import { useBook } from "../context/BookContext";

const HomePage = () => {
  const { user, isCaptain, isCarDetailsPresent } = useUser();
  const { isSearched } = useBook();

  return (
    <div>
      {isCaptain && !isCarDetailsPresent && <CarDetailsEntry />}

      <section className="grid grid-cols-5 gap-6 min-h-screen">
        <div className="col-span-1">
          <SearchRide />
        </div>

        {isSearched && (
          <div className="col-span-2">
            <BookRide />
          </div>
        )}

        <div className={isSearched ? "col-span-2" : "col-span-4"}>
          <Map />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
