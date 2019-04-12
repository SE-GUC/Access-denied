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
class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <MDBCard
        className="card-body"
        style={{ width: "22rem", marginTop: "1rem" }}
      >
        <MDBCardTitle>Filter By:</MDBCardTitle>
        <hr />
        <form>
          <p className="h5 mb-4" style={{ margin: "px" }}>
            Budget
          </p>
          <div className="grey-text">
            <MDBRow>
              <MDBCol>
                <MDBInput label="Min. Range" error="wrong" success="right" />
              </MDBCol>
              <MDBCol>
                <MDBInput label="Max. Range" error="wrong" success="right" />
              </MDBCol>
            </MDBRow>
          </div>
          <hr />
          <p className="h5 mb-4" style={{ margin: "px" }}>
            Job Type
          </p>
          <p>
            <input type="checkbox" id="partTime" />
            <label htmlFor="partTime">
              <span className="ui mb-4" />
              <span className="KeyWords">Part Time</span>
            </label>
          </p>
          <p>
            <input type="checkbox" id="fullTime" />
            <label htmlFor="fullTime">
              <span className="ui mb-4" />
              <span className="KeyWords">Full Time</span>
            </label>
          </p>
          <hr />
          <p className="h5 mb-4" style={{ margin: "px" }}>
            Skills Required
          </p>
          <MDBRow style={{ marginBottom: "5px" }}>
            <MDBCol>
              <input type="checkbox" id="PHP" />
              <label htmlFor="PHP">
                <span className="ui mb-4" />
                <span className="KeyWords">PHP</span>
              </label>
            </MDBCol>
          </MDBRow>
          <MDBRow style={{ marginBottom: "5px" }}>
            <MDBCol>
              <input type="checkbox" id="NodeJS" />
              <label htmlFor="NodeJS">
                <span className="ui mb-4" />
                <span className="KeyWords">NodeJS</span>
              </label>
            </MDBCol>
          </MDBRow>
          <MDBRow style={{ marginBottom: "5px" }}>
            <MDBCol>
              <input type="checkbox" id=".NET" />
              <label htmlFor=".NET">
                <span className="ui mb-4" />
                <span className="KeyWords">.NET</span>
              </label>
            </MDBCol>
          </MDBRow>
          <MDBRow style={{ marginBottom: "5px" }}>
            <MDBCol>
              <input type="checkbox" id="VueJS" />
              <label htmlFor="VueJS">
                <span className="ui mb-4" />
                <span className="KeyWords">VueJS</span>
              </label>
            </MDBCol>
          </MDBRow>
          <hr />
          <div className="text-center">
            <MDBBtn>Filter</MDBBtn>
          </div>
        </form>
      </MDBCard>
    );
  }
}

export default Filter;
