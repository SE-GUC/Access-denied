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

class Coworking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: props.email,
      name: null,
      basicInfo: null,
      schedule: null,
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
    fetch(`/api/coworking?email=${email}`)
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
                <td>Phone No.: </td>
                <td>020{res.phoneNumber}</td>
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
                <td>workingHours: </td>
                <td>
                  From: {res.workingHours.from} to: {res.workingHours.to}
                </td>
              </tr>
              <tr>
                <th scope="row" />
                <td> Rooms: </td>
                <td>{res.noOfRooms} Rooms at your service</td>
              </tr>
              {res.description ? (
                <tr>
                  <th scope="row" />
                  <td> details and info</td>
                  <td>{res.description}</td>
                </tr>
              ) : null}
            </tbody>
          </table>
        );

        currentState.schedule = res.schedule;
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
              Schedule
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
                      style={{ marginLeft: "35%", marginTop: "15%" }}
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  );
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
                      events={[
                        {
                          title: "NOW",
                          start: new Date(),
                          end: new Date()
                        }
                      ]}
                    />
                  </div>
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
export default Coworking;
