import React, { Component } from "react";
import "../Screens/ApplyOnTask.css";
import { Redirect } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

class ApplyMemberTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      qualification: "",
      redirect: false
    };
  }

  handleChange(event) {
    this.setState({ qualification: event.target.value });
  }
  handleSubmit(event) {
    alert("submitted: " + this.state.qualification);
    this.setState({ redirect: true });
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/Home" />;
    }
  };

  render() {
    return (
      <Card>
        <Card.Body>
          <p for="Plan" className="c1" align="center">
            Apply for task
          </p>
          <form>
            <div class="form-group">
              <label for="Plan" className="c2">
                Reasons for Applying:
              </label>
              <textarea
                class="form-control"
                rows="5"
                id="plan"
                onChange={this.handleChange.bind(this)}
              >
                {" "}
              </textarea>
            </div>
          </form>
          {this.renderRedirect()}
          <Button
            size="lg"
            onClick={this.handleSubmit.bind(this)}
            disabled={this.state.qualification.length === 0}
            className="buttonSubmit"
            variant="link"
          >
            Apply{" "}
          </Button>
        </Card.Body>
      </Card>
    );
  }
}
export default ApplyMemberTask;
