import React, { Component } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router";
class AlertGreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = { show: true, done: false };
  }

  render() {
    const handleHide = () => this.setState({ show: false });
    if (!this.state.show) {
      return <Redirect to="/" />;
    }
    return (
      <>
        <Alert show={this.state.show} variant="success">
          <Alert.Heading>Submitted</Alert.Heading>
          <p>
            Please check your email for the next steps to become a part of us
          </p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button onClick={handleHide} variant="outline-success">
              Got it!
            </Button>
          </div>
        </Alert>
      </>
    );
  }
}

export default AlertGreen;
