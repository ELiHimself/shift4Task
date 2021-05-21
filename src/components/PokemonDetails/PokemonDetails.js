import React, { useEffect, useMemo } from "react";
import { useParams, useLocation } from "react-router-dom";
import { utilCapitaliseFirstChar } from "../../utils";
import { useFavs } from "../PokemonList/FavsContext";
import FavoriteIcon from "../FavoriteIcon/FavoriteIcon";

const PokemonDetails = () => {
  const { pokemonName } = useParams();
  const { state } = useLocation();
  const { toggleFavState, favs } = useFavs();

  useEffect(() => {
    if (!state) {
      // TODO: mini cache mechanism
      console.log("Need to fetch data!");
    }
  }, [state]);

  // The abilities seem to be sorted by slot out of the box by BE.
  // However, this is how i would do it if they were not.
  const abilitiesSortedBySlot = useMemo(() => {
    const sortAlgo = (a, b) => {
      if (a > b) {
        return 1;
      } else if (a < b) {
        return -1;
      } else {
        return 0;
      }
    };

    return state.abilities.sort(sortAlgo);
  }, [state.abilities]);

  return (
    <div>
      <h1>{utilCapitaliseFirstChar(pokemonName)}</h1>

      <button
        onClick={() => toggleFavState(pokemonName)}
        style={{
          height: "30px",
          width: "30px",
          padding: 0,
          background: "transparent",
          border: "1px solid red",
        }}
      >
        <FavoriteIcon fill={!!favs[pokemonName]} />
      </button>

      <table style={{ marginBottom: "30px" }}>
        <caption>Stats</caption>
        <thead>
          <tr>
            {["Name", "Base Stat", "Effort"].map((label, i) => (
              <th key={i}>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {state.stats.map((stat, i) => (
            <tr key={i}>
              <td>{stat.stat["name"]}</td>
              <td>{stat["base_stat"]}</td>
              <td>{stat["effort"]}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <table>
        <caption>Abilities</caption>
        <thead>
          <tr>
            {["Slot no.", "Name"].map((label, i) => (
              <th key={i}>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {abilitiesSortedBySlot.map((ability, i) => (
            <tr key={i}>
              <td>{ability["slot"]}</td>
              <td>{utilCapitaliseFirstChar(ability.ability["name"])}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PokemonDetails;
