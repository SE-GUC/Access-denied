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
import { Redirect } from "react-router";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import classNames from "classnames";
import Divider from "@material-ui/core/Divider";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

const drawerWidth = 200;

const styles = theme => ({
  root: {
    width: "100%"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: 0,
    [theme.breakpoints.up("sm")]: {
      width: 0
    }
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: 0,
    marginRight: 20
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit,
      marginRight: 10,
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
    justifyContent: "left",
    marginLeft: 10
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
      searchText: "",
      open: false
    };
  }

  handleClose = () => {
    let currentState = this.state;
    currentState.anchorEl = null;
    this.setState(currentState);
  };
  handleKeyPress = event => {
    if (event.key === "Enter") {
      let currentState = this.state;
      currentState.redirect = true;
      currentState.redirectTarget = `/search?q=${currentState.searchText}`;
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

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };
  handleDrawerClick = event => {
    let currentState = this.state;
    currentState.anchorEl = event.currentTarget;
    if (event.currentTarget.dataset.id === "1") {
      currentState.redirect = true;
      currentState.redirectTarget = `/profile?email=${this.props.email}`;
      currentState.anchorEl = null;
      currentState.open = false;
    } else if (event.currentTarget.dataset.id === "2") {
      currentState.redirect = true;
      currentState.redirectTarget = "/login";
      currentState.anchorEl = null;
      currentState.open = false;
    } else if (event.currentTarget.dataset.id === "3") {
      currentState.redirect = true;
      currentState.redirectTarget = "/signup";
      currentState.anchorEl = null;
      currentState.open = false;
    } else if (event.currentTarget.dataset.id === "4") {
      currentState.redirect = true;
      currentState.redirectTarget = "/logout";
      currentState.anchorEl = null;
      currentState.open = false;
    }
    this.setState(currentState);
  };
  render() {
    const { classes, theme } = this.props;
    const { anchorEl } = this.state;
    const drawerList = ["Profile", "Login", "Register"];
    return (
      <div className={classes.root}>
        {this.renderRedirect()}
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: this.state.open
          })}
        >
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              aria-owns={anchorEl ? "simple-menu" : undefined}
              aria-haspopup="true"
              className={classNames(classes.menuButton, {
                [classes.hide]: this.state.open
              })}
              onClick={this.handleDrawerOpen}
              color="inherit"
              aria-label="Open drawer"
            >
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
        <Drawer
          variant="permanent"
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: this.state.open,
            [classes.drawerClose]: !this.state.open
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open
            })
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List onClick={this.handleDrawerClick}>
            {drawerList.map((text, index) => (
              <ListItem
                button
                key={text}
                onClick={this.handleDrawerClick}
                data-id={index + 1}
              >
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {["Logout"].map((text, index) => (
              <ListItem
                button
                key={text}
                onClick={this.handleDrawerClick}
                data-id={drawerList.length + index + 1}
              >
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </div>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(NavBar);
