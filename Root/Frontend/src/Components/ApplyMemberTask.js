import React, { Component } from "react";
import "../Screens/ApplyOnTask.css";



class ApplyMemberTask extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        qualification: ""
      };
    }
  
    handleChange(event) {
        this.setState({qualification: event.target.value});
      }
    handleSubmit(event){
        alert("submitted: " + this.state.qualification);
        //backend here
    }

render(){
    return(
      <div class="input-group flex-nowrap">
      <div class="input-group-prepend"/>
      <span class="input-group-text" id="addon-wrapping">Reasons to apply:</span>
      <br/>
      <input type="text" name="input1"  onChange={this.handleChange.bind(this)}/>
      <br/>
      <br/>
      <button onClick ={this.handleSubmit.bind(this)} disabled={this.state.qualification.length===0} className="buttonSubmit" variant="link" >Apply</button>
    </div>
    
    )}
} 
export default ApplyMemberTask;