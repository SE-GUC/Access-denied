import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import { NavigateNext } from '@material-ui/icons'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import { red } from '@material-ui/core/colors'
import EducationalForm from './EducationalForm'
import ConsultancyForm from './ConsultancyForm'
import { Redirect } from 'react-router'
import { CallToAction } from 'react-landing-page'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: '410px',
    backgroundColor: theme.palette.background.paper
  }
})

/*function ListDividers(props) {
  const { classes } = props;
  return (
    <List component="nav" className={classes.root}>
      <ListItem button>
        <ListItemText
          primary="Member"
          secondary="I am ready for freelancing opportunities"
        />
        <NavigateNext color="primary" fontSize="large" />

        <br />
      </ListItem>

      <Divider />
      <ListItem button divider>
        <ListItemText
          primary="Partner"
          secondary="I am seeking motivated individuals to complete tasks"
        />
        <NavigateNext color="primary" fontSize="large" />
        <br />
      </ListItem>
      <ListItem button>
        <ListItemText
          primary="Consultancy Agency"
          secondary="I can offer advice"
        />
        <NavigateNext color="primary" fontSize="large" />
        <br />
      </ListItem>
      <Divider light />
      <ListItem button>
        <ListItemText
          primary="Educational Organisation"
          secondary="I offer courses and training"
        />
        <NavigateNext color="primary" fontSize="large" />
        <br />
      </ListItem>
      <Divider light />
      <ListItem button>
        <ListItemText
          primary="Coworking space"
          secondary="I provide shared working spaces"
        />
        <NavigateNext color="primary" fontSize="large" />
        <br />
      </ListItem>
    </List>
  );
}*/

class ListDivider extends Component {
  render() {
    const { classes } = this.props

    return (
      <List component="nav" className={classes.root}>
        <Link to="/memberForm">
          <ListItem button>
            <ListItemText
              primary="Member"
              secondary="I am ready for freelancing opportunities"
            />
            <NavigateNext color="primary" fontSize="large" />
            <br />
          </ListItem>
        </Link>

        <Divider />
        <Link to="/partnerForm">
          <ListItem button divider>
            <ListItemText
              primary="Partner"
              secondary="I am seeking motivated individuals to complete tasks"
            />
            <NavigateNext color="primary" fontSize="large" />
            <br />
          </ListItem>
        </Link>
        <Link to="/consultancyForm">
          <ListItem button>
            <ListItemText
              primary="Consultancy Agency"
              secondary="I can offer business advice"
            />
            <NavigateNext color="primary" fontSize="large" />
            <br />
          </ListItem>
        </Link>
        <Divider light />
        <Link to="/eduForm">
          <ListItem button>
            <ListItemText
              primary="Educational Organisation"
              secondary="I offer courses and training"
            />
            <NavigateNext color="primary" fontSize="large" />
            <br />
          </ListItem>
        </Link>
        <Link to="/coworkingForm">
          <Divider light />
          <ListItem button>
            <ListItemText
              primary="Coworking space"
              secondary="I provide shared working spaces"
            />
            <NavigateNext color="primary" fontSize="large" />
            <br />
          </ListItem>
        </Link>
      </List>
    )
  }
}
ListDivider.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ListDivider)
//export default ListDivider;
