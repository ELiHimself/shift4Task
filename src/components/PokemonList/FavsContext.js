import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback
} from "react";

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

  const saveToSessionStorage = useCallback((data) => {
    const stringifiedData = JSON.stringify(data);
    sessionStorage.setItem("favs", stringifiedData);
  }, []);

  // restore state if window refreshed
  useEffect(() => {
    const stringifiedFavs = sessionStorage.getItem("favs");
    const parsedFavs = JSON.parse(stringifiedFavs);
    setFavs(parsedFavs);
  }, [setFavs]);

  const toggleFavState = (pokemonName) => {
    if (favs[pokemonName]) {
      const newFavs = { ...favs };
      delete newFavs[pokemonName];
      setFavs(newFavs);

      saveToSessionStorage(newFavs);
    } else {
      const newFavs = { ...favs, [pokemonName]: 1 };
      setFavs(newFavs);

      saveToSessionStorage(newFavs);
    }
  };

  return {
    toggleFavState,
    favs
  };
};
