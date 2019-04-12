import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
import {Card,Button} from 'react-bootstrap'
import "../Screens/ApplyOnTask.css";



class ApplyConsultancyTask extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        plan: "",
        redirect:false
      };
    }
  
    handleChange(event) {
        this.setState({ plan: event.target.value });
      }
    handleSubmit(event){
        alert("submitted: " + this.state.plan);
        this.setState({redirect:true});
       
    }
    renderRedirect = () => {
      if (this.state.redirect) {
        return <Redirect to="/Home" />
      }
    }
render(){
    return(
 <Card> 
  <Card.Body>
  <p for="Plan" className="c1" align="center">Apply for task</p>
    <form>
    <div class="form-group">
      <label for="Plan" className="c2">Your Plan:</label>
      <textarea name="t" class="form-control" rows="5" id="plan" onChange={this.handleChange.bind(this)}> </textarea>
    </div>
  </form>
  {this.renderRedirect()}
    <Button size="lg" onClick ={this.handleSubmit.bind(this)} disabled={this.state.plan.length===0} className="buttonSubmit" variant="link" >Apply </Button>
  </Card.Body>
</Card> 

    ) 
  }
    


} 
export default ApplyConsultancyTask;