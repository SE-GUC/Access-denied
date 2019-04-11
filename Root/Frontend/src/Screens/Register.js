import React, { Component } from "react";
import "./Register.css";
import ListDividers from "../Components/ListDividers";
import { MuiThemeProvider } from "@material-ui/core";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      member: false,
      consultancy: false,
      edu: false,
      partner: false,
      coworking: false,
      loaded: false
    };
  }

  render() {
    return (
      <div id="cont">
        <div id="sign">
          <br />
          <label>Who are you?</label>
          <h3>I am a...</h3>
        </div>

        <div id="selectors">
          <MuiThemeProvider>
            <ListDividers />
          </MuiThemeProvider>
        </div>
      </div>
    );
  }
}

export default Register;
