import React, { Component } from "react";
import { Form, Button, Jumbotron, Container } from "react-bootstrap";
import "./Form.css";

class PartnerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      telephoneNumber: "",
      fieldOfWork: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    alert("submitted");
    event.preventDefault();
  }

  render() {
    return (
      <div id="themain">
        <div>
          <Jumbotron fluid>
            <Container>
              <h1>Partner Signup!</h1>
              <p>Welcome to LirtenHub!</p>
            </Container>
          </Jumbotron>
        </div>
        <form className="theform" onSubmit={this.handleSubmit}>
          <label>
            Name:
            <br />
            <input
              type="text"
              name="name"
              placeholder="your Name"
              required
              value={this.state.name}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <label>
            password:
            <br />
            <input
              type="password"
              name="password"
              placeholder="your password"
              required
              value={this.state.password}
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
              placeholder="your email"
              required
              value={this.state.email}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <label>
            telephone number:
            <br />
            <input
              type="text"
              name="telephoneNumber"
              placeholder="contact number"
              value={this.state.telephoneNumber}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <label>
            Field of work:
            <br />
            <input
              type="text"
              name="fieldOfWork"
              placeholder="your concentration"
              value={this.state.fieldOfWork}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <Button size="lg" type="submit" value="Submit">
            Submit
          </Button>
        </form>
      </div>
    );
  }
}

export default PartnerForm;
