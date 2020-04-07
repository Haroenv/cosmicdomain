import React from "react";
import "./App.css";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./pages/Home";
import Domains from "./pages/Domains";
import SingleDomain from "./components/shared/SingleDomain";
import DomainsList from "./components/shared/DomainsList";
import NotFound from "./pages/NotFound";

function App(props) {
   return (
      <Router>
         <Switch>
            <Route exact path='/home' render={rProps => <DomainsList {...rProps} />} />
            <Route exact path='/domains/:slug' render={rProps => <SingleDomain {...rProps} />} />
         </Switch>
         <Route exact path='/' component={Home} />
         <Route exact path='/domains/' component={Domains} />
         <Route exact path='/domains/search/*' component={Domains} />
      </Router>
   );
}

export default App;
