import React, { Component } from "react";

const AppContext = React.createContext();

class AppProvider extends Component {
  state = {
    token: null,
    id: null,
    type: null,
    setToken: (value, id, type) => {
      this.setState({ token: value, id: id, type: type });
    }
  };
  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children};
      </AppContext.Provider>
    );
  }
}
export const AppConsumer = AppContext.Consumer;
export default AppProvider;
