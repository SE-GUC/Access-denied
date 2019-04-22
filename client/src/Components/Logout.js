import React, { Component } from 'react'
import { AppConsumer } from '../Containers/AppProvider'
class Logout extends Component {
  state = {
    setToken: null
  }
  componentDidMount() {
    setTimeout(() => {
      this.state.setToken(null, null, null)
      this.props.history.push('/')
      localStorage.clear()
    }, 300)
  }
  render() {
    return (
      <>
        <AppConsumer>
          {context => {
            if (this.state.changed) return
            this.setState({
              setToken: context.setToken,
              changed: true
            })
          }}
        </AppConsumer>
      </>
    )
  }
}

export default Logout
