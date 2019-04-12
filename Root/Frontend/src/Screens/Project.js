import React, {
  Component
} from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardText,
  MDBCardTitle,
  MDBCardBody
} from "mdbreact";
import "bootstrap/dist/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "../styles.css";

import VerticalScrollMenu from "../Components/VerticalScrollMenu.js";
import ProjectOwner from "../Components/ProjectOwner.js";
import ProjectTitle from "../Components/ProjectTitle.js";
import ProjectBody from "../Components/ProjectBody.js";

class Project extends Component {
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
      MDBCol size = "6" >
      <
      MDBRow style = {
        {
          margin: "20px"
        }
      } >
      <
      ProjectTitle / >
      <
      /MDBRow> <
      MDBRow style = {
        {
          margin: "20px"
        }
      } >
      <
      ProjectBody / >
      <
      /MDBRow> <
      /MDBCol> <
      MDBCol size = "6" >
      <
      MDBRow >
      <
      ProjectOwner / >
      <
      /MDBRow> <
      MDBRow >
      <
      VerticalScrollMenu / >
      <
      /MDBRow> <
      /MDBCol> <
      /MDBRow> <
      /MDBContainer> <
      /div>
    );
  }
}

export default Project;