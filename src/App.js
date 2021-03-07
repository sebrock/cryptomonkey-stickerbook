import React from "react";
import Album from "./routes/Album";
import Suggestion from "./routes/Suggestion";
import "./styles.css";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Album />
        </Route>
        <Route exact path='/user/:username'>
          <Album />
        </Route>
        <Route exact path='/suggestion'>
          <Suggestion />
        </Route>
      </Switch>
    </Router>
  );
}
