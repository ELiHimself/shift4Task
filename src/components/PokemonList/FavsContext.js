import React, { createContext, useState, useContext } from "react";

export const FavsContext = createContext();

export const FavsContextProvider = (props) => {
  const [favs, setFavs] = useState({});

  return (
    <FavsContext.Provider value={{ favs, setFavs }}>
      {props.children}
    </FavsContext.Provider>
  );
};

export const useFavs = () => {
  const { favs, setFavs } = useContext(FavsContext);

  const toggleFavState = (pokemonName) => {
    if (favs[pokemonName]) {
      const newFavs = { ...favs };
      delete newFavs[pokemonName];
      setFavs(newFavs);
    } else {
      const newFavs = { ...favs, [pokemonName]: 1 };
      setFavs(newFavs);
    }
  };

  return {
    toggleFavState,
    favs
  };
};
