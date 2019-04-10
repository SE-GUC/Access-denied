import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import qs from "query-string";
import "../App.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import BigCalendar from "react-big-calendar";
import profile from "../Images/profile.jpg";
import profileBG from "../Images/profile-header.png";
import moment from "moment";

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

class Member extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: props.email,
      name: null,
      basicInfo: null,
      certification: null,
      calendar: null,
      memberSince: null,
      expiryDate: null,
      reviews: null,
      tasks: null,
      events: null,
      activeId: "1",
      displayed: null,
      loaded: false
    };
  }

  componentDidMount() {
    let id = "";
    let email = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true
    }).email;
    fetch(`/api/member?email=${email}`)
      .then(res => res.json())
      .then(res => {
        let currentState = this.state;
        currentState.email = email;
        currentState.name = res.name;
        currentState.basicInfo = (
          <table class="table">
            <tbody>
              <tr>
                <th scope="row" />
                <td>Name: </td>
                <td> {res.name}</td>
              </tr>
              <tr>
                <th scope="row" />
                <td>Hourly Rate: </td>
                <td>{res.payRate} $</td>
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

        currentState.certification = res.certification.map(cert => (
          <li className="list-group-item">
            {" "}
            <a href={`/certificate?name=${cert.name_of_certification}`}>
              {cert.name_of_certification}
            </a>
          </li>
        ));
        currentState.calendar = res.calendar.map(oldevent => {
          return {
            title: oldevent.Event,
            start: new Date(oldevent.Date),
            end: new Date(oldevent.Date)
          };
        });
        currentState.memberSince = new Date(res.memberSince).toDateString();
        currentState.expiryDate = new Date(res.expiryDate).toDateString();
        this.setState(currentState);
        id = res._id;
        return fetch(`/api/review?reviewee=${id}`);
      })
      .then(res => res.json())
      .then(res => {
        let currentState = this.state;
        currentState.reviews = res.map(review => (
          <div className="list-group-item card w-25">
            <div className="card-body">
              <h4 className="card-title">
                {(function() {
                  let rating = "";
                  let count = 5 - review.rating;
                  for (let i = 0; i < review.rating; i++) rating += "★";
                  for (let i = 0; i < count; i++) rating += "☆";
                  return rating;
                })()}
              </h4>
              <h6 className="card-subtitle mb-2 text-muted">
                "{review.review}"
              </h6>
              <div className="card-text">
                <h6>From: {review.reviewer.name}</h6>
                For:{" "}
                <a href={`/task?id=${review.task._id}`}>{review.task.name}</a>
              </div>
            </div>
          </div>
        ));
        this.setState(currentState);
        return fetch(`/api/task/member?id=${id}`);
      })
      .then(res => res.json())
      .then(res => {
        let currentState = this.state;
        res.sort((a, b) => {
          if (a.isComplete) {
            if (b.isComplete) return 0;
            else return 1;
          } else {
            if (b.isComplete) return -1;
            else return 0;
          }
        });
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
                <h6>From: {task.owner.name}</h6>
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
    let currentState = this.state;
    currentState.activeId = e.target.id;
    this.setState(currentState);
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
              backgroundSize: "auto"
            }}
          >
            <div className="d-flex flex-column text-capitalize text-light align-self-end">
              <div className="p-2">member since: {this.state.memberSince}</div>
              <div className="p-2">
                membership expires at: {this.state.expiryDate}
              </div>
            </div>
          </div>
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
              Certificates
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
              Reviews
            </li>
            <li
              className={
                this.state.activeId === "5"
                  ? "list-group-item list-group-item-action list-group-item-dark"
                  : "list-group-item list-group-item-action"
              }
              id="5"
            >
              Calendar
            </li>
            <li
              className={
                this.state.activeId === "6"
                  ? "list-group-item list-group-item-action list-group-item-dark"
                  : "list-group-item list-group-item-action"
              }
              id="6"
            >
              Events
            </li>
          </ul>
          {(function(state) {
            switch (state.activeId) {
              case "1":
                if (!state.loaded)
                  return (
                    <div
                      class="spinner-border"
                      style={{ marginLeft: "35%", marginTop: "15%" }}
                      role="status"
                    >
                      <span class="sr-only">Loading...</span>
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
                      class="spinner-border"
                      role="status"
                      style={{ marginLeft: "35%", marginTop: "15%" }}
                    >
                      <span class="sr-only">Loading...</span>
                    </div>
                  );
                if (!state.certification || state.certification.length === 0)
                  return <h4 className="text-muted">No Certificates Yet..</h4>;
                return (
                  <ul className="list-group" style={{ width: "100%" }}>
                    {state.certification}
                  </ul>
                );
              case "3":
                if (!state.loaded)
                  return (
                    <div
                      class="spinner-border"
                      role="status"
                      style={{ marginLeft: "35%", marginTop: "15%" }}
                    >
                      <span class="sr-only">Loading...</span>
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
                      class="spinner-border"
                      role="status"
                      style={{ marginLeft: "35%", marginTop: "15%" }}
                    >
                      <span class="sr-only">Loading...</span>
                    </div>
                  );
                if (!state.reviews || state.reviews.length === 0)
                  return <h4 className="text-muted">No Reviews Yet..</h4>;
                return (
                  <ul
                    className="list-group d-flex flex-wrap flex-row"
                    style={{ width: "100%" }}
                  >
                    {state.reviews}
                  </ul>
                );
              case "5":
                return (
                  <div className="w-100">
                    <BigCalendar
                      views={["week", "agenda"]}
                      defaultView={"week"}
                      step={60}
                      showMultiDayTimes
                      localizer={localizer}
                      defaultDate={
                        new Date(new Date().setDate(new Date().getDate()))
                      }
                      events={
                        state.calendar
                          ? state.calendar
                          : [
                              {
                                title: "NOW",
                                start: new Date(),
                                end: new Date()
                              }
                            ]
                      }
                    />
                  </div>
                );
              case "6":
                if (!state.loaded)
                  return (
                    <div
                      class="spinner-border"
                      role="status"
                      style={{ marginLeft: "35%", marginTop: "15%" }}
                    >
                      <span class="sr-only">Loading...</span>
                    </div>
                  );
                if (!state.events)
                  return <h4 className="text-muted"> No Events yet</h4>;
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
export default Member;
