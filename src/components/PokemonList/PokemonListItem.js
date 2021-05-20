import React, { useEffect, useState, useCallback } from "react";
import { utilCapitaliseFirstChar } from "../../utils";

const PokemonListItem = (props) => {
  const { name, url } = props.data;

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [err, setErr] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(url);
      const parsedData = await res.json();

      setData(parsedData);
      setLoading(false);
    } catch (error) {
      setErr(
        "Trouble while fetching individual Pokemon data. Try again later."
      );
      setLoading(false);
    }
  }, [url]);

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
