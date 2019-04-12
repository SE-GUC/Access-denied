import React, { Component } from "react";

import { Form, Button, Jumbotron, Container } from "react-bootstrap";
import "./EducationalForm.css";
const fetch = require("node-fetch");

class EducationalForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      city: "",
      area: "",
      street: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    alert("submitted: " + this.state.name);
    let mem = {
      email: this.state.email,
      name: this.state.name,
      password: this.state.password
    };
    fetch(`http://localhost:3001/api/EducationalOrganisation`, {
      //
      method: "POST",
      body: JSON.stringify(mem),
      headers: {
        "Content-Type": "application/json"
      }
      // credentials: "same-origin"
    })
      .then(res => res.json())
      .then(json => console.log("json"));

    event.preventDefault();
  }

  render() {
    return (
      <div id="themain">
        <div>
          <Jumbotron fluid>
            <Container>
              <h1>Educational Organisation Sign Up</h1>
              <p>Welcome to LirtenHub!</p>
            </Container>
          </Jumbotron>
          ;
        </div>
        <div className="theform">
          <Form id="MyForm" onSubmit={this.handleSubmit}>
            <link
              rel="stylesheet"
              href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
              integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
              crossOrigin="anonymous"
            />
            <label>
              Name:
              <br />
              <input
                type="text"
                name="name"
                required
                minLength="3"
                placeholder="your full name"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </label>
            <br />
            <label>
              Email:
              <br />
              <input
                type="text"
                name="email"
                required
                placeholder="your email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </label>
            <br />
            <label>
              Password:
              <br />
              <input
                type="password"
                name="password"
                required
                minLength="6"
                placeholder="your password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </label>
            <br />
            <label>
              city:
              <br />
              <input
                type="text"
                name="city"
                required
                placeholder="city of your headquarters"
                value={this.state.birthDate}
                onChange={this.handleChange}
              />
            </label>
            <br />
            <label>
              Area:
              <br />
              <input
                type="text"
                name="area"
                placeholder="area of your headquarters"
                value={this.state.area}
                onChange={this.handleChange}
              />
            </label>
            <br />
            <label>
              Street:
              <br />
              <input
                type="text"
                name="street"
                placeholder="street of your headquarters"
                value={this.state.street}
                onChange={this.handleChange}
              />
            </label>
            <br />
            <br />

            <Button size="lg" type="submit" value="Submit">
              Submit
            </Button>
            <br />
          </Form>
        </div>
      </div>
    );
  }
}

export default EducationalForm;
