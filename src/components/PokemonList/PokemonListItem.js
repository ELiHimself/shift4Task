import React, { useEffect, useState } from "react";
import { utilCapitaliseFirstChar } from "../../utils";
import { useFetcher } from "../../hooks";
import { useHistory } from "react-router-dom";
import FavButton from "./FavButton";

const PokemonListItem = (props) => {
  const { name, url } = props.data;
  const { loading, err, data, fetchData } = useFetcher(url);
  const [hover, setHover] = useState(false);

  const history = useHistory();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => history.push(`/${name}`, data)}
      style={{ ...styles.card, transform: hover ? "scale(1.02)" : "scale(1)" }}
    >
      <div
        style={{
          ...styles.img,
          backgroundImage: `url(${
            err || loading || !data
              ? "https://via.placeholder.com/150C"
              : data.sprites.front_default
          })`,
        }}
      />
      <h3 style={styles.name}>{utilCapitaliseFirstChar(name)}</h3>
      <div style={styles.favBtn}>
        <FavButton pokemonName={name} />
      </div>
    </div>
  );
};

const styles = {
  card: {
    background: "lightgrey",
    padding: "15px",
    position: "relative",
    borderRadius: "15px",
    border: "5px solid silver",
    cursor: "pointer",
    boxShadow: "5px 5px 15px 5px rgba(0,0,0,0.21)",
    transition: "all .2s linear",
  },
  img: {
    height: "130px",
    width: "100%",
    backgroundSize: "cover",
    backgroundPosition: "center center",
    marginBottom: "15px",
  },
  favBtn: {
    position: "absolute",
    top: "5px",
    left: "5px",
  },
  name: {
    textAlign: "center",
    margin: "0",
    fontSize: "11px",
    color: "black",
    textShadow: "2px 2px silver",
  },
};

export default PokemonListItem;
