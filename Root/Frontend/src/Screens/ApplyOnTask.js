import React, { Component } from "react";
import ApplyConsultancyTask from "../Components/ApplyConsultancyTask";
import ApplyMemberTask from "../Components/ApplyMemberTask";

class ApplyOnTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      consultancy: true,
      member: true
    };
  }

  render() {
    let form;

    if (this.state.consultancy) {
      form = <ApplyConsultancyTask />;
    }
    if (this.state.member) {
      form = <ApplyMemberTask />;
    }
    return <div className="ApplicationForm">{form}</div>;
  }
}
export default ApplyOnTask;
