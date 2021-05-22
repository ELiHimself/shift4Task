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
        height: "28px",
        width: "28px",
        padding: 0,
        background: "transparent",
        border: "none",
        cursor: "pointer",
      }}
    >
      <FavoriteIcon fill={!!favs[pokemonName]} />
    </button>
  );
};

export default FavButton;
