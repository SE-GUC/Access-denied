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
import Chat from "./Components/Chat";
class App extends Component {
  render() {
    const marginVal = window.location.pathname !== "/" ? "50px" : "0%";
    return (
      <Router>
        {window.location.pathname !== "/" &&
        window.location.pathname !== "/login" ? (
          <div>
            <NavBar />
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
            <Route path="/signup/" component={Signup} />
            <Route path="/login/" component={Login} />
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
              path="/chat/"
              render={props => (
                <Chat {...props} id="5ca0b858bc01d360848affbb" />
              )}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
