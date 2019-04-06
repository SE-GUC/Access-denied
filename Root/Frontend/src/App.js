import React, { Component } from "react";
import "./App.css";
import Member from "./Member";
class App extends Component {
  render() {
    return (
      <div className="App">
        <Member email={"g@50.gmail.com"} />
      </div>
    );
  }
}

export default App;
