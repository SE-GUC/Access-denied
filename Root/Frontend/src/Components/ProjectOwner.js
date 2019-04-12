import React, { Component } from "react";
import {
  MDBCol,
  MDBRow,
  MDBCard,
  MDBCardUp,
  MDBCardBody,
  MDBAvatar,
  MDBRotatingCard,
  MDBIcon,
  MDBCardTitle,
  MDBCardText,
  MDBBtn
} from "mdbreact";

class ProjectOwner extends Component {
  constructor(props) {
    super(props);

    this.state = { flipped: false };

    this.handleFlipping = this.handleFlipping.bind(this);
  }

  handleFlipping() {
    this.setState({ flipped: !this.state.flipped });
  }

  componentDidMount() {}

  render() {
    return (
      <MDBCard style={{ width: "22rem", marginTop: "1rem" }}>
        <MDBCardBody>
          <MDBCardTitle>Shady Business INC.</MDBCardTitle>
          <MDBCardTitle tag="h6" sub className="mb-2 text-muted">
            We Shady Boi
          </MDBCardTitle>
          <MDBCardText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum{" "}
          </MDBCardText>
          <div>
            <a href="#!" className="card-link">
              Shady Business Facebook
            </a>
          </div>
          <div>
            <a href="#!" className="card-link">
              Shady Business Darkweb
            </a>
          </div>
        </MDBCardBody>
      </MDBCard>
    );
  }
}

export default ProjectOwner;
