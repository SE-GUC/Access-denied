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
class taskview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      task: null,
      name: null,
      chosenmember: '',
      redirect: false
    }
    this.onClick = this.onClick.bind(this)
  }

  componentDidMount() {
    let taskid = query.parse(this.props.location.search, {
      ignoreQueryPrefix: true
    }).id
    console.log(taskid)
    axios.get(`/api/task/?id=` + taskid).then(q => {
      const consid = q.data.consultancy == undefined ? ' ' : q.data.consultancy
      console.log(q.data)
      console.log(q.data.Tags)
      console.log(consid + 'this')
      axios.get(`/api/consultancy/?id=` + consid).then(qq => {
        console.log(qq.data)
        this.setState({ consaltancy: qq.data == null ? null : qq.data.name })
      })
      // console.log(this.state.consu)
      //   console.log(this.state.name)

      this.setState({
        task: q.data,
        name: q.data.name,
        owner: q.data.owner,
        description: q.data.description,
        extranotes: q.data.extraNotes,
        date: q.data.date,
        effortlevel: q.data.effortLevel,
        commitmentlevel: q.data.commitmentLevel,
        experiencelevel: q.data.experienceLevel,
        timerequired: q.data.timeRequired,
        monetrarycomp: q.data.monetaryComp,
        skills: q.data.skills,
        appliedmembers: q.data.applications
      })
    })
  }

  handleListItemClick(event) {
    // this.setState({ selectedIndex: index });
    let info = {
      assignee: event.currentTarget.textContent
    }
    let taskid = query.parse(this.props.location.search, {
      ignoreQueryPrefix: true
    }).id
    fetch(`/api/partner/chooseAssignee?id=` + taskid, {
      method: 'PUT',
      body: JSON.stringify(info),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(json => console.log(json))
  }
  onClick() {
    this.setState({ redirect: true })
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={'/applyOnTask?id=' + this.state.task._id} />
    }
  }
  render() {
    while (this.state.task == null) {
      return (
        <paper>
          {' '}
          <LinearProgress style={{ top: spacing.unit * 45 }} />{' '}
        </paper>
      )
    }

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
            Description
          </Typographyhead>
          <Typographypara variant="body1" component="h5">
            {this.state.description == null
              ? 'No Data Avaliable'
              : this.state.description}
          </Typographypara>
          <Divider variant="middle" style={{ marginTop: '3%' }} />
          <Typographyhead variant="h5" component="h4">
            Extranotes
          </Typographyhead>
          <Typographypara variant="body1" component="h5">
            {this.state.extranotes == null
              ? 'No Data Avaliable'
              : this.state.extranotes}
          </Typographypara>
          <Divider variant="middle" style={{ marginTop: '3%' }} />
          <Typographyhead variant="h5" component="h4">
            Owner
          </Typographyhead>
          <Typographypara variant="body1" component="h5">
            {this.state.owner == null
              ? 'No Data Avaliable'
              : this.state.owner.name}
          </Typographypara>
          <Divider variant="middle" style={{ marginTop: '3%' }} />
          <Typographyhead variant="h5" component="h4">
            Consaltancy
          </Typographyhead>
          <Typographypara variant="body1" component="h5">
            {this.state.consaltancy == null
              ? 'No data Avaliable'
              : this.state.consaltancy}
          </Typographypara>
          <Divider variant="middle" style={{ marginTop: '3%' }} />
          <Typographyhead variant="h5" component="h4">
            Experience level
          </Typographyhead>
          <Typographypara variant="body1" component="h5">
            {this.state.experiencelevel == null
              ? 'No data Avaliable'
              : this.state.experiencelevel}
          </Typographypara>
          <Divider variant="middle" style={{ marginTop: '3%' }} />
          <Typographyhead variant="h5" component="h4">
            Commitment level
          </Typographyhead>
          <Typographypara variant="body1" component="h5">
            {this.state.commitmentlevel == null
              ? 'No data Avaliable'
              : this.state.commitmentlevel}
          </Typographypara>
          <Divider variant="middle" style={{ marginTop: '3%' }} />
          <Typographyhead variant="h5" component="h4">
            Effort level
          </Typographyhead>
          <Typographypara variant="body1" component="h5">
            {this.state.effortlevel == null
              ? 'No data Avaliable'
              : this.state.effortlevel}
          </Typographypara>
          <Divider variant="middle" style={{ marginTop: '3%' }} />
          <Typographyhead variant="h5" component="h4">
            Time required
          </Typographyhead>
          <Typographypara variant="body1" component="h5">
            {this.state.timerequired == null
              ? 'No data Avaliable'
              : this.state.timerequired}
          </Typographypara>
          <Divider variant="middle" style={{ marginTop: '3%' }} />
          <Typographyhead variant="h5" component="h5">
            Monetrary comp
          </Typographyhead>
          <Typographypara variant="body1" component="h5">
            {this.state.monetrarycomp == null
              ? 'No data Avaliable'
              : this.state.monetrarycomp}
          </Typographypara>
          <Divider variant="middle" style={{ marginTop: '3%' }} />
          <Typographyhead variant="h5" component="h4">
            Skills
          </Typographyhead>
          <Typographypara variant="body1" component="h5">
            {this.state.skills == null
              ? 'No data Avaliable'
              : this.state.skills}
          </Typographypara>
          <Divider variant="middle" style={{ marginTop: '3%' }} />
          <Typographyhead variant="h5" component="h4">
            Applied Members
          </Typographyhead>

          <div>
            <List component="nav">
              {this.state.appliedmembers.map(p => {
                return (
                  <ListItem
                    button
                    onClick={this.handleListItemClick.bind(this)}
                  >
                    <ListItemText primary={p.applier} />
                  </ListItem>
                )
              })}
            </List>
            <Divider />
          </div>
        </Card>
        <Button
          size="lg"
          onClick={this.onClick}
          className="buttonSubmit"
          variant="link"
        >
          Apply{' '}
        </Button>
      </div>
    )
  }
}
taskview.propTypes = {
  classes: PropTypes.object.isRequired
}
export default withStyles(styles)(taskview)
