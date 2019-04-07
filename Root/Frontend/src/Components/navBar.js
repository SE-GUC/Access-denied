import React, { Component } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { withStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Redirect } from "react-router";

const styles = theme => ({
  root: {
    width: "100%"
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit,
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  }
});

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      redirect: false,
      redirectTarget: null,
      searchText: ""
    };
  }
  handleClick = event => {
    let currentState = this.state;
    console.log(event.target.toString());
    currentState.anchorEl = event.target;
    if (event.target.dataset.id === "1") {
      currentState.redirect = true;
      currentState.redirectTarget = `/profile?email=${this.props.email}`;
      currentState.anchorEl = null;
    } else if (event.target.dataset.id === "2") {
      currentState.redirect = true;
      currentState.redirectTarget = "/signup";
      currentState.anchorEl = null;
    } else if (event.target.dataset.id === "3") {
      currentState.redirect = true;
      currentState.redirectTarget = "/login";
      currentState.anchorEl = null;
    } else if (event.target.toString() == "[object HTMLDivElement]") {
      currentState.anchorEl = null;
    }
    this.setState(currentState);
  };

  handleClose = () => {
    let currentState = this.state;
    currentState.anchorEl = null;
    this.setState(currentState);
  };
  handleKeyPress = event => {
    if (event.key === "Enter") {
      let currentState = this.state;
      currentState.redirect = true;
      currentState.redirectTarget = `/search?q=${this.state.searchText}`;
      this.setState(currentState);
    } else {
      let currentState = this.state;
      currentState.searchText += event.key;
      this.setState(currentState);
    }
  };
  renderRedirect = () => {
    if (this.state.redirect) {
      let currentState = this.state;
      currentState.redirect = false;
      let target = currentState.redirectTarget;
      currentState.redirectTarget = null;
      this.setState(currentState);
      return <Redirect to={target} />;
    }
  };
  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    return (
      <div className={classes.root}>
        {this.renderRedirect()}
        <AppBar>
          <Toolbar>
            <IconButton
              aria-owns={anchorEl ? "simple-menu" : undefined}
              aria-haspopup="true"
              onClick={this.handleClick}
              className={classes.menuButton}
              color="inherit"
              aria-label="Open drawer"
            >
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleClose} data-id="1">
                  Profile
                </MenuItem>
                <MenuItem onClick={this.handleClose} data-id="2">
                  Register
                </MenuItem>
                <MenuItem onClick={this.handleClose} data-id="3">
                  Login
                </MenuItem>
              </Menu>
              <MenuIcon />
            </IconButton>
            <Typography
              className={classes.title}
              variant="h6"
              color="inherit"
              noWrap
            >
              LirtenHub
            </Typography>
            <div className={classes.grow} />
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                onKeyPress={this.handleKeyPress}
              />
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NavBar);
