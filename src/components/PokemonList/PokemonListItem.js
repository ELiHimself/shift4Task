import React, { useEffect } from "react";
import { utilCapitaliseFirstChar } from "../../utils";
import { useFetcher } from "../../hooks";
import { useHistory } from "react-router-dom";
import FavButton from "./FavButton";

const PokemonListItem = (props) => {
  const { name, url } = props.data;
  const { loading, err, data, fetchData } = useFetcher(url);

  const history = useHistory();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
      <FavButton pokemonName={name} />
    </div>
  );
};

export default PokemonListItem;
