import React, { Component } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
class AlertGreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = { show: true };
  }

  render() {
    const handleHide = () => this.setState({ show: false });
    const handleShow = () => this.setState({ show: true });
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

        {!this.state.show && <Button onClick={handleShow}>Show Alert</Button>}
      </>
    );
  }
}

export default AlertGreen;
