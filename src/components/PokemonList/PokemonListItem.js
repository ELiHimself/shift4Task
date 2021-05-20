import React, { useEffect } from "react";
import { utilCapitaliseFirstChar } from "../../utils";
import { useFetcher } from "../../hooks";

const PokemonListItem = (props) => {
  const { name, url } = props.data;
  const { loading, err, data, fetchData } = useFetcher(url);

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
    </div>
  );
};

export default PokemonListItem;
