import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Certificate from "./Screens/Certificate";
import Home from "./Screens/Home";
class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={Home} />
        <Route
          path="/certificate/"
          render={props => (
            <Certificate {...props} id="5ca0c0b44e81266044cf2b70" />
          )}
        />
      </Router>
    );
  }
}

export default App;
