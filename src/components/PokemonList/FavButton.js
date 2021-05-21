import React from "react";
import FavoriteIcon from "../FavoriteIcon/FavoriteIcon";
import { useFavs } from "./FavsContext";

const FavButton = ({ pokemonName }) => {
  const { toggleFavState, favs } = useFavs();

  const handleFavToggle = (e) => {
    e.stopPropagation();
    toggleFavState(pokemonName);
  };

  return (
    <button
      onClick={handleFavToggle}
      style={{
        height: "30px",
        width: "30px",
        padding: 0,
        background: "transparent",
        border: "1px solid red",
      }}
    >
      <FavoriteIcon fill={!!favs[pokemonName]} />
    </button>
  );
};

export default FavButton;
