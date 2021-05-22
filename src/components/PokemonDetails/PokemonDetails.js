import React, { useEffect, useMemo, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { utilCapitaliseFirstChar } from "../../utils";
import FavButton from "../PokemonList/FavButton";
import bgImg from "../../assets/bg.jpeg";
import grassImg from "../../assets/grass.png";

const PokemonDetails = () => {
  const { pokemonName } = useParams();
  const { state } = useLocation();
  const [hover, setHover] = useState(false);

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
    <div style={styles.container}>
      <div style={styles.overlay} />
      <div style={styles.grass} />

      <div style={styles.content}>
        <div style={styles.nameContainer}>
          <FavButton pokemonName={pokemonName} size={"35"} />
          <h1 style={styles.name}>{utilCapitaliseFirstChar(pokemonName)}</h1>
        </div>

        <div style={styles.statsContainer}>
          <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
              ...styles.img,
              transform: hover ? "scale(1.02)" : "scale(1)",
              backgroundImage: `url(${state.sprites.front_default})`,
            }}
          />

          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <caption style={styles.caption}>Stats</caption>
              <thead>
                <tr>
                  {["Name", "Base Stat", "Effort"].map((label, i) => (
                    <th style={styles.dataHeaderCell} key={i}>
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {state.stats.map((stat, i) => (
                  <tr key={i}>
                    <td style={styles.dataCell}>{stat.stat["name"]}</td>
                    <td style={styles.dataCell}>{stat["base_stat"]}</td>
                    <td style={styles.dataCell}>{stat["effort"]}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <table style={styles.table}>
              <caption style={styles.caption}>Abilities</caption>
              <thead>
                <tr>
                  {["Slot no.", "Name"].map((label, i) => (
                    <th style={styles.dataHeaderCell} key={i}>
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {abilitiesSortedBySlot.map((ability, i) => (
                  <tr key={i}>
                    <td style={styles.dataCell}>{ability["slot"]}</td>
                    <td style={styles.dataCell}>
                      {utilCapitaliseFirstChar(ability.ability["name"])}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  name: {
    margin: 0,
    marginLeft: "20px",
    textShadow: "2px 2px silver",
  },
  container: {
    padding: "15px",
    paddingTop: "50px",
    position: "relative",
    minHeight: "100vh",
    backgroundColor: "#2a75bb",
  },
  overlay: {
    position: "absolute",
    top: "0",
    left: "0",
    height: "100%",
    width: "100%",
    backgroundImage: `url(${bgImg})`,
    backgroundPosition: "center center",
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    opacity: "0.3",
  },
  content: {
    position: "relative",
    zIndex: 2,
  },
  table: {
    background: "lightgrey",
    padding: "15px",
    position: "relative",
    borderRadius: "15px",
    border: "5px solid silver",
    boxShadow: "5px 5px 15px 5px rgba(0,0,0,0.21)",
    transition: "all .2s linear",
    marginBottom: "30px",
  },
  dataCell: {
    fontSize: "10px",
    padding: "5px",
    opacity: "0.5",
  },
  dataHeaderCell: {
    fontSize: "12px",
    padding: "5px",
    textAlign: "left",
    paddingBottom: "10px",
  },
  caption: {
    marginBottom: "15px",
    textAlign: "left",
    fontSize: "13px",
    textShadow: "2px 2px silver",
  },
  nameContainer: {
    display: "flex",
    margin: "30px",
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    transition: "all .2s linear",
    height: "400px",
    width: "400px",
    backgroundSize: "cover",
    backgroundPosition: "center center",
    marginBottom: "15px",
  },
  statsContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  grass: {
    position: "fixed",
    bottom: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundImage: `url(${grassImg})`,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "bottom",
    backgroundAttachment: "fixed",
    zIndex: 10,
  },
};

export default PokemonDetails;
