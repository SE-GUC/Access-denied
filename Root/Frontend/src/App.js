import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Certificate from "./Screens/Certificate";
import Home from "./Screens/Home";
import Member from "./Screens/Member";

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
        <Route path="/member/" component={Member} />
      </Router>
    );
  }
}

export default App;
