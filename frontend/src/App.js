import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";

import Home from "./pages/Home";
import Domains from "./pages/Domains";
import NotFound from "./pages/NotFound";

class App extends Component {
  render() {
    return (
      <Router>
        {/*All our Routes goes here!*/}
        {/* <Route path='/' component={} /> */}
        <Route exact path='/' component={Home} />
        <Route exact path='/domains/' component={Domains} />
        {/* <Route exact component={NotFound} />
        <Redirect to='/404' /> */}
      </Router>
    );
  }
}

export default App;
