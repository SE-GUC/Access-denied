import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Certificate from "./Screens/Certificate";
import Home from "./Screens/Home";
import Member from "./Screens/Member";
import NavBar from "./Components/navBar";
import Search from "./Screens/SearchPage"


class App extends Component {
  render() {
    const marginVal = window.location.pathname !== "/" ? "4.75%" : "0%";
    return (
      <Router>
        {window.location.pathname !== "/" ? (
          <div>
            <NavBar />
          </div>
        ) : null}
        <div style={{ marginTop: marginVal }}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route
              path="/certificate/"
              render={props => (
                <Certificate {...props} id="5ca0c0b44e81266044cf2b70" />
              )}
            />
            <Route path="/member/" component={Member} />
            <Route path="/nav/" component={NavBar} />
            <Route path="/search/" component={Search} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
