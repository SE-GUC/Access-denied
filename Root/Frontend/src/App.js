import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Certificate from "./Screens/Certificate";
import Home from "./Screens/Home";
import Member from "./Screens/Member";
import NavBar from "./Components/navBar";
import EducationalForm from "./Components/EducationalForm";
import Register from "./Screens/Register";
import LogIn from "./Screens/LogIn";
import PartnerForm from "./Components/PartnerForm";
import CoworkingForm from "./Components/CoworkingForm";
import ConsultancyForm from "./Components/ConsultancyForm";
import MemberForm from "./Components/MemberForm";

class App extends Component {
  render() {
    const marginVal = window.location.pathname !== "/" ? "4.75%" : "0%";
    return (
      <Router>
        {window.location.pathname !== "/" ? (
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
            <Route path="/member/" component={Member} />
            <Route path="/nav/" component={NavBar} />
            <Route path="/signup/" component={Register} />
            <Route path="/eduForm" component={EducationalForm} />
            <Route path="/coworkingForm" component={CoworkingForm} />
            <Route path="/partnerForm" component={PartnerForm} />
            <Route path="/consultancyForm" component={ConsultancyForm} />
            <Route path="/memberForm" component={MemberForm} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
