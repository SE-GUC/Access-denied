import React, { Component } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardText,
  MDBCardTitle,
  MDBCardBody
} from "mdbreact";

class ProjectTitle extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <MDBCard style={{ width: "100%", marginTop: "1rem" }}>
        <MDBCardBody>
          <MDBCardTitle>
            Integrating a Hyperledger network with an android application using
            REST APIs
          </MDBCardTitle>
        </MDBCardBody>
      </MDBCard>
    );
  }
}

export default ProjectTitle;
