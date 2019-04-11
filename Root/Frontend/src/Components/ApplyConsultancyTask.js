import React, { Component } from "react";
import "../Screens/ApplyOnTask.css";
class ApplyConsultancyTask extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        plan: ""
      };
    }
  
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
      }
    handleSubmit(event){
        alert("submitted: " + this.state.plan);
        //backend here
    }

render(){
    return(
      <div>
      <form  onSubmit={this.handleSubmit.bind(this)}>
      <label className="label"> Your Plan:  </label>
    <br/>
    <br/>
   <input type="text" name="input1"  onChange={this.handleChange.bind(this)}/>
   
</form>
</div>
    )}
    


} 
export default ApplyConsultancyTask;