import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Certificate from "./Screens/Certificate";
import Home from "./Screens/Home";
import Member from "./Screens/Member";
import NavBar from "./Components/navBar";
import Login from "./Screens/Login";
import ApplyOnTask from "./Screens/ApplyOnTask";
import Search from "./Screens/SearchPage";
import FilterPanel from "./Components/filterPanel";
import EducationalForm from "./Components/EducationalForm";
import Register from "./Screens/Register";
import PartnerForm from "./Components/PartnerForm";
import CoworkingForm from "./Components/CoworkingForm";
import ConsultancyForm from "./Components/ConsultancyForm";
import MemberForm from "./Components/MemberForm";
import TaskStatus from "./Components/taskStatus";
import ApplyMemberTask from "./Components/ApplyMemberTask";
import ApplyConsultancyTask from "./Components/ApplyConsultancyTask";

import About from "./Screens/About";
import Partner from "./Screens/Partner";
import EduOrganization from "./Screens/EduOrganization";
import Coworking from "./Screens/Coworking";
import Chat from "./Components/Chat";
import Review from "./Screens/Review";
import AppProvider from "./Containers/AppProvider";
import Profile from "./Screens/Profile";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notify: false
    };
    this.handleNotification = this.handleNotification.bind(this);
  }
  handleNotification(add) {
    if (add) this.setState({ notify: true });
    else {
      this.setState({ notify: false });
      document.getElementById("chatsbtn").click();
    }
  }
  render() {
    // const marginVal = window.location.pathname !== "/" ? "50px" : "0%";
    return (
      <AppProvider>
        <Router>
          {/* {window.location.pathname !== "/" &&
          window.location.pathname !== "/login" ? ( */}
          <div>
            <NavBar
              notification={this.state.notify}
              handleNotification={this.handleNotification}
            />
          </div>
          {/* ) : null} */}
          <div style={{ marginTop: "50px" }}>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/certificate/" component={Certificate} />
              <Route
                path="/member/"
                component={props => <Member {...props} />}
              />
              <Route
                path="/partner/"
                component={props => <Partner {...props} />}
              />
              <Route
                path="/eduorganization/"
                component={props => <EduOrganization {...props} />}
              />
              <Route
                path="/coworking/"
                component={props => <Coworking {...props} />}
              />
              <Route path="/login/" component={Login} />
              <Route path="/profile/" component={Profile} />
              <Route path="/About/" component={About} />
              <Route path="/taskStatus/" component={TaskStatus} />
              <Route path="/search/" component={Search} />
              <Route path="/member/" component={Member} />
              <Route path="/applyOnTask/" component={ApplyOnTask} />
              <Route path="/signup/" component={Register} />
              <Route path="/eduForm/" component={EducationalForm} />
              <Route path="/coworkingForm/" component={CoworkingForm} />
              <Route path="/partnerForm/" component={PartnerForm} />
              <Route path="/consultancyForm/" component={ConsultancyForm} />
              <Route path="/memberForm/" component={MemberForm} />
              {/* Some Components for grading purposes only */}
              <Route
                path="/components/"
                render={() => (
                  <>
                    <ConsultancyForm />
                    <CoworkingForm />
                    <EducationalForm />
                    <MemberForm />
                    <PartnerForm />
                    <TaskStatus />
                    <FilterPanel />
                  </>
                )}
              />
              {/* Some Components for grading purposes only */}
              <Route path="/review/" component={Review} />
            </Switch>
            <Chat handleNotification={this.handleNotification} />
          </div>
        </Router>
      </AppProvider>
    );
  }
}

export default App;
