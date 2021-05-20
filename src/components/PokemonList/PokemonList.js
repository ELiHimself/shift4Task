import React, { useEffect, useState, useCallback } from "react";
import PokemonListItem from "./PokemonListItem";

const BASE_URL = "https://pokeapi.co/api/v2/pokemon";
const FETCH_URL = `${BASE_URL}?limit=15`;

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

  return pokemonData.map((data, i) => <PokemonListItem data={data} key={i} />);
};

export default PokemonList;
