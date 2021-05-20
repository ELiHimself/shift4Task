import React, { useEffect, useState, useCallback } from "react";

const BASE_URL = "https://pokeapi.co/api/v2/pokemon";
const FETCH_URL = `${BASE_URL}?limit=15`;

const utilCapitaliseFirstChar = (str) => {
  return `${str.charAt(0).toUpperCase() + str.slice(1)}`;
};

const Pokemon = (props) => {
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

const PokemonList = () => {
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [err, setErr] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(FETCH_URL);
      const parsedData = await res.json();
      const { results } = parsedData;
      setPokemonData(results);
      setLoading(false);
    } catch (error) {
      setErr("Trouble while fetching Pokemon data. Try again later.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (err) {
    return <div>{err}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (pokemonData.length === 0) {
    return <div>There are no Pokemon to show yet...</div>;
  }

  return pokemonData.map((data, i) => <Pokemon data={data} key={i} />);
};

export default PokemonList;
