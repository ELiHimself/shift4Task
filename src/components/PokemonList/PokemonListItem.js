import React, { useEffect } from "react";
import { utilCapitaliseFirstChar } from "../../utils";
import { useFetcher } from "../../hooks";
import FavoriteIcon from "../FavoriteIcon/FavoriteIcon";
import { useFavs } from "./FavsContext";
import { useHistory } from "react-router-dom";

const PokemonListItem = (props) => {
  const { name, url } = props.data;
  const { loading, err, data, fetchData } = useFetcher(url);
  const { toggleFavState, favs } = useFavs();

  const history = useHistory();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleFavToggle = (e) => {
    e.stopPropagation();
    toggleFavState(name);
  };

  return (
    <div
      onClick={() => history.push(`/${name}`, data)}
      style={{ marginBottom: "20px", maxWidth: 150, background: "silver" }}
    >
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
        onClick={handleFavToggle}
        style={{
          height: "30px",
          width: "30px",
          padding: 0,
          background: "transparent",
          border: "1px solid red",
        }}
      >
        <FavoriteIcon fill={!!favs[name]} />
      </button>
    </div>
  );
};

export default PokemonListItem;
