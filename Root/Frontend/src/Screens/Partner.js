import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import qs from "query-string";
import "../App.css";
import profile from "../Images/profile.jpg";
import profileBG from "../Images/profile-header.png";

class Partner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: props.email,
      name: null,
      basicInfo: null,
      members: null,
      reviews: null,
      tasks: null,
      events: null,
      activeId: "1",
      loaded: false
    };
  }

  componentDidMount() {
    let id = "";
    let email = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true
    }).email;
    fetch(`/api/partner?email=${email}`)
      .then(res => res.json())
      .then(res => {
        let currentState = this.state;
        currentState.email = email;
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
                <td>Telephone : </td>
                <td>+20{res.Telephone_number}</td>
              </tr>
              <tr>
                <th scope="row" />
                <td>Address: </td>
                <td>
                  {res.address.city} City, {res.address.area},{" "}
                  {res.address.street} st.
                </td>
              </tr>
              <tr>
                <th scope="row" />
                <td>Number of Employees</td>
                <td>{res.number_of_employees}</td>
              </tr>
              <tr>
                <th scope="row" />
                <td>Field of Work</td>
                <td>{res.field_of_work}</td>
              </tr>
              {!res.other_partners ? null : (
                <tr>
                  <th scope="row" />
                  <td>Partners </td>
                  <td>{res.other_partners}</td>
                </tr>
              )}
            </tbody>
          </table>
        );

        currentState.members = res.members.map(member => {
          if (member.pastwork) {
            member.pastwork = `worked before at ${member.pastwork}`;
          }
          return (
            <div className="card list-group-item">
              <div className="card-body">
                <h4 className="card-title">{member.name}</h4>
                <h6 className="card-subtitle mb-2 text-muted">
                  {member.email}
                </h6>
                <p className="card-text">{member.age}.</p>
              </div>
            </div>
          );
        });
        currentState.events = res.events.map(event => (
          <div className="card list-group-item">
            <div className="card-body">
              <h4 className="card-title">{event.date}</h4>
              <p className="card-text">{event.description}</p>
            </div>
          </div>
        ));
        this.setState(currentState);
        id = res._id;
       return fetch(`/api/task/partner?id=${id}`);
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
                <h6>
                  {task.assignee
                    ? `by: ${task.assignee.name}`
                    : "Not yet assigned to a member"}
                </h6>
                Date: <h6>{new Date(task.date).toDateString()} </h6>
              </div>
            </div>
          </div>
        ));
        currentState.loaded = true;
        this.setState(currentState);
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
      })
      .catch(err => {
        console.error(err);
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
          />
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
              Events
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
              Members
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
                if (!state.events || state.events.length === 0)
                  return <h4 className="text-muted">No Events Yet..</h4>;
                return (
                  <ul className="list-group" style={{ width: "100%" }}>
                    {state.events}
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
                if (!state.members || state.members.length === 0)
                  return <h4 className="text-muted">No Members Yet..</h4>;
                return (
                  <ul className="list-group" style={{ width: "100%" }}>
                    {state.members}
                  </ul>
                );
              default:
                break;
            }
          })(this.state)}
        </div>
      </div>
    );
  }
}
export default Partner;
