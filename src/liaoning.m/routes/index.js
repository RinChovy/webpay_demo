import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../pages/home/index.js";
import About from "../pages/about/index.js";
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/home" exact={true} component={Home} />
        <Route path="/about" component={About} />
      </Switch>
    </Router>
  );
}
export default App;
