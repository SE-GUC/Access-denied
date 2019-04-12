import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Certificate from "./Screens/Certificate";
import Home from "./Screens/Home";
import Member from "./Screens/Member";
import NavBar from "./Components/navBar";
import Signup from "./Screens/SignUp";
import Login from "./Screens/Login";
//import Search from "./Screens/SearchPage";
import ConsultancyForm from "./Components/ConsultancyForm";
import CoworkingForm from "./Components/CoworkingForm";
import EducationalForm from "./Components/EducationalForm";
import FilterPanel from "./Components/filterPanel";
import MemberForm from "./Components/MemberForm";
import PartnerForm from "./Components/PartnerForm";
import TaskStatus from "./Components/taskStatus";
import About from "./Screens/About";
import Partner from "./Screens/Partner";
import EduOrganization from "./Screens/EduOrganization";
import Coworking from "./Screens/Coworking";
import Chat from "./Components/Chat";
import Review from "./Screens/Review";
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
            <Route path="/profile/" component={Member} />
            <Route path="/partner/" component={Partner} />
            <Route path="/eduorganization/" component={EduOrganization} />
            <Route path="/coworking/" component={Coworking} />
            <Route path="/signup/" component={Signup} />
            <Route path="/login/" component={Login} />
            <Route path="/About/" component={About} />
            <Route path="/taskStatus/" component={TaskStatus} />
            {/* <Route path="/search/" component={Search} /> */}
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
    );
  }
}

export default App;
