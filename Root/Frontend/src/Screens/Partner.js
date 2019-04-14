import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../App.css";
import profile from "../Images/profile.png";
import profileBG from "../Images/profile-header.png";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import qs from "query-string";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import TaskForm from "./TaskForm";
const axios = require("axios");
function isNumber(n) {
  return !isNaN(parseFloat(n)) && !isNaN(n - 0);
}
class Partner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      email: props.email,
      verified: props.verified,
      name: null,
      basicInfo: null,
      members: null,
      reviews: null,
      tasks: null,
      events: null,
      activeId: "1",
      loaded: false,
      open: false,
      dialogText:null,
      newData:null,
      city:null,
      area:null,
      street:null,
      renderTask:false,
    };
  }
  
  
  createTask = () => {
    
    this.setState({
      createTask: true,
      activeId: "6"
    })
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
      axios.put(`/api/partner?id=`+this.state.id, data)
    }else{
      const data = {
        [this.state.dialogText] :this.state.newData
      }
      axios.put(`/api/partner?id=`+this.state.id, data)
    }
    this.setState({ open: false })
  }

  
  handleChange = name => event => {
    this.setState({
    [name]: event.target.value,
  
    });   
    
  };
  handleClick(e) {
    if (isNumber(e.target.id)) {
      let currentState = this.state;
     
      currentState.activeId = e.target.id;
      this.setState(currentState);

    }
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
        return fetch(`/api/partner?id=${id}`);
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
                <td>Telephone : </td>
                <td>+20{res.Telephone_number}</td>
                <td>
                  {" "}
                  <div>
                    
                    <Button
                      variant="outlined"
                      size="small"
                      color="primary"
                      hidden={!this.state.verified}
                      onClick={this.handleClickOpen("Telephone_number")}
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
                <td>Number of Employees</td>
                <td>{res.number_of_employees}</td>
                <td>
                  {" "}
                  <div>
                    
                    <Button
                      variant="outlined"
                      size="small"
                      color="primary"
                      hidden={!this.state.verified}
                      onClick={this.handleClickOpen("number_of_employees")}
                    >
                      edit
                    </Button>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row" />
                <td>Field of Work</td>
                <td>{res.field_of_work}</td>
                <td>
                  {" "}
                  <div>
                    
                    <Button
                      variant="outlined"
                      size="small"
                      color="primary"
                      hidden={!this.state.verified}
                      onClick={this.handleClickOpen("field_of_work")}
                    >
                      edit
                    </Button>
                  </div>
                </td>
              </tr>
              {!res.other_partners ? null : (
                <tr>
                  <th scope="row" />
                  <td>Partners </td>
                  <td>{res.other_partners}</td>
                  <td>
                    {" "}
                    <div>
                      
                      <Button
                        variant="outlined"
                        size="small"
                        color="primary"
                        hidden={!this.state.verified}
                        onClick={this.handleClickOpen("other_partners")}
                      >
                        edit
                      </Button>
                    </div>
                  </td>
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
              <h4 className="card-title">
                {new Date(event.date).toDateString()}
              </h4>
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
              style={{ width: "40%", alignSelf: "center" }}
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
          {(function(state,thisCopy) {
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
                  
                if (!state.tasks || state.tasks.length === 0){
                  return (
                    <div>
                   <Fab color="primary" aria-label="Add" onClick={thisCopy.createTask}>
                      <AddIcon/>
                      </Fab>
                      
                      <h4 className="text-muted">No Tasks Yet..</h4>
                    </div>
                  )

                  
                    
                  

                }
                     
                return (
                  <div>
                  <Fab color="primary" aria-label="Add" onClick={thisCopy.createTask}>
                      <AddIcon/>
                      </Fab>
                  
                  
                  <ul
                    className="list-group d-flex flex-wrap flex-row"
                    style={{ width: "100%" }}
                  >
                  
                 
                    {state.tasks}
                  </ul>
                  
                  </div>

                
                  
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
              case "6": 
              if (state.createTask)
              return (
                <TaskForm/>
                
              ); 
                  
              break
              default:
                break;
            }
          })(this.state,this)}
        </div>
      </div>
    );
  }
}
export default Partner;
