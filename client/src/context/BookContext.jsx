import { createContext, useContext, useState } from "react";


export const BookContext = createContext();

export const BookProvider = ({children}) => {

    const [isSearched, setIsSearched] = useState(false);

    return (
        <BookContext.Provider value={{isSearched, setIsSearched}}>
            {children}
        </BookContext.Provider>
    )
}

export const useBook = () => useContext(BookContext); 