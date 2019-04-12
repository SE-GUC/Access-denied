import React, {
  Component
} from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from "react-router-dom";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardText,
  MDBCardTitle
} from "mdbreact";
import "bootstrap/dist/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "../styles.css";
import Filter from "../Components/Filter.js";
import CountriesRend from "../Components/CountriesRend.js";

class Tasks extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  render() {
    return ( <
      div >
      <
      MDBContainer >
      <
      MDBRow >
      <
      MDBCol className = "col-5" >
      <
      Filter / >
      <
      /MDBCol>

      <
      MDBCard className = "card-body"
      style = {
        {
          width: "22rem",
          marginTop: "1rem"
        }
      } >
      <
      CountriesRend / >
      <
      /MDBCard> <
      /MDBRow> <
      /MDBContainer> <
      /div>
    );
  }
}

export default Tasks;