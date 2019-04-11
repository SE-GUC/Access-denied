import React, { Component } from "react";

class PartnerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
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
          telephone number:
          <input
            type="text"
            name="telephoneNumber"
            value={this.state.telephoneNumber}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          Field of work:
          <input
            type="text"
            name="fieldOfWork"
            value={this.state.fieldOfWork}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default PartnerForm;
