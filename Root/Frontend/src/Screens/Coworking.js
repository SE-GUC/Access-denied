import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import qs from "query-string";
import "../App.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import BigCalendar from "react-big-calendar";
import profile from "../Images/profile.png";
import profileBG from "../Images/profile-header.png";
import moment from "moment";
import Button from "@material-ui/core/Button";

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

class Coworking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      email: props.email,
      verified: props.verified,

      name: null,
      basicInfo: null,
      schedule: null,
      activeId: "1",
      displayed: null,
      loaded: false,
      open: false,
      dialogText:null,
      newData:null,
      city:null,
      area:null,
      street:null,
      from:null,
      to:null
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
      axios.put(`/api/coworkingspace?id=`+this.state.id, data)
    }else if(this.state.dialogText==="workingHours"){
      const data = {
        "workingHours":{
          "from":this.state.from,
          "to": this.state.to,
          

        }
      }
      axios.put(`/api/coworkingspace?id=`+this.state.id, data)
    }else{
      const data = {
        [this.state.dialogText] :this.state.newData
      }
      axios.put(`/api/coworkingspace?id=`+this.state.id, data)
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
        return fetch(`/api/coworking?id=${id}`);
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
                <td>Phone No.: </td>
                <td>020{res.phoneNumber}</td>
                <td>
                  {" "}
                  <div>
                    
                    <Button
                      variant="outlined"
                      size="small"
                      color="primary"
                      hidden={!this.state.verified}
                      onClick={this.handleClickOpen("phoneNumber")}
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
              <tr>
                <th scope="row" />
                <td>workingHours: </td>
                <td>
                  From: {res.workingHours.from} to: {res.workingHours.to}
                </td>
                <td>
                  {" "}
                  <div>
                    
                    <Button
                      variant="outlined"
                      size="small"
                      color="primary"
                      hidden={!this.state.verified}
                      onClick={this.handleClickOpen("workingHours")}
                    >
                      edit
                    </Button>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row" />
                <td> Rooms: </td>
                <td>{res.noOfRooms} Rooms at your service</td>
                <td>
                  {" "}
                  <div>
                    
                    <Button
                      variant="outlined"
                      size="small"
                      color="primary"
                      hidden={!this.state.verified}
                      onClick={this.handleClickOpen("noOfRooms")}
                    >
                      edit
                    </Button>
                  </div>
                </td>
              </tr>
              {res.description ? (
                <tr>
                  <th scope="row" />
                  <td> details and info</td>
                  <td>{res.description}</td>
                  <td>
                    {" "}
                    <div>
                      
                      <Button
                        variant="outlined"
                        size="small"
                        color="primary"
                        hidden={!this.state.verified}
                        onClick={this.handleClickOpen("description")}
                      >
                        edit
                      </Button>
                    </div>
                  </td>
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
           {(this.state.dialogText === "address")?
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
         </Dialog>:(this.state.dialogText === "workingHours")?
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
             label="from"
            //  Value={this.state.area}
             onChange={this.handleChange("from")}
             type="email"
             fullWidth
           />
           <br/>
           <TextField
             autoFocus
             margin="dense"
             id="name"
             label="to"
             //Value={this.state.street}
             onChange={this.handleChange("to")}
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
