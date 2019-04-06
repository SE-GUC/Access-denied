import React, { Component } from "react";
import axios from "axios";
let baseURL = process.env.BASEURL || "http://localhost:5000";

class EducationalForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: {
        value: "",
        placeholder: "Name of educational organisation"
      },
      email: {
        value: "",
        placeholder: "Name of educational organisation"
      },
      city: {
        value: "",
        placeholder: "City where your headquarters are"
      },
      area: {
        value: "",
        placeholder: "Area where your headquarters are"
      },
      street: {
        value: "",
        placeholder: "Street where your headquarters are"
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });

    console.log(this.state.target + "hi");
  }

  handleSubmit(event) {
    /*alert(
      "submitted!: " +
        this.state.city.value +
        " " +
        this.state.name.value +
        " " +
        this.state.name
    );*/

    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={this.state.name.value}
            placeholder={this.state.name.placeholder}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          email:
          <input
            type="text"
            name="email"
            value={this.state.email.value}
            placeholder={this.state.email.placeholder}
            onChange={this.handleChange}
          />
          {console.log(this.state.email.value)}
        </label>
        <br />
        <label>
          city:
          <input
            type="text"
            name="city"
            value={this.state.value}
            placeholder={this.state.city.placeholder}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          Area:
          <input
            type="text"
            name="area"
            value={this.state.value}
            placeholder={this.state.area.placeholder}
            onChange={this.handleChange}
          />
        </label>{" "}
        <br />
        <label>
          Street:
          <input
            type="text"
            name="street"
            value={this.state.value}
            placeholder={this.state.street.placeholder}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default EducationalForm;
