import React, { Component } from "react";
import AlertGreen from "./AlertGreen";
import { Form, Button, Jumbotron, Container } from "react-bootstrap";
import "./Form.css";
//const fetch = require("node-fetch");

class MemberForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      birthDate: "",
      submitted: false,
      error: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    let mem = {
      email: this.state.email,
      name: this.state.name,
      password: this.state.password,
      birthDate: this.state.birthDate,
      type: "Members"
    };
    fetch(`/api/user`, {
      //
      method: "POST",
      body: JSON.stringify(mem),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "same-origin"
    })
      .then(res => res.json())
      .then(json => {
        console.log("json");
        if (json === "Error") {
          return alert("you are already registered");
        }
        this.setState({ submitted: true });
        alert("success");
      })
      .catch(err => {
        this.setState({ error: err.stringify });
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
              <h1>Member Sign Up</h1>
              <p>Welcome to LirtenHub!</p>
            </Container>
          </Jumbotron>
          ;
        </div>
        <Form className="theform" onSubmit={this.handleSubmit}>
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
            crossorigin="anonymous"
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
              id="exampleForm2"
              class="form-control"
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
              id="exampleForm2"
              class="form-control"
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
            Birth Date:
            <br />
            <input
              id="exampleForm2"
              class="form-control"
              type="date"
              name="birthDate"
              required
              placeholder="your birthdate"
              value={this.state.birthDate}
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
        </Form>
      </div>
    );
  }
}

export default MemberForm;
