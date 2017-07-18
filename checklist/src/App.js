import React, { Component } from "react";
import { Switch, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";

// the different pages that can be rendered
import CreateOrEditChecklist from "./pages/CreateOrEditChecklist.js";
import Home from "./pages/Home.js";
import UserManagement from "./pages/UserManagement.js";
import ViewChecklists from "./pages/ViewChecklists.js";

import "./App.css";

class App extends Component {
  onClick(value) {
    console.log(value);
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              exact
              path="/createchecklist"
              component={CreateOrEditChecklist}
            />
            <Route exact path="/viewchecklists" component={ViewChecklists} />
            <Route exact path="/users" component={UserManagement} />

            <Route
              render={function() {
                return <p>Not Found</p>;
              }}
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;