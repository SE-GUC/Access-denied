import React, { Component } from 'react'

const AppContext = React.createContext()

class AppProvider extends Component {
  state = {
    token: null,
    id: null,
    type: null,
    setToken: (value, id, type) => {
      localStorage.setItem('token', JSON.stringify(value))
      localStorage.setItem('id', JSON.stringify(id))
      localStorage.setItem('type', JSON.stringify(type))
      this.setState({ token: value, id: id, type: type })
    }
  }
  componentDidMount() {
    let token = JSON.parse(localStorage.getItem('token'))
    let id = JSON.parse(localStorage.getItem('id'))
    let type = JSON.parse(localStorage.getItem('type'))
    if (token && id && type) {
      this.setState({ token: token, id: id, type: type })
    }
  }
  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    )
  }
}
export const AppConsumer = AppContext.Consumer
export default AppProvider
