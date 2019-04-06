import React, { Component } from "react";
import bg from "../Images/bloom-wfh-1630_1-2.jpg";
import awardrate from "../Images/awardrate.jpg";
import "./Certificate.css";
import "bootstrap/dist/css/bootstrap.css";

class Certificate extends Component {
  state = {
    certificate: {},
    button: { btnclass: "btn btn-info btn-lg", text: "Apply Now" },
    applied: false,
    loaded: false
  };
  componentDidMount() {
    this.checkapplied();
    fetch(`/api/certification?name=${this.props.name}`)
      .then(response => response.json())
      .then(data => {
        this.setState({ certificate: data[0] });
        this.setState({ loaded: true });
      });
  }
  handleClick() {
    if (
      this.state.certificate.membersapplied.indexOf(this.props.id) >= 0 ||
      this.state.applied
    ) {
      alert("You already applied to this Certificate");
    } else {
      fetch("/api/certification/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: this.props.name, id: this.props.id })
      })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));

      this.setState({
        applied: true,
        button: {
          btnclass: "btn btn-success btn-lg",
          text: "Applied"
        }
      });
    }
  }
  skillsmap() {
    let skills = this.state.certificate.skills;
    if (skills) {
      let skillsmap = skills.map(skill => (
        <li style={{ "font-size": "18px" }} key={skill}>
          {skill}
        </li>
      ));
      return skillsmap;
    }
  }
  checkapplied() {
    if (this.state.certificate.membersapplied && !this.state.applied) {
      if (this.state.certificate.membersapplied.indexOf(this.props.id) >= 0) {
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
  render() {
    this.checkapplied();
    return !this.state.loaded ? (
      <div class="d-flex justify-content-center">
        <div
          class="spinner-border text-success"
          style={{ width: "10rem", height: "10rem", "margin-top": "17%" }}
          role="status"
        >
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    ) : (
      <div>
        <div className="card">
          <img className="card-img" src={bg} alt="Card" />
          <div className="card-img-overlay">
            <div className="bgtext">
              <p className="card-text">{this.state.certificate.name}</p>
              <p className="card-text">
                Get this certificate to start earning more
              </p>
              <p className="card-text" style={{ "font-size": 20 }}>
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
            <ul>{this.skillsmap()}</ul>
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
