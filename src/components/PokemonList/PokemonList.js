import React, { useEffect } from "react";
import PokemonListItem from "./PokemonListItem";
import { useFetcher } from "../../hooks";
import { FavsContextProvider } from "./FavsContext";

const BASE_URL = "https://pokeapi.co/api/v2/pokemon";
const FETCH_URL = `${BASE_URL}?limit=15`;

const PokemonList = () => {
  const { loading, err, data, fetchData } = useFetcher(FETCH_URL);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (err) {
    return <div>{err}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (data.results.length === 0) {
    return <div>There are no Pokemon to show yet...</div>;
  }

  return (
    <FavsContextProvider>
      {data.results.map((d, i) => (
        <PokemonListItem data={d} key={i} />
      ))}
    </FavsContextProvider>
  );
};

export default PokemonList;
