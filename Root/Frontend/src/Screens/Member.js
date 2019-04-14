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
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
const axios = require("axios");
// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = BigCalendar.momentLocalizer(moment); // or globalizeLocalizer
function isNumber(n) {
  return !isNaN(parseFloat(n)) && !isNaN(n - 0);
}
class Member extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      email: props.email,
      verified: props.verified,
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
      loaded: false,
      redirect: false,
      open: false,
      dialogText:null,
      newData:null,
      city:null,
      area:null,
      street:null
      
    };
  }
  handleClickOpen = name => event => {
    
    this.setState({ 
      open: true,
      dialogText: name
    });
   
    
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleApply =()=>{
    
    if(this.state.dialogText==="address"){
      
      const data = {
        "address":{
          "city":this.state.city,
          "area": this.state.area,
          "street": this.state.street

        }
      }
      axios.put(`/api/member?id=`+this.state.id, data)
    }else{
      const data = {
        [this.state.dialogText] :this.state.newData
      }
      axios.put(`/api/member?id=`+this.state.id, data)
    }
    this.setState({ open: false })
  }

  
  handleChange = name => event => {
    this.setState({
    [name]: event.target.value,
  
    });   
    
  };
  


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
        return fetch(`/api/member?id=${id}`);
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
                <td>
                  {" "}
                  <div>
                   
                    <Button
                      variant="outlined"
                      size="small"
                      color="primary"
                      hidden={!this.state.verified}
                      onClick={this.handleClickOpen("name")}
                    >
                      edit
                    </Button>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row" />
                <td>Hourly Rate: </td>
                <td>{res.payRate} $</td>
                <td>
                  {" "}
                  <div>
                    
                    <Button
                      variant="outlined"
                      size="small"
                      color="primary"
                      hidden={!this.state.verified}
                      onClick={this.handleClickOpen("payRate")}
                    >
                      edit
                    </Button>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row" />
                <td>Address: </td>
                <td>
                  {res.address.city} City, {res.address.area},{" "}
                  {res.address.street} st.
                </td>
                <td>
                  {" "}
                  <div>
                    
                    <Button
                      variant="outlined"
                      size="small"
                      color="primary"
                      hidden={!this.state.verified}
                      onClick={this.handleClickOpen("address")}
                    >
                      edit
                    </Button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        );

        currentState.certification = res.certification.map(cert => (
          <li className="list-group-item">
            {" "}
            <Link to={`/certificate?id=${cert.ref_of_certification}`}>
              {cert.name_of_certification}
            </Link>
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
        console.log(res);
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
                <h6>
                  From:{" "}
                  <a href={`/partner?id=${review.reviewer._id}`}>
                    {review.reviewer.name}
                  </a>
                </h6>
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
          <div>
           {(this.state.dialogText !== "address")?
           <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title" />
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                
                onChange={this.handleChange("newData")}
                
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.handleApply} color="primary">
                Apply
              </Button>
            </DialogActions>
          </Dialog>:
           <Dialog
           open={this.state.open}
           onClose={this.handleClose}
           aria-labelledby="form-dialog-title"
         >
           <DialogTitle id="form-dialog-title" />
           <DialogContent>
             <TextField
               autoFocus
               margin="dense"
               id="name"
               label="city"
               //Value={this.state.city}
               onChange={this.handleChange("city")}
               type="email"
               fullWidth
             />
             <br/>
             <TextField
               autoFocus
               margin="dense"
               id="name"
               label="area"
              //  Value={this.state.area}
               onChange={this.handleChange("area")}
               type="email"
               fullWidth
             />
             <br/>
             <TextField
               autoFocus
               margin="dense"
               id="name"
               label="street"
               //Value={this.state.street}
               onChange={this.handleChange("street")}
               type="email"
               fullWidth
             />
           </DialogContent>
           <DialogActions>
             <Button onClick={this.handleClose} color="primary">
               Cancel
             </Button>
             <Button onClick={this.handleApply} color="primary">
               Apply
             </Button>
           </DialogActions>
         </Dialog>
          
        }

           
          
        </div>
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
                      className="spinner-border"
                      role="status"
                      style={{ marginLeft: "35%", marginTop: "15%" }}
                    >
                      <span className="sr-only">Loading...</span>
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
