import React, { Component } from "react";

const AppContext = React.createContext();

class AppProvider extends Component {
  state = {
    token: null,
    setToken: value => {
      this.setState({ token: value });
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
