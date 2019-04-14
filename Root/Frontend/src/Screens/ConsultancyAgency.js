import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import qs from "query-string";
import "../App.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import BigCalendar from "react-big-calendar";
import profile from "../Images/profile.png";
import profileBG from "../Images/profile-header.png";
import moment from "moment";
import { Link } from "react-router-dom";
// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = BigCalendar.momentLocalizer(moment); // or globalizeLocalizer
function isNumber(n) {
  return !isNaN(parseFloat(n)) && !isNaN(n - 0);
}
class ConsultancyAgency extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      email: props.email,
      verified: props.verified,
      name: null,
      basicInfo: null,
      tasks: null,
      partners: null,
      boardMembers: null,
      events: null,
      reports: null,
      activeId: "1",
      displayed: null,
      loaded: false
    };
  }

  componentDidMount() {
    let id = this.state.id;
    if (!this.state.id) {
      id = qs.parse(this.props.location.search, {
        ignoreQueryPrefix: true
      }).id;
    }
    fetch(`/api/user/email?id=${id}`)
      .then(res => res.json())
      .then(res => {
        this.setState({ email: res.email });
        return fetch(`/api/consultancy?id=${id}`);
      })
      .then(res => res.json())
      .then(res => {
        let currentState = this.state;
        currentState.name = res.name;
        currentState.basicInfo = (
          <table className="table">
            <tbody>
              <tr>
                <th scope="row" />
                <td>Name: </td>
                <td> {res.name}</td>
              </tr>
              <tr>
                <th scope="row" />
                <td>phone Number: </td>
                <td>+20{res.phoneNumber}</td>
              </tr>
              <tr>
                <th scope="row" />
                <td>Address: </td>
                <td>
                  {res.address.city} City, {res.address.area},{" "}
                  {res.address.street} st.
                </td>
              </tr>
            </tbody>
          </table>
        );

        currentState.partners = res.partners.map(partner => (
          <li className="list-group-item">
            <Link to={`/partner?id=${partner}`}> Partner</Link>
          </li>
        ));
        currentState.boardMembers = res.boardMembers.map(boardMember => (
          <div className="list-group-item card w-25">
            <div className="card-body">
              <h4 className="card-title">{boardMember.name}</h4>
              <h6 className="card-subtitle mb-2 text-muted">
                {boardMember.email}
              </h6>
              <div className="card-text">
                <h6>{boardMember.position}</h6>
              </div>
            </div>
          </div>
        ));

        currentState.events = res.events.map(event => (
          <div className="list-group-item card w-25">
            <div className="card-body">
              <h4 className="card-title">{event.date}</h4>
              <div className="card-text">
                <h6>{event.description}</h6>
              </div>
            </div>
          </div>
        ));

        currentState.reports = res.reports.map(report => (
          <div className="list-group-item card w-25">
            <div className="card-body">
              <h4 className="card-title">{report.link}</h4>
              <div className="card-text">
                <h6>{report.data}</h6>
              </div>
            </div>
          </div>
        ));
        this.setState(currentState);
        id = res._id; //TODO get tasks
        return fetch(`/api/task/consultancy?id=${id}`);
      })
      .then(res => res.json())
      .then(res => {
        let currentState = this.state;
        currentState.tasks = res.map(task => (
          <div className="list-group-item card w-50">
            <div className="card-body">
              <a
                className="card-title font-weight-bold"
                href={`/task?id=${task._id}`}
              >
                {task.name}
              </a>
              <h6 className="card-subtitle mb-2 text-muted">
                {task.isComplete ? "Done" : "In Progress"}
              </h6>
              <div className="card-text">
                <h6>
                  From:{" "}
                  <a href={`/partner?id=${task.owner._id}`}>
                    {task.owner.name}
                  </a>
                </h6>
                Date: <h6>{new Date(task.date).toDateString()} </h6>
              </div>
            </div>
          </div>
        ));
        currentState.loaded = true;
        this.setState(currentState);
      })
      .catch(err => {
        console.log(err);
      }); //TBD
  }
  handleClick(e) {
    if (isNumber(e.target.id)) {
      let currentState = this.state;
      currentState.activeId = e.target.id;
      this.setState(currentState);
    }
  }
  render() {
    console.log(this.state);
    return (
      <div>
        <div className="d-flex flex-row">
          <div className="card" style={{ width: "30%" }}>
            <img
              className="card-img-top"
              src={profile}
              style={{ width: "30%", alignSelf: "center" }}
              alt="profile"
            />
            <div className="text-center text-capitalize card-body">
              <h4 className="text-center card-title">{this.state.email} </h4>
              <div className="card-subtitle mb-2 text-muted">
                {this.state.name}
              </div>
            </div>
          </div>
          <div
            className="p-2 flex-grow-1 d-flex flex-row"
            style={{
              backgroundImage: `url(${profileBG})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover"
            }}
          />{" "}
        </div>

        <div className="d-flex flex-row">
          <ul
            className="list-group"
            onClick={this.handleClick.bind(this)}
            style={{ minWidth: "30%" }}
          >
            <li
              className={
                this.state.activeId === "1"
                  ? "list-group-item list-group-item-action list-group-item-dark"
                  : "list-group-item list-group-item-action"
              }
              id="1"
            >
              Basic Information
            </li>
            <li
              className={
                this.state.activeId === "2"
                  ? "list-group-item list-group-item-action list-group-item-dark"
                  : "list-group-item list-group-item-action"
              }
              id="2"
            >
              Partners
            </li>
            <li
              className={
                this.state.activeId === "3"
                  ? "list-group-item list-group-item-action list-group-item-dark"
                  : "list-group-item list-group-item-action"
              }
              id="3"
            >
              Tasks
            </li>
            <li
              className={
                this.state.activeId === "4"
                  ? "list-group-item list-group-item-action list-group-item-dark"
                  : "list-group-item list-group-item-action"
              }
              id="4"
            >
              Board Members
            </li>
            <li
              className={
                this.state.activeId === "5"
                  ? "list-group-item list-group-item-action list-group-item-dark"
                  : "list-group-item list-group-item-action"
              }
              id="5"
            >
              Events
            </li>
            <li
              className={
                this.state.activeId === "6"
                  ? "list-group-item list-group-item-action list-group-item-dark"
                  : "list-group-item list-group-item-action"
              }
              id="6"
            >
              Reports
            </li>
          </ul>
          {(function(state) {
            switch (state.activeId) {
              case "1":
                if (!state.loaded)
                  return (
                    <div
                      className="spinner-border"
                      style={{ marginLeft: "35%", marginTop: "15%" }}
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  );
                return (
                  <ul className="list-group" style={{ width: "100%" }}>
                    {state.basicInfo}
                  </ul>
                );
              case "2":
                if (!state.loaded)
                  return (
                    <div
                      className="spinner-border"
                      role="status"
                      style={{ marginLeft: "35%", marginTop: "15%" }}
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  );
                if (!state.partners || state.partners.length === 0)
                  return <h4 className="text-muted">No partners Yet..</h4>;
                return (
                  <ul className="list-group" style={{ width: "100%" }}>
                    {state.partners}
                  </ul>
                );
              case "3":
                if (!state.loaded)
                  return (
                    <div
                      className="spinner-border"
                      role="status"
                      style={{ marginLeft: "35%", marginTop: "15%" }}
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  );
                if (!state.tasks || state.tasks.length === 0)
                  return <h4 className="text-muted">No Tasks Yet..</h4>;
                return (
                  <ul
                    className="list-group d-flex flex-wrap flex-row"
                    style={{ width: "100%" }}
                  >
                    {state.tasks}
                  </ul>
                );
              case "4":
                if (!state.loaded)
                  return (
                    <div
                      className="spinner-border"
                      role="status"
                      style={{ marginLeft: "35%", marginTop: "15%" }}
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  );
                if (!state.boardMembers || state.boardMembers.length === 0)
                  return <h4 className="text-muted">No board Members Yet..</h4>;
                return (
                  <ul
                    className="list-group d-flex flex-wrap flex-row"
                    style={{ width: "100%" }}
                  >
                    {state.boardMembers}
                  </ul>
                );
              case "5":
                if (!state.loaded)
                  return (
                    <div
                      className="spinner-border"
                      role="status"
                      style={{ marginLeft: "35%", marginTop: "15%" }}
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  );
                if (!state.events || state.events.length === 0)
                  return <h4 className="text-muted">No events Yet..</h4>;
                return (
                  <ul
                    className="list-group d-flex flex-wrap flex-row"
                    style={{ width: "100%" }}
                  >
                    {state.events}
                  </ul>
                );
              case "6":
                if (!state.loaded)
                  return (
                    <div
                      className="spinner-border"
                      role="status"
                      style={{ marginLeft: "35%", marginTop: "15%" }}
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  );
                if (!state.reports)
                  return <h4 className="text-muted"> No reports yet</h4>;
                break;
              default:
                break;
            }
          })(this.state)}
        </div>
      </div>
    );
  }
}
export default ConsultancyAgency;
