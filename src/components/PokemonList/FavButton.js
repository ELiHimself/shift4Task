import React, { useState } from "react";
import FavoriteIcon from "../FavoriteIcon/FavoriteIcon";
import { useFavs } from "./FavsContext";

const FavButton = ({ pokemonName, size }) => {
  const { toggleFavState, favs } = useFavs();
  const [hover, setHover] = useState(false);

  const handleFavToggle = (e) => {
    e.stopPropagation();
    toggleFavState(pokemonName);
  };

  return (
    <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleFavToggle}
      style={{
        height: size ? `${size}px` : "28px",
        width: size ? `${size}px` : "28px",
        padding: 0,
        background: "transparent",
        border: "none",
        cursor: "pointer",
      }}
    >
      <FavoriteIcon fill={!!favs[pokemonName] || hover} />
    </button>
  );
};

export default FavButton;
