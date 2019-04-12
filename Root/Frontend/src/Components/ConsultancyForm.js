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
      city: "",
      area: "",
      street: ""
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
    this.success();
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
              type="text"
              name="name"
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
              type="text"
              name="email"
              required
              value={this.state.email}
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
              value={this.state.city}
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
              type="text"
              name="street"
              required
              value={this.state.street}
              onChange={this.handleChange}
            />
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
