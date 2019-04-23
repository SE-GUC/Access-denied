import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Certificate from './Screens/Certificate'
import Home from './Screens/Home'
import Member from './Screens/Member'
import NavBar from './Components/navBar'
import Login from './Screens/Login'
import ApplyOnTask from './Screens/ApplyOnTask'
import Search from './Screens/SearchPage'
import FilterPanel from './Components/filterPanel'
import EducationalForm from './Components/EducationalForm'
import Register from './Screens/Register'
import PartnerForm from './Components/PartnerForm'
import CoworkingForm from './Components/CoworkingForm'
import ConsultancyForm from './Components/ConsultancyForm'
import MemberForm from './Components/MemberForm'
import TaskStatus from './Components/taskStatus'
import ApplyMemberTask from './Components/ApplyMemberTask'
import ApplyConsultancyTask from './Components/ApplyConsultancyTask'
import Logout from './Components/Logout'
import About from './Screens/About'
import Partner from './Screens/Partner'
import EduOrganization from './Screens/EduOrganization'
import Coworking from './Screens/Coworking'
import Chat from './Components/Chat'
import Review from './Screens/Review'
import AppProvider from './Containers/AppProvider'
import Profile from './Screens/Profile'
import taskview from './Screens/taskview'
import TaskForm from './Screens/TaskForm'
import Admin from './Screens/Admin'
import CertAccept from './Screens/CertAccept'
import ProjectLanding from './Screens/ProjectLanding'
import Project from './Screens/Project'
import Footer from './Components/Footer'
import allcert from './Screens/Allcertificate'
import ConsultancyAgency from './Screens/ConsultancyAgency'
import TaskLanding from './Screens/TaskLanding'
import NewCert from './Components/NewCert'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      notify: false
    }
    this.handleNotification = this.handleNotification.bind(this)
  }
  handleNotification(add) {
    if (add) this.setState({ notify: true })
    else {
      this.setState({ notify: false })
      document.getElementById('chatsbtn').click()
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
          <div style={{ marginTop: '50px' }}>
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
              <Route
                path="/consultancy/"
                component={props => <ConsultancyAgency {...props} />}
              />
              <Route path="/login/" component={Login} />
              <Route path="/CertAccept/" component={CertAccept} />
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
              <Route path="/taskview/" component={taskview} />
              <Route path="/review/" component={Review} />
              <Route path="/newtask/" component={TaskForm} />
              <Route path="/logout/" component={Logout} />
              <Route path="/admin/" component={Admin} />
              <Route exact path="/Project" component={ProjectLanding} />
              <Route exact path="/Project/:id" component={Project} />
              <Route path="/allcertificates/" component={allcert} />
              <Route exact path="/task/" component={TaskLanding} />
              <Route path="/newcert" component={NewCert} />
            </Switch>
            <Chat handleNotification={this.handleNotification} />
          </div>
          <Footer />
        </Router>
      </AppProvider>
    )
  }
}

export default App
