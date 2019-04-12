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
    const marginVal = window.location.pathname !== "/" ? "50px" : "0%";
    return (
      <AppProvider>
        <Router>
          {window.location.pathname !== "/" &&
          window.location.pathname !== "/login" ? (
            <div>
              <NavBar
                notification={this.state.notify}
                handleNotification={this.handleNotification}
              />
            </div>
          ) : null}
          <div style={{ marginTop: marginVal }}>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route
                path="/certificate/"
                render={props => (
                  <Certificate {...props} id="5ca0c0b44e81266044cf2b70" />
                )}
              />
              <Route
                path="/profile/"
                component={props => (
                  <Member
                    {...props}
                    id="5cafc26b348fd72d1ca019e9"
                    email="Mahmood@gmail.com"
                  />
                )}
              />
              <Route
                path="/partner/"
                component={props => (
                  <Partner
                    {...props}
                    id="5cb084456ffc2f11609dda0b"
                    email="than2sq@hallf.gone"
                  />
                )}
              />
              <Route
                path="/eduorganization/"
                component={props => (
                  <EduOrganization
                    {...props}
                    id="5cb07ed0fe0b4e1f38d3f4f9"
                    email="than2s@half.gonee"
                  />
                )}
              />
              <Route
                path="/coworking/"
                component={props => (
                  <Coworking
                    {...props}
                    id="5cb07c2ffe0b4e1f38d3f4f6"
                    email="Coworking@space.com"
                  />
                )}
              />
              <Route path="/signup/" component={Signup} />
              <Route path="/login/" component={Login} />
              <Route path="/About/" component={About} />
              <Route path="/taskStatus/" component={TaskStatus} />
               <Route path="/search/" component={Search} /> 
               <Route path="/applyOnTask/" component={ApplyOnTask} />
                    <Route path="/signup/" component={Register} />
            <Route path="/eduForm" component={EducationalForm} />
            <Route path="/coworkingForm" component={CoworkingForm} />
            <Route path="/partnerForm" component={PartnerForm} />
            <Route path="/consultancyForm" component={ConsultancyForm} />
            <Route path="/memberForm" component={MemberForm} />
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
              <Route
                path="/review/"
                render={props => <Review {...props} type="member" />}
              />
            </Switch>
            <Chat
              id="5ca0b858bc01d360848affbb"
              handleNotification={this.handleNotification}
            />

          </div>
        </Router>
      </AppProvider>


    );
  }
}

export default App;
