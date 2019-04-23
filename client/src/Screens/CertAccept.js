import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import query from 'query-string'
import Divider from '@material-ui/core/Divider'
import spacing from '@material-ui/core/styles/spacing'
import indigo from '@material-ui/core/colors/indigo'
import { styled } from '@material-ui/styles'
import LinearProgress from '@material-ui/core/LinearProgress'
import Applyontask from './ApplyOnTask'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/Inbox'
import DraftsIcon from '@material-ui/icons/Drafts'

const axios = require('axios')

const Typographyhead = styled(Typography)({
  color: indigo[400],
  marginLeft: '1.5%'
})
const Typographypara = styled(Typography)({
  marginLeft: '1.5%'
})

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
})
class CertAccept extends Component {
  constructor(props) {
    super(props)
    this.state = {
      certificate: null,
      name: null,
      redirect: false
    }
  }

  componentDidMount() {
    let certificateID = query.parse(this.props.location.search, {
      ignoreQueryPrefix: true
    }).id
    axios.get(`/api/certification/?id=` + certificateID).then(c => {
      this.setState({
        certificate: c.data,
        name: c.data.name,
        skills: c.data.skills,
        fees: c.data.Fees,
        payment: c.data.Method_of_payment,
        evaluation: c.data.Evaluation_procedure,
        membersapplied: c.data.membersapplied
      })
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/Home" />
    }
  }

  handleListItemClick(event) {
    let info = {
      membersapplied: event.currentTarget.textContent
    }
    let certificateId = query.parse(this.props.location.search, {
      ignoreQueryPrefix: true
    }).id
    fetch(`/api/EducationalOrganisation/chooseApplicant?id=` + certificateId, {
      method: 'PUT',
      body: JSON.stringify(info),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(json => console.log(json))
    this.setState({ redirect: true })
  }

  render() {
    while (this.state.certificate == null) {
      return (
        <paper>
          {' '}
          <LinearProgress style={{ top: spacing.unit * 45 }} />{' '}
        </paper>
      )
    }
    const members = this.state.membersapplied

    return (
      <div>
        {' '}
        {this.renderRedirect()}
        <Paper
          style={{
            maxWidth: 800,
            marginLeft: '20%',
            color: 'white',
            marginTop: '5%'
          }}
        >
          <Typography
            gutterBottom
            variant="h3"
            component="h2"
            align="center"
            style={{ color: indigo[500] }}
          >
            {this.state.name == null ? 'No Data Avaliable' : this.state.name}
          </Typography>
        </Paper>
        <Card
          className="taskpaper"
          elevation={1}
          style={{ maxWidth: 800, marginLeft: '20%' }}
        >
          <Typographyhead variant="h5" component="h4">
            Skills
          </Typographyhead>
          <Typographypara variant="body1" component="h5">
            {this.state.skills == null
              ? 'No Data Avaliable'
              : this.state.skills}
          </Typographypara>
          <Divider variant="middle" style={{ marginTop: '3%' }} />
          <Typographyhead variant="h5" component="h4">
            Evaluation Procedure
          </Typographyhead>
          <Typographypara variant="body1" component="h5">
            {this.state.evaluation == null
              ? 'No Data Avaliable'
              : this.state.evaluation}
          </Typographypara>
          <Divider variant="middle" style={{ marginTop: '3%' }} />
          <Typographyhead variant="h5" component="h4" />
          <Typographypara variant="body1" component="h5">
            {this.state.fees == null ? 'No Data Avaliable' : this.state.fees}
          </Typographypara>
          <Divider variant="middle" style={{ marginTop: '3%' }} />
          <Typographyhead variant="h5" component="h4">
            Method of payment
          </Typographyhead>
          <Typographypara variant="body1" component="h5">
            {this.state.payment == null
              ? 'No data Avaliable'
              : this.state.payment}
          </Typographypara>
          <Divider variant="middle" style={{ marginTop: '3%' }} />
          <Typographyhead variant="h5" component="h4">
            Applied Members
          </Typographyhead>

          <div>
            <List component="nav">
              {members.map(m => {
                return (
                  <ListItem
                    button
                    onClick={this.handleListItemClick.bind(this)}
                  >
                    <ListItemText primary={m} />
                  </ListItem>
                )
              })}
            </List>
            <Divider />
          </div>
        </Card>
      </div>
    )
  }
}
CertAccept.propTypes = {
  classes: PropTypes.object.isRequired
}
export default withStyles(styles)(CertAccept)
