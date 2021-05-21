import React from "react";
import PokemonList from "./components/PokemonList/PokemonList";
import PokemonDetails from "./components/PokemonDetails/PokemonDetails";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const NotFoundPage = () => <div>404 - Not found</div>;

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={PokemonList} />
        <Route exact path="/:pokemonName" component={PokemonDetails} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </Router>
  );
}
