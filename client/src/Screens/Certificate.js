import React, { Component } from "react";
import bg from "../Images/bloom-wfh-1630_1-2.jpg";
import awardrate from "../Images/awardrate.jpg";
import "./Certificate.css";
import "bootstrap/dist/css/bootstrap.css";
import { AppConsumer } from "../Containers/AppProvider";
import {
  /*eslint-disable */
  Hero,
  CallToAction,
  ScrollDownIndicator,
  Checklist,
  Section
  /*eslint-enable */
} from "react-landing-page";
import Snackbar from "../Components/snackbar";
import qs from "query-string";
import { Redirect } from "react-router";

const featherCheckmark = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="green"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

class Certificate extends Component {
  state = {
    certificate: {},
    button: { btnclass: "btn btn-info btn-lg", text: "Apply Now" },
    applied: false,
    loaded: false,
    snackbar: {
      open: false,
      text: "",
      type: ""
    },
    token: null,
    id: null,
    type: null,
    changed: false
  };
  componentDidMount() {
    this.checkapplied();
    let id = qs.parse(this.props.location.search, { ignoreQueryPrefix: true })
      .id;
    fetch(`/api/certification?id=${id}`)
      .then(response => response.json())
      .then(data => {
        this.setState({ certificate: data });
        this.setState({ loaded: true });
      })
      .catch(err => {
        console.log(err);
      });
  }
  handleClick() {
    if (
      this.state.certificate.membersapplied.indexOf(this.state.id) >= 0 ||
      this.state.applied
    ) {
      this.setState({
        snackbar: {
          open: true,
          text: `You already applied to ${this.state.certificate.name}`,
          type: "warning"
        }
      });
    } else {
      fetch(`/api/certification/apply?id=${this.state.certificate.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          token: this.state.token
        })
      })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));
      this.setState({
        applied: true,
        snackbar: {
          open: true,
          text: `Succesfully Applied to ${this.state.certificate.name}`,
          type: "success"
        },
        button: {
          btnclass: "btn btn-success btn-lg",
          text: "Applied"
        }
      });
    }
  }
  skillscap() {
    let skills = [];
    this.state.certificate.skills.map(skill =>
      skills.push(skill.charAt(0).toUpperCase() + skill.slice(1))
    );
    return skills;
  }

  checkapplied() {
    if (this.state.certificate) {
      if (this.state.certificate.membersapplied && !this.state.applied) {
        if (this.state.certificate.membersapplied.indexOf(this.state.id) >= 0) {
          this.setState({
            applied: true,
            button: {
              btnclass: "btn btn-success btn-lg",
              text: "Applied"
            }
          });
        }
      }
    }
  }
  render() {
    this.checkapplied();
    return !this.state.loaded ? (
      <div className="d-flex justify-content-center">
        <div
          className="spinner-border text-success"
          style={{ width: "10rem", height: "10rem", "margin-top": "17%" }}
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    ) : !this.state.certificate ? (
      <Redirect to="/" />
    ) : (
      <div>
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
        <Snackbar
          open={this.state.snackbar.open}
          type={this.state.snackbar.type}
          message={this.state.snackbar.text}
          onClick={setTimeout(
            () => this.setState({ snackbar: { open: false } }),
            5000
          )}
        />
        <div className="card">
          <img className="card-img" src={bg} alt="Card" />
          <div className="card-img-overlay">
            <div className="bgtext">
              <p className="card-text">
                {this.state.certificate.name.charAt(0).toUpperCase() +
                  this.state.certificate.name.slice(1)}
              </p>
              <p className="card-text">
                Get this certificate to start earning more
              </p>
              <p className="card-text" style={{ fontSize: 20 }}>
                Prove your skills and increase your chances of winning jobs
              </p>
              <button
                type="button"
                className={this.state.button.btnclass}
                onClick={() => this.handleClick()}
              >
                {this.state.button.text}
              </button>
            </div>
          </div>
        </div>
        <div style={{ width: "30%", "margin-left": "33%" }}>
          <p className="textafter bold">Show Employers you got these skills:</p>
          <ul className="list-unstyled" style={{ "margin-left": "11%" }}>
            <Checklist
              children={this.skillscap()}
              checkmark={featherCheckmark}
            />
          </ul>
        </div>
        <hr style={{ "margin-top": "5%" }} />
        <span>
          <div style={{ width: "30%", "margin-left": "15%", float: "left" }}>
            <p className="textafter bold">Increase your win-rate by 25%</p>
            <p className="textaftersmall">
              Freelancers who get certified are 25% more likely to win a project
              compared to freelancers who don't.
            </p>
            <p className="textaftersmall">
              Certificates in your profile show employers that you're serious
              about delivering quality work.
            </p>
            <p className="textaftersmall">Show them that you're capable.</p>
          </div>
          <div style={{ "margin-right": "15%", float: "right" }}>
            <img
              src={awardrate}
              className="img-fluid"
              style={{ "margin-top": "17%" }}
              alt="award rate"
            />
          </div>
        </span>
      </div>
    );
  }
}

export default Certificate;
