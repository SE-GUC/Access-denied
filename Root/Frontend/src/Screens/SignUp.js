import React, { Component } from "react";

//import "./App.css";
//import Select from "react-dropdown-select";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import EducationalForm from "../Components/EducationalForm";
import ConsultancyForm from "../Components/ConsultancyForm";
import CoworkingForm from "../Components/CoworkingForm";
import MemberForm from "../Components/MemberForm";
import PartnerForm from "../Components/PartnerForm";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      member: false,
      consultancy: false,
      edu: false,
      partner: false,
      coworking: false
    }; //state keeps track of which option was chosen by the user, initially: all is false

    //functions ending in 'display' to set the state variables to true once clicked by the user
    this.eduDisplay = this.eduDisplay.bind(this);
    this.consultancyDisplay = this.consultancyDisplay.bind(this);
    this.coworkingDisplay = this.coworkingDisplay.bind(this);
    this.memberDisplay = this.memberDisplay.bind(this);
    this.partnerDisplay = this.partnerDisplay.bind(this);
  }
  //functions to change the state
  eduDisplay() {
    this.setState({
      edu: true,
      member: false,
      consultancy: false,
      coworking: false,
      partner: false
    });
  }
  consultancyDisplay() {
    this.setState({
      consultancy: true,
      edu: false,
      member: false,
      coworking: false,
      partner: false
    });
  }
  coworkingDisplay() {
    this.setState({
      coworking: true,
      edu: false,
      member: false,
      consultancy: false,
      partner: false
    });
  }
  memberDisplay() {
    this.setState({
      member: true,
      edu: false,
      consultancy: false,
      coworking: false,
      partner: false
    });
  }
  partnerDisplay() {
    this.setState({
      partner: true,
      edu: false,
      member: false,
      consultancy: false,
      coworking: false
    });
  }

  render() {
    let form; //form that will be rendered
    //boolean variables for checking which was clicked
    let edu = this.state.edu;
    let partner = this.state.partner;
    let consultancy = this.state.consultancy;
    let member = this.state.member;
    let coworking = this.state.coworking;

    /*checking which was clicked, so that we can set the form that will be displayed, 
since not all types of profiles need to provide the same info
*/
    if (edu) {
      form = <EducationalForm />;
    }
    if (partner) {
      form = <PartnerForm />;
    }
    if (consultancy) {
      form = <ConsultancyForm />;
    }

    if (member) {
      form = <MemberForm />;
    }
    if (coworking) {
      form = <CoworkingForm />;
    }
    return (
      <div className="App">
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossorigin="anonymous"
        />

        <br />
        <label>Welcome to LirtenHub</label>
        <br />
        <label>Please choose from the drop down menu who you are</label>
        <br />
        <DropdownButton id="dropdown-item-button" title="choose">
          <Dropdown.Item as="button" onClick={this.memberDisplay}>
            Member
          </Dropdown.Item>
          <Dropdown.Item as="button" onClick={this.partnerDisplay}>
            Partner
          </Dropdown.Item>
          <Dropdown.Item as="button" onClick={this.eduDisplay}>
            Educational Organisation
          </Dropdown.Item>
          <Dropdown.Item as="button" onClick={this.consultancyDisplay}>
            Consultancy Agency
          </Dropdown.Item>
          <Dropdown.Item as="button" onClick={this.coworkingDisplay}>
            Coworking Space
          </Dropdown.Item>
        </DropdownButton>
        {form}
      </div>
    );
  }
}

export default SignUp;
