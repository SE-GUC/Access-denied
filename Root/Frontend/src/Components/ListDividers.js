import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { NavigateNext } from "@material-ui/icons";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { red } from "@material-ui/core/colors";
import EducationalForm from "./EducationalForm";
import ConsultancyForm from "./ConsultancyForm";
import { Redirect } from "react-router";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: "410px",
    backgroundColor: theme.palette.background.paper
  }
});

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
  constructor(props) {
    super(props);
    this.state = {
      redirectTarget: null,
      edu: false,
      consultancy: false,
      member: false,
      partner: false,
      coworking: false,
      willRedirect: false
    };

    this.handleEdu = this.handleEdu.bind(this);
    this.resetState = this.resetState.bind(this);
    this.redirectHelp = this.redirectHelp.bind(this);
  }

  handleEdu() {
    this.setState({ willRedirect: true, redirectTarget: "/eduForm" });
    let myTarget = this.state.redirectTarget;
    console.log(myTarget);
    //this.resetState();
    return <Redirect to={myTarget} />;
  }
  handleCons(event) {
    this.setState({ willRedirect: true, redirectTarget: "/login" });
  }

  resetState() {
    this.setState({
      redirectTarget: null,
      edu: false,
      consultancy: false,
      member: false,
      partner: false,
      coworking: false,
      willRedirect: false
    });
  }
  redirectHelp() {
    if (this.state.willRedirect) {
      let myTarget = this.state.redirectTarget;
      // this.resetState();
      console.log(myTarget);

      return <Redirect to="myTarget" />;
    }
  }
  render() {
    const { classes } = this.props;

    return (
      <List component="nav" className={classes.root}>
        <ListItem button onClick={this.handleEdu}>
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
            secondary="I can offer business advice"
          />
          <NavigateNext color="primary" fontSize="large" />
          <br />
        </ListItem>
        <Divider light />

        <ListItem
          button
          onClick={() => {
            console.log("here");
            return <Redirect to="/eduForm" />;
          }}
        >
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
  }
}
ListDivider.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ListDivider);
//export default ListDivider;
