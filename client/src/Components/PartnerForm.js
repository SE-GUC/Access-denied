import React, { Component } from 'react'
import { Form, Button, Jumbotron, Container } from 'react-bootstrap'
import './Form.css'

class PartnerForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: '',
      telephoneNumber: '',
      fieldOfWork: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit(event) {
    let part = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      field_of_work: this.state.fieldOfWork,
      Telephone_number: this.state.telephoneNumber,
      type: 'Partners'
    }

    fetch(`/api/user`, {
      //
      method: 'POST',
      body: JSON.stringify(part),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(json => {
        console.log(json)
        if (json === 'Error') {
          alert('you are already registered')
        } else {
          alert('success!')
        }
      })
      .catch(err => {
        console.log(err)
        alert('something went wrong')
      })

    event.preventDefault()
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
              id="exampleForm2"
              class="form-control"
              type="text"
              name="name"
              minLength="3"
              maxLength="500"
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
              id="exampleForm2"
              class="form-control"
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
              id="exampleForm2"
              class="form-control"
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
              id="exampleForm2"
              class="form-control"
              type="text"
              name="telephoneNumber"
              minLength="3"
              maxLength="500"
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
              id="exampleForm2"
              class="form-control"
              type="text"
              name="fieldOfWork"
              minLength="3"
              maxLength="500"
              placeholder="your concentration"
              value={this.state.fieldOfWork}
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
          <Button size="lg" type="submit" value="Submit">
            Submit
          </Button>
        </form>
      </div>
    )
  }
}

export default PartnerForm
