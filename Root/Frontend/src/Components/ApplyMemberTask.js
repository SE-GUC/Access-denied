import React, { Component } from "react";
import "../Screens/ApplyOnTask.css";
import { Redirect } from 'react-router-dom'
import {Card,Button} from 'react-bootstrap'
import query from "query-string";


class ApplyMemberTask extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        qualification: "",
        taskID:props.taskID,
        tokenchild:props.tokenchild,
        redirect: false
      };
    }
    handleChange(event) {
      console.log(this.state.taskID)
        this.setState({qualification: event.target.value});
      }
    handleSubmit(event){
        let info={
          applications:{
          applier:this.state.tokenchild,
          details:this.state.qualification,
          applierModel:'Members'
        }}
        fetch(`/api/task/memberApplies?id=`+this.state.taskID,{
          method:"PUT",
          body:JSON.stringify(info),
          headers:{
            "Content-Type":"application/json"
          }
        })
        .then(res => res.json())
        .then(json => console.log(json))
        event.preventDefault();
        this.setState({redirect:true});
        
    }
    renderRedirect = () => {
      if (this.state.redirect) {
        return <Redirect to="/Home" />
      }
    }
    enableButton(){
      let f=this.state.qualification.trim();
      if(f.length===0){
       return true;
      }
      else{
      return false;
      }}

render(){
    return(
       <Card> 
        <Card.Body>
        <p for="Plan" className="c1" align="center">Apply for task</p>
          <form>
          <div class="form-group">
            <label for="Plan" className="c2">Reasons for Applying:</label>
            <textarea class="form-control" rows="5" id="plan" onChange={this.handleChange.bind(this)}> </textarea>
          </div>
        </form>
        {this.renderRedirect()}
          <Button size="lg" onClick ={this.handleSubmit.bind(this)} disabled={this.enableButton()} className="buttonSubmit" variant="link" >Apply </Button>
        </Card.Body>
      </Card> 
    )}
} 
export default ApplyMemberTask;