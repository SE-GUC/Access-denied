import React, { Component } from "react";

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

  handleSubmit(event) {
    alert("submitted: " + this.state.name);
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
            value={this.state.name}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          email:
          <input
            type="text"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          city:
          <input
            type="text"
            name="city"
            value={this.state.city}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          Area:
          <input
            type="text"
            name="area"
            value={this.state.area}
            onChange={this.handleChange}
          />
        </label>{" "}
        <br />
        <label>
          Street:
          <input
            type="text"
            name="street"
            value={this.state.street}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default ConsultancyForm;
