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

class ProjectBody extends Component {
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
          </MDBCardTitle>
        </MDBCardBody>
      </MDBCard>
    );
  }
}

export default ProjectBody;
