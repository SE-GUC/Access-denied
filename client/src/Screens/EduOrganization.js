import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import qs from 'query-string'
import '../App.css'
import profile from '../Images/profile.png'
import profileBG from '../Images/profile-header.png'
import Button from '@material-ui/core/Button'
import { Redirect } from 'react-router-dom'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
const axios = require('axios')
function isNumber(n) {
  return !isNaN(parseFloat(n)) && !isNaN(n - 0)
}
class Edu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: props.id,
      email: props.email,
      verified: props.verified,
      name: null,
      basicInfo: null,
      courses: null,
      certificates: null,
      trainers: null,
      trainingPrograms: null,
      activeId: '1',
      loaded: false,
      redirect: false,
      open: false,
      dialogText: null,
      newData: null,
      city: null,
      area: null,
      street: null,
      pending: null
    }
  }
  handleClickOpen = name => event => {
    this.setState({
      open: true,
      dialogText: name
    })
  }

  handleClose = () => {
    this.setState({ open: false })
  }
  handleApply = () => {
    if (this.state.dialogText === 'address') {
      const data = {
        address: {
          city: this.state.city,
          area: this.state.area,
          street: this.state.street
        }
      }
      axios.put(`/api/EducationalOrganisation?id=` + this.state.id, data)
    } else {
      const data = {
        [this.state.dialogText]: this.state.newData
      }
      axios.put(`/api/EducationalOrganisation?id=` + this.state.id, data)
    }
    this.setState({ open: false })
  }

  handleChange = name => event => {
    if (name === 'partners') {
      this.setState({
        [name]: [event.target.value]
      })
    } else
      this.setState({
        [name]: event.target.value
      })
  }
  componentDidMount() {
    let id = this.state.id
    if (!this.state.id) {
      id = qs.parse(this.props.location.search, {
        ignoreQueryPrefix: true
      }).id
    }
    fetch(`/api/user/email?id=${id}`)
      .then(res => res.json())
      .then(res => {
        this.setState({ email: res.email })
        return fetch(`/api/educationalorganisation?id=${id}`)
      })
      .then(res => res.json())
      .then(res => {
        let currentState = this.state
        currentState.name = res.name
        currentState.basicInfo = (
          <table className="table">
            <tbody>
              <tr>
                <th scope="row" />
                <td>Name: </td>
                <td> {res.name}</td>
                <td>
                  {' '}
                  <div>
                    <Button
                      variant="outlined"
                      size="small"
                      color="primary"
                      hidden={!this.state.verified}
                      onClick={this.handleClickOpen('name')}
                    >
                      edit
                    </Button>
                  </div>
                </td>
              </tr>
              {res.contactInformation ? (
                <tr>
                  <th scope="row" />
                  <td>Contact information : </td>
                  <td>+20{res.contactInformation}</td>
                  <td>
                    {' '}
                    <div>
                      <Button
                        variant="outlined"
                        size="small"
                        color="primary"
                        hidden={!this.state.verified}
                        onClick={this.handleClickOpen('contactInformation')}
                      >
                        edit
                      </Button>
                    </div>
                  </td>
                </tr>
              ) : null}
              {res.address ? (
                <tr>
                  <th scope="row" />
                  <td>Address: </td>
                  <td>
                    {res.address.city} City, {res.address.area},{' '}
                    {res.address.street} st.
                  </td>
                  <td>
                    {' '}
                    <div>
                      <Button
                        variant="outlined"
                        size="small"
                        color="primary"
                        hidden={!this.state.verified}
                        onClick={this.handleClickOpen('address')}
                      >
                        edit
                      </Button>
                    </div>
                  </td>
                </tr>
              ) : null}
              {res.vision ? (
                <tr>
                  <th scope="row" />
                  <td>Vision</td>
                  <td>{res.vision}</td>
                  <td>
                    {' '}
                    <div>
                      <Button
                        variant="outlined"
                        size="small"
                        color="primary"
                        hidden={!this.state.verified}
                        onClick={this.handleClickOpen('vision')}
                      >
                        edit
                      </Button>
                    </div>
                  </td>
                </tr>
              ) : null}
              {res.mission ? (
                <tr>
                  <th scope="row" />
                  <td>Mission</td>
                  <td>{res.mission}</td>
                  <td>
                    {' '}
                    <div>
                      <Button
                        variant="outlined"
                        size="small"
                        color="primary"
                        hidden={!this.state.verified}
                        onClick={this.handleClickOpen('mission')}
                      >
                        edit
                      </Button>
                    </div>
                  </td>
                </tr>
              ) : null}
              {res.partners ? (
                <tr>
                  <th scope="row" />
                  <td>Partners </td>
                  <td>
                    <ul>
                      {res.partners.map(partner => (
                        <li> {partner}</li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    {' '}
                    <div>
                      <Button
                        variant="outlined"
                        size="small"
                        color="primary"
                        hidden={!this.state.verified}
                        onClick={this.handleClickOpen('partners')}
                      >
                        edit
                      </Button>
                    </div>
                  </td>
                </tr>
              ) : null}
              {res.information ? (
                <tr>
                  <th scope="row" />
                  <td>Extra info: </td>
                  <td>{res.information}</td>
                  <td>
                    {' '}
                    <div>
                      {this.renderRedirect()}{' '}
                      <Button
                        variant="outlined"
                        size="small"
                        color="primary"
                        hidden={!this.state.verified}
                        onClick={this.handleClickOpen('information')}
                      >
                        edit
                      </Button>
                    </div>
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        )

        currentState.courses = res.course.map(course => (
          <li className="list-group-item"> {course}</li>
        ))
        currentState.certificates = res.certificate.map(cert => (
          <a className="list-group-item" href={`/certifcate?id=${cert._id}`}>
            {' '}
            {cert.name}
          </a>
        ))
        currentState.trainers = res.trainer.map(trainer => (
          <li className="list-group-item"> {trainer}</li>
        ))
        currentState.trainingPrograms = res.trainingProgram.map(prog => (
          <li className="list-group-item"> {prog}</li>
        ))

        currentState.loaded = true
        this.setState(currentState)
        id = res._id
      })
      .catch(err => {
        console.error(err)
      }) //TBD
  }
  handleClick(e) {
    if (isNumber(e.target.id)) {
      let currentState = this.state
      currentState.activeId = e.target.id
      this.setState(currentState)
    }
  }
  render() {
    console.log(this.state)
    return (
      <div>
        <div>
          {this.state.dialogText !== 'address' ? (
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title" />
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  onChange={this.handleChange('newData')}
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={this.handleApply} color="primary">
                  Apply
                </Button>
              </DialogActions>
            </Dialog>
          ) : (
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title" />
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="city"
                  //Value={this.state.city}
                  onChange={this.handleChange('city')}
                  type="email"
                  fullWidth
                />
                <br />
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="area"
                  //  Value={this.state.area}
                  onChange={this.handleChange('area')}
                  type="email"
                  fullWidth
                />
                <br />
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="street"
                  //Value={this.state.street}
                  onChange={this.handleChange('street')}
                  type="email"
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={this.handleApply} color="primary">
                  Apply
                </Button>
              </DialogActions>
            </Dialog>
          )}
        </div>
        <div className="d-flex flex-row">
          <div className="card" style={{ width: '30%' }}>
            <img
              className="card-img-top"
              src={profile}
              style={{ width: '30%', alignSelf: 'center' }}
              alt="profile"
            />
            <div className="text-center text-capitalize card-body">
              <h4 className="text-center card-title">{this.state.email} </h4>
              <div className="card-subtitle mb-2 text-muted">
                {this.state.name}
              </div>
            </div>
          </div>
          <div
            className="p-2 flex-grow-1 d-flex flex-row"
            style={{
              backgroundImage: `url(${profileBG})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover'
            }}
          />
        </div>
        <div className="d-flex flex-row">
          <ul
            className="list-group"
            onClick={this.handleClick.bind(this)}
            style={{ minWidth: '30%' }}
          >
            <li
              className={
                this.state.activeId === '1'
                  ? 'list-group-item list-group-item-action list-group-item-dark'
                  : 'list-group-item list-group-item-action'
              }
              id="1"
            >
              Basic Information
            </li>
            <li
              className={
                this.state.activeId === '2'
                  ? 'list-group-item list-group-item-action list-group-item-dark'
                  : 'list-group-item list-group-item-action'
              }
              id="2"
            >
              Courses
            </li>
            <li
              className={
                this.state.activeId === '3'
                  ? 'list-group-item list-group-item-action list-group-item-dark'
                  : 'list-group-item list-group-item-action'
              }
              id="3"
            >
              Certificates
            </li>
            <li
              className={
                this.state.activeId === '4'
                  ? 'list-group-item list-group-item-action list-group-item-dark'
                  : 'list-group-item list-group-item-action'
              }
              id="4"
            >
              Trainers
            </li>
            <li
              className={
                this.state.activeId === '5'
                  ? 'list-group-item list-group-item-action list-group-item-dark'
                  : 'list-group-item list-group-item-action'
              }
              id="5"
            >
              Training Programs
            </li>
          </ul>
          {(function(state) {
            switch (state.activeId) {
              case '1':
                if (!state.loaded)
                  return (
                    <div
                      className="spinner-border"
                      style={{ marginLeft: '35%', marginTop: '15%' }}
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  )
                return (
                  <ul className="list-group" style={{ width: '100%' }}>
                    {state.basicInfo}
                  </ul>
                )
              case '2':
                if (!state.loaded)
                  return (
                    <div
                      className="spinner-border"
                      role="status"
                      style={{ marginLeft: '35%', marginTop: '15%' }}
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  )
                if (!state.courses || state.courses.length === 0)
                  return <h4 className="text-muted">No Courses Yet..</h4>
                return (
                  <ul className="list-group" style={{ width: '100%' }}>
                    {state.courses}
                  </ul>
                )
              case '3':
                if (!state.loaded)
                  return (
                    <div
                      className="spinner-border"
                      role="status"
                      style={{ marginLeft: '35%', marginTop: '15%' }}
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  )
                if (!state.certificates || state.certificates.length === 0)
                  return <h4 className="text-muted">No Certificates Yet..</h4>
                return (
                  <ul className="list-group" style={{ width: '100%' }}>
                    {state.certificates}
                  </ul>
                )
              case '4':
                if (!state.loaded)
                  return (
                    <div
                      className="spinner-border"
                      role="status"
                      style={{ marginLeft: '35%', marginTop: '15%' }}
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  )
                if (!state.trainers || state.trainers.length === 0)
                  return <h4 className="text-muted">No Trainers Yet..</h4>
                return (
                  <ul className="list-group" style={{ width: '100%' }}>
                    {state.trainers}
                  </ul>
                )
              case '5':
                if (!state.loaded)
                  return (
                    <div
                      className="spinner-border"
                      role="status"
                      style={{ marginLeft: '35%', marginTop: '15%' }}
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  )
                if (
                  !state.trainingPrograms ||
                  state.trainingPrograms.length === 0
                )
                  return (
                    <h4 className="text-muted">No Training Programs Yet..</h4>
                  )
                return (
                  <ul className="list-group" style={{ width: '100%' }}>
                    {state.trainingPrograms}
                  </ul>
                )
              default:
                break
            }
          })(this.state)}
        </div>
      </div>
    )
  }
}
export default Edu
