import React, { Component } from "react";
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBInput,
  MDBBtn
} from "mdbreact";
import "../src/styles.css";

class VerticalScrollMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <MDBCard
        className="card-body"
        style={{ width: "660px", marginTop: "1rem" }}
      >
        <MDBContainer>
          <MDBRow>
            <MDBCol>
              <MDBCardTitle
                style={{ fontWeight: "Bold", color: "grey", margin: "10px" }}
              >
                Project Tasks
              </MDBCardTitle>
            </MDBCol>
          </MDBRow>
          <hr />
          <MDBRow className="">
            <MDBCol>
              <div
                className="vertical-menu"
                style={{ margin: "10px", width: "100%", padding: "20px" }}
              >
                <p className="active">Home</p>
                <p>Lorem Ipsum</p>
                <p>Lorem Ipsum</p>
                <p>Lorem Ipsum</p>
                <p>Lorem Ipsum</p>
                <p>Lorem Ipsum</p>
                <p>Lorem Ipsum</p>
                <p>Lorem Ipsum</p>
                <p>Lorem Ipsum</p>
                <p>Lorem Ipsum</p>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </MDBCard>
    );
  }
}

export default VerticalScrollMenu;
