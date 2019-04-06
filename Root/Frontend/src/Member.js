import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import BigCalendar from "react-big-calendar";
import profile from "./images/profile.jpg";
import profileBG from "./images/profile-header.png";
import moment from "moment";

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);
console.log(allViews);

class Member extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: props.email,
      name: null,
      certification: null,
      calendar: null,
      memberSince: null,
      expiryDate: null
    };
  }

  componentDidMount() {
    fetch(`/api/member?email=${this.state.email}`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          email: this.state.email,
          name: res.name,
          certification: res.certification.map(cert => (
            <li className="list-group-item">{cert.name_of_certification}</li>
          )),
          calendar: res.calendar.map(oldevent => {
            return {
              title: oldevent.Event,
              start: new Date(oldevent.Date),
              end: new Date(oldevent.Date)
            };
          }),
          memberSince: new Date(res.memberSince).toDateString(),
          expiryDate: new Date(res.expiryDate).toDateString()
        });
      })
      .catch(err => {
        console.log(err);
      }); //TBD
  }

  render() {
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
          <ul className="list-group" style={{ width: "30%" }}>
            {" "}
            <li className="list-group-item disabled">Certificates</li>
            {this.state.certification}
          </ul>
          <div className="flex-grow-1" style={{ height: "10%", width: "50%" }}>
            <div>
              <BigCalendar
                views={["week", "agenda"]}
                defaultView={"week"}
                step={60}
                showMultiDayTimes
                localizer={localizer}
                defaultDate={
                  new Date(new Date().setDate(new Date().getDate() - 1))
                }
                events={
                  this.state.calendar
                    ? this.state.calendar
                    : [{ title: "NOW", start: new Date(), end: new Date() }]
                }
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Member;
