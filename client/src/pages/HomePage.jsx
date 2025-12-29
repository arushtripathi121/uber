import React from "react";
import { useUser } from "../context/AuthContext";
import CarDetailsEntry from "../components/CarDetailsEntry";
import SearchRide from "../components/SearchRide";
import RideMenu from "../components/RideMenu";
import Map from "../components/Map";
import { useBook } from "../context/BookContext";

const HomePage = () => {
  const { isCaptain, isCarDetailsPresent } = useUser();
  const {isSearched} = useBook();

  return (
    <div className="w-screen h-screen">
      {isCaptain && !isCarDetailsPresent && <CarDetailsEntry />}

      <section className="grid grid-cols-5 w-full h-full">
        <div className="col-span-1">
          <SearchRide />
        </div>
        { isSearched &&
          <div className="col-span-2">
            <RideMenu />
          </div>
        }
        <div className={!isSearched ? "col-span-4" : "col-span-2"}>
          <Map />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
