import React, { Component } from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Snackbar from "../Components/snackbar";
import { AppConsumer } from "../Containers/AppProvider";

const styles = theme => ({
  main: {
    width: "auto",
    display: "block",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit
    // backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%",
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});
class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = { valid: null, token: null, changed: false, setToken: null };
  }
  handleLogin(e) {
    e.preventDefault();
    if (document.getElementById("loginform").checkValidity()) {
      let email = document.getElementById("email").value;
      let password = document.getElementById("password").value;
      fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })
        .then(res => res.json())
        .then(data => {
          fetch(`/api/login?token=${data}`)
            .then(res => res.json())
            .then(datas => {
              console.log(JSON.stringify(datas));

              if (datas === "Error") return this.setState({ valid: false });
              this.setState({ valid: true });
              this.state.setToken(data, datas.profile, datas.type);
              this.props.history.push("/profile");
            });
        })
        .catch(err => this.setState({ valid: false }));
    } else {
      this.setState({ valid: false });
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <AppConsumer>
          {context => {
            if (this.state.changed) return;
            if (context.token) this.props.history.push("/profile");
            this.setState({
              token: context.token,
              setToken: context.setToken,
              changed: true
            });
          }}
        </AppConsumer>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar
            className={classes.avatar}
            style={{ backgroundColor: "#394cb6" }}
          >
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} id="loginform">
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input id="email" name="email" autoComplete="email" autoFocus />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={e => this.handleLogin(e)}
            >
              Sign in
            </Button>
          </form>
          {this.state.valid === false ? (
            <Snackbar
              id="snackbar"
              open={true}
              type="error"
              message="Please enter correct data"
              onClick={setTimeout(() => this.setState({ valid: null }), 5000)}
            />
          ) : (
            <></>
          )}
          {this.state.valid === true ? (
            <Snackbar
              id="snackbar"
              open={true}
              type="success"
              message="Login successfull"
              onClick={setTimeout(() => this.setState({ valid: null }), 5000)}
            />
          ) : (
            <></>
          )}
        </Paper>
      </main>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SignIn);
