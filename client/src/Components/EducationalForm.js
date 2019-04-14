import React, { Component } from "react";

import { Form, Button, Jumbotron, Container } from "react-bootstrap";
import "./EducationalForm.css";
//const fetch = require("node-fetch");

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
    let address = {
      city: this.state.city,
      area: this.state.area,
      street: this.state.street
    };
    let mem = {
      email: this.state.email,
      name: this.state.name,
      password: this.state.password,
      address,
      type: "EducationalOrganisation"
    };

    fetch(`/api/user`, {
      //
      method: "POST",
      body: JSON.stringify(mem),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        if (json === "Error") {
          alert("you are have already registered to LirtenHub");
        } else {
          alert("success");
        }
      })
      .catch(err => {
        console.log(err);
        alert("something went wrong");
      });

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
                id="exampleForm2"
                class="form-control"
                type="text"
                name="name"
                required
                minLength="3"
                maxLength="500"
                placeholder="Organisation name"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </label>
            <br />
            <label>
              Email:
              <br />
              <input
                id="exampleForm2"
                class="form-control"
                type="text"
                name="email"
                required
                placeholder="Bussiness Email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </label>
            <br />
            <label>
              Password:
              <br />
              <input
                id="exampleForm2"
                class="form-control"
                type="password"
                name="password"
                required
                minLength="6"
                placeholder="account password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </label>
            <br />
            <label>
              city:
              <br />
              <input
                id="exampleForm2"
                class="form-control"
                type="text"
                name="city"
                required
                placeholder="headquarters city"
                value={this.state.birthDate}
                onChange={this.handleChange}
              />
            </label>
            <br />
            <label>
              Area:
              <br />
              <input
                id="exampleForm2"
                class="form-control"
                type="text"
                name="area"
                placeholder="headquarters area"
                value={this.state.area}
                onChange={this.handleChange}
              />
            </label>
            <br />
            <label>
              Street:
              <br />
              <input
                id="exampleForm2"
                class="form-control"
                type="text"
                name="street"
                placeholder="headquarters street"
                value={this.state.street}
                onChange={this.handleChange}
              />
            </label>
            <br />
            <input
              type="checkbox"
              class="custom-control-input"
              id="defaultUnchecked"
              required
            />
            <label class="custom-control-label" for="defaultUnchecked">
              I have read and agreed to the terms and conditions of LirtenHub
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
