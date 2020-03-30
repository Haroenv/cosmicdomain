import React from "react";
import "./App.css";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./pages/Home";
import Domains from "./pages/Domains";

import SingleDomain from "./components/shared/SingleDomain";
import DomainsList from "./components/shared/DomainsList";

function App(props) {
   console.log("route", Route);
   console.log("switch", Switch);

   return (
      <Router>
         <Switch>
            <Route exact path='/domainslist' render={rProps => <DomainsList {...rProps} />} />
            <Route exact path='/:slug' render={rProps => <SingleDomain {...rProps} />} />
         </Switch>
         <Route exact path='/' component={Home} />
         <Route exact path='/domains/' component={Domains} />
      </Router>
   );
}

export default App;
