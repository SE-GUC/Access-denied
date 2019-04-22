import React, { Component } from 'react'
import './Form.css'
import { Form, Button, Jumbotron, Container } from 'react-bootstrap'
import AlertGreen from './AlertGreen'

class CoworkingForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: '',
      phoneNumber: '',
      city: '',
      area: '',
      street: '',
      valid: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit(event) {
    let mem = {
      email: this.state.email,
      name: this.state.name,
      password: this.state.password,
      address: {
        city: this.state.city,
        street: this.state.street,
        area: this.state.area
      },
      phoneNumber: this.state.phoneNumber,
      type: 'CoworkingSpaces'
    }
    fetch(`/api/user`, {
      //
      method: 'POST',
      body: JSON.stringify(mem),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(json => {
        console.log(json)
        if (json === 'Error') {
          alert('You have already registered to LirtenHub')
        } else {
          this.setState({ valid: true })
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
              <h1>Coworking Space Sign Up</h1>
              <p>Welcome to LirtenHub!</p>
            </Container>
          </Jumbotron>
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
              placeholder="Name of your coworking space"
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
            city:
            <br />
            <input
              id="exampleForm2"
              class="form-control"
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
              id="exampleForm2"
              class="form-control"
              type="text"
              name="area"
              required
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
              id="exampleForm2"
              class="form-control"
              type="text"
              name="street"
              placeholder="street of your headquarters"
              required
              value={this.state.street}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <label>
            Phone Number:
            <br />
            <input
              id="exampleForm2"
              class="form-control"
              type="text"
              name="phoneNumber"
              required
              placeholder="contact phone number"
              value={this.state.phoneNumber}
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
        {this.state.valid === true ? <AlertGreen /> : <></>}
      </div>
    )
  }
}

export default CoworkingForm
