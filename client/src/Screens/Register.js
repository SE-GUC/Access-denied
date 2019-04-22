import React, { Component } from 'react'
import './Register.css'
import ListDivider from '../Components/ListDividers'
import { AppConsumer } from '../Containers/AppProvider'

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      member: false,
      consultancy: false,
      edu: false,
      partner: false,
      coworking: false,
      loaded: false
    }
  }

  render() {
    return (
      <div id="cont">
        <AppConsumer>
          {context => {
            if (context.token) this.props.history.push('/profile')
          }}
        </AppConsumer>
        <div id="sign">
          <br />
          <label id="labelR">Who are you?</label>
          <h3>I am a...</h3>
        </div>

        <div id="selectors">
          <ListDivider />
        </div>
      </div>
    )
  }
}

export default Register
