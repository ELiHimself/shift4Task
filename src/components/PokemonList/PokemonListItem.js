import React, { useEffect } from "react";
import { utilCapitaliseFirstChar } from "../../utils";
import { useFetcher } from "../../hooks";
import FavoriteIcon from "../FavoriteIcon/FavoriteIcon";
import { useFavs } from "./FavsContext";

const PokemonListItem = (props) => {
  const { name, url } = props.data;
  const { loading, err, data, fetchData } = useFetcher(url);
  const { toggleFavState, favs } = useFavs();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div style={{ marginBottom: "20px", maxWidth: 150 }}>
      {err || loading || !data ? (
        <img
          alt={`${name}-placeholder`}
          src="https://via.placeholder.com/150C"
        />
      ) : (
        <img alt={name} src={data.sprites.front_default} />
      )}
      <div style={{ textAlign: "center" }}>{utilCapitaliseFirstChar(name)}</div>
      <button
        onClick={() => toggleFavState(name)}
        style={{
          height: "30px",
          width: "30px",
          padding: 0,
          background: "transparent",
          border: "1px solid red"
        }}
      >
        <FavoriteIcon fill={!!favs[name]} />
      </button>
    </div>
  );
};

export default PokemonListItem;
