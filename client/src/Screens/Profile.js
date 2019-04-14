import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import qs from "query-string";
import "../App.css";
import { AppConsumer } from "../Containers/AppProvider";
import { Redirect } from "react-router";
import Member from "./Member";
import Partner from "./Partner";
import Coworking from "./Coworking";
import EduOrganization from "./EduOrganization";
import ConsultancyAgency from "./ConsultancyAgency";
class Profile extends Component {
  state = {
    token: null,
    email: null,
    id: null,
    type: null,
    changed: false,
    verified: false,
    redirect: false
  };

  checkRedirect() {
    if (this.state.redirect) return <Redirect to="/" />;
  }
  checkValid() {
    if (this.state.changed && !this.state.verified) {
      fetch(`/api/login/verify?id=${this.state.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          token: this.state.token
        })
      })
        .then(res => res.json())
        .then(data => {
          if (data.valid) {
            this.setState({ verified: true });
          } else return <Redirect to="/" />;
        })
        .catch(err => this.setState({ redirect: true }));
    } else if (this.state.changed && this.state.verified) {
      switch (this.state.type) {
        case "Members":
          return (
            <Member
              verified={true}
              id={this.state.id}
              email={this.state.email}
            />
          );
        case "ConsultancyAgencies":
          return (
            <ConsultancyAgency
              verified={true}
              id={this.state.id}
              email={this.state.email}
            />
          );

        case "Partners":
          return (
            <Partner
              verified={true}
              id={this.state.id}
              email={this.state.email}
            />
          );

        case "CoworkingSpaces":
          return (
            <Coworking
              verified={true}
              id={this.state.id}
              email={this.state.email}
            />
          );

        case "EducationalOrganisation":
          return (
            <EduOrganization
              verified={true}
              id={this.state.id}
              email={this.state.email}
            />
          );
        default:
          return <Redirect to="/" />;
      }
    }
  }
  render() {
    return (
      <div>
        {this.checkRedirect()}
        <AppConsumer>
          {context => {
            if (this.state.changed) return;
            this.setState({
              token: context.token,
              id: context.id,
              type: context.type,
              changed: true
            });
          }}
        </AppConsumer>
        {this.checkValid()}{" "}
      </div>
    );
  }
}

export default Profile;
