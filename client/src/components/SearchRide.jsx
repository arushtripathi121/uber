import React, { useEffect, useState } from "react";
import { useBook } from "../context/BookContext";
import { IoCloseCircle, IoLocationSharp, IoMap } from "react-icons/io5";

const fetchSuggestions = async (q) => {
  if (q.length < 3) return [];
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${q}`
  );
  return res.json();
};

const SearchRide = () => {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [pickupSug, setPickupSug] = useState([]);
  const [dropSug, setDropSug] = useState([]);
  const [pickupFromMap, setPickupFromMap] = useState(false);
  const [dropFromMap, setDropFromMap] = useState(false);
  const [activePickupAction, setActivePickupAction] = useState(null);
  const [activeDropAction, setActiveDropAction] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    setIsSearched,
    pickupCoords,
    dropCoords,
    setPickupCoords,
    setDropCoords,
    setUserCoords,
    setMapSelectMode,
  } = useBook();

  const triggerSearch = () => {
    setLoading(true);
    setIsSearched(false);
    setTimeout(() => {
      setIsSearched(true);
      setLoading(false);
    }, 1200);
  };

  useEffect(() => {
    if (pickupCoords && dropCoords) {
      triggerSearch();
    }
  }, [pickupCoords, dropCoords]);

  useEffect(() => {
    const pickupHandler = (e) => {
      setPickup(e.detail);
      setPickupFromMap(true);
      setPickupSug([]);
      setActivePickupAction("map");
      setMapSelectMode(null);
    };

    const dropHandler = (e) => {
      setDrop(e.detail);
      setDropFromMap(true);
      setDropSug([]);
      setActiveDropAction(null);
      setMapSelectMode(null);
    };

    window.addEventListener("pickup-selected", pickupHandler);
    window.addEventListener("drop-selected", dropHandler);

    return () => {
      window.removeEventListener("pickup-selected", pickupHandler);
      window.removeEventListener("drop-selected", dropHandler);
    };
  }, []);

  useEffect(() => {
    if (pickupFromMap) return;
    const t = setTimeout(async () => {
      setPickupSug(await fetchSuggestions(pickup));
    }, 400);
    return () => clearTimeout(t);
  }, [pickup, pickupFromMap]);

  useEffect(() => {
    if (dropFromMap) return;
    const t = setTimeout(async () => {
      setDropSug(await fetchSuggestions(drop));
    }, 400);
    return () => clearTimeout(t);
  }, [drop, dropFromMap]);

  const useCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const coords = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      };
      setPickup("Current location");
      setPickupCoords(coords);
      setUserCoords(coords);
      setPickupFromMap(true);
      setActivePickupAction("current");
      setMapSelectMode(null);
    });
  };

  return (
    <main className="w-full h-full">
      <div className="flex flex-col p-8 gap-6">
        <div className="text-gray-900 text-3xl font-bold">Get a ride</div>

        <div className="flex flex-col gap-4 w-full max-w-md">
          <div className="relative">
            <input
              value={pickup}
              onChange={(e) => {
                setPickup(e.target.value);
                setPickupFromMap(false);
                setActivePickupAction(null);
              }}
              placeholder="Pickup location"
              className="w-full border border-gray-300 px-4 py-3 rounded-xl"
            />
            {pickup && (
              <IoCloseCircle
                onClick={() => {
                  setPickup("");
                  setPickupCoords(null);
                  setActivePickupAction(null);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-2xl cursor-pointer"
              />
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={useCurrentLocation}
              className={`px-4 py-2 rounded-lg border ${
                activePickupAction === "current"
                  ? "bg-black text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              <IoLocationSharp /> Current location
            </button>

            <button
              onClick={() => {
                setMapSelectMode("pickup");
                setActivePickupAction("map");
              }}
              className={`px-4 py-2 rounded-lg border ${
                activePickupAction === "map"
                  ? "bg-black text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              <IoMap /> Choose on map
            </button>
          </div>

          <div className="relative">
            <input
              value={drop}
              onChange={(e) => {
                setDrop(e.target.value);
                setDropFromMap(false);
                setActiveDropAction(null);
              }}
              placeholder="Drop location"
              className="w-full border border-gray-300 px-4 py-3 rounded-xl"
            />
            {drop && (
              <IoCloseCircle
                onClick={() => {
                  setDrop("");
                  setDropCoords(null);
                  setActiveDropAction(null);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-2xl cursor-pointer"
              />
            )}
          </div>

          <button
            onClick={() => {
              setMapSelectMode("drop");
              setActiveDropAction("map");
            }}
            disabled={!!dropCoords}
            className={`px-4 py-2 rounded-lg border w-fit ${
              dropCoords
                ? "bg-gray-200 cursor-not-allowed"
                : activeDropAction === "map"
                ? "bg-black text-white"
                : "hover:bg-gray-100"
            }`}
          >
            <IoMap /> Choose drop on map
          </button>

          {loading && (
            <div className="text-center font-semibold animate-pulse">
              Finding best rides...
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default SearchRide;
