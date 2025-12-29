import { createContext, useContext, useState } from "react";

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [isSearched, setIsSearched] = useState(false);
  const [pickupCoords, setPickupCoords] = useState(null);
  const [dropCoords, setDropCoords] = useState(null);
  const [userCoords, setUserCoords] = useState(null);
  const [mapSelectMode, setMapSelectMode] = useState(null);

  return (
    <BookContext.Provider
      value={{
        isSearched,
        setIsSearched,
        pickupCoords,
        setPickupCoords,
        dropCoords,
        setDropCoords,
        userCoords,
        setUserCoords,
        mapSelectMode,
        setMapSelectMode,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

export const useBook = () => useContext(BookContext);
