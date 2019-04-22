import React, { Component } from "react";
import { Alert, Button, Jumbotron, Container } from "react-bootstrap";
import "./Form.css";

class ConsultancyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
      city: "",
      area: "",
      street: "",
      valid: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });

    console.log(this.state.target + "hi");
  }
  success() {
    return <Alert color="success" />;
  }

  handleSubmit(event) {
    let mem = {
      email: this.state.email,
      name: this.state.name,
      password: this.state.password,
      address: {
        city: this.state.city,
        area: this.state.area,
        street: this.state.street
      },
      phoneNumber: this.state.phoneNumber,
      type: "ConsultancyAgencies"
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
          return alert("you are already registered");
        } else {
          alert("success");
        }
      })
      .catch(err => {
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
              <h1>Consultancy Agency Sign Up</h1>
              <p>Welcome to LirtenHub!</p>
            </Container>
          </Jumbotron>
          ;
        </div>
        <form className="theform" onSubmit={this.handleSubmit}>
          <label>
            Name:
            <br />
            <input
              id="exampleForm2"
              class="form-control"
              type="text"
              name="name"
              minLength="3"
              maxLength="500"
              required
              value={this.state.name}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <label>
            email:
            <br />
            <input
              id="exampleForm2"
              class="form-control"
              type="text"
              name="email"
              required
              value={this.state.email}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <label>
            password:
            <br />
            <input
              id="exampleForm2"
              class="form-control"
              type="password"
              name="password"
              required
              value={this.state.password}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <label>
            phone number:
            <br />
            <input
              id="exampleForm2"
              class="form-control"
              type="tel"
              name="phoneNumber"
              required
              value={this.state.phoneNumber}
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
              value={this.state.city}
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
              required
              value={this.state.area}
              onChange={this.handleChange}
            />
          </label>{" "}
          <br />
          <label>
            Street:
            <br />
            <input
              id="exampleForm2"
              class="form-control"
              type="text"
              name="street"
              required
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
        </form>
      </div>
    );
  }
}

export default ConsultancyForm;
