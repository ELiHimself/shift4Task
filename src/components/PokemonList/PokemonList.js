import React, { useEffect } from "react";
import PokemonListItem from "./PokemonListItem";
import { useFetcher } from "../../hooks";
import logo from "../../assets/logo.png";
import bgImg from "../../assets/bg.jpeg";

const BASE_URL = "https://pokeapi.co/api/v2/pokemon";
const FETCH_URL = `${BASE_URL}?limit=15`;

const PokemonList = () => {
  const { loading, err, data, fetchData } = useFetcher(FETCH_URL);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div style={styles.container}>
      <div style={styles.containerOverlay} />

      <div style={styles.content}>
        <div style={styles.logoContainer}>
          <img style={styles.logo} src={logo} alt="pokemon-logo" />
        </div>

        {err ? (
          <div>{err}</div>
        ) : loading ? (
          <h2 style={styles.loading}>Loading...</h2>
        ) : data.results.length === 0 ? (
          <div>There are no Pokemon to show yet...</div>
        ) : (
          <div style={styles.gridContainer}>
            {data.results.map((d, i) => (
              <div key={i} style={styles.gridItem}>
                <PokemonListItem data={d} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    background: "#2a75bb",
    minHeight: "100vh",
    position: "relative",
  },
  containerOverlay: {
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
  gridContainer: {
    display: "flex",
    flexWrap: "wrap",
    padding: "7.5px",
    justifyContent: "center",
  },
  gridItem: {
    padding: "7.5px",
    width: "calc(20% - 15px)",
    minWidth: "140px",
  },
  logoContainer: {
    display: "flex",
    justifyContent: "center",
    padding: "15px",
  },
  logo: {
    height: "160px",
    maxWidth: "100%",
  },
  loading: {
    textAlign: "center",
    fontSize: "25px",
    color: "silver",
    opacity: ".8",
    textShadow: "2px 2px grey",
  },
};

export default PokemonList;
