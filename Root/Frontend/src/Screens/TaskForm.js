import React from "react";
import PropTypes from "prop-types";
import Alert from "react-bootstrap/Alert";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import NavigationIcon from "@material-ui/icons/Navigation";
import Fab from "@material-ui/core/Fab";
const axios = require("axios");

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 500
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  },
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  },
  root: {
    display: "flex"
  },
  formControl: {
    margin: theme.spacing.unit * 3
  },
  group: {
    margin: `${theme.spacing.unit}px 0`
  },
  fab: {
    margin: theme.spacing.unit
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
});

const level = [
  {
    value: "1",
    label: "1"
  },
  {
    value: "2",
    label: "2"
  },
  {
    value: "3",
    label: "3"
  },
  {
    value: "4",
    label: "4"
  },
  {
    value: "5",
    label: "5"
  },
  {
    value: "6",
    label: "6"
  },
  {
    value: "7",
    label: "7"
  },
  {
    value: "8",
    label: "8"
  },
  {
    value: "9",
    label: "9"
  },
  {
    value: "10",
    label: "10"
  }
];
const currencies = [
  {
    value: "USD",
    label: "$"
  },
  {
    value: "EUR",
    label: "€"
  },
  {
    value: "BTC",
    label: "฿"
  },
  {
    value: "JPY",
    label: "¥"
  }
];

class TaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    const data = {
      name: this.state.name,
      description: this.state.description,
      extraNotes: this.state.extraNotes,
      effortLevel: this.state.effortLevel,
      commitmentLevel: this.state.commitmentLevel,
      experienceLevel: this.state.experienceLevel,
      timeRequired: this.state.timeRequired,
      monetaryComp: this.state.monetaryComp
    };
    axios.post("/api/task/", data);
  }
  state = {
    name: "",
    multiline: "",
    extraNotes: "",
    Description: "",
    effortlevel: "",
    commitmentLevel: "",
    experienceLevel: "",
    currency: "",
    monetaryComp: "",
    timeRequired: ""
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });

    console.log(this.state.name);
  };

  render() {
    const { classes } = this.props;

    return (
      <form noValidate autoComplete="on">
        <TextField
          required
          id="outlined-name"
          label="Title"
          className={classes.textField}
          value={this.state.name}
          onChange={this.handleChange("name")}
          margin="normal"
          variant="outlined"
        />
        <br />
        <TextField
          required
          id="outlined-description"
          label="Description"
          multiline
          rows="20"
          value={this.state.Description}
          onChange={this.handleChange("Description")}
          defaultValue={this.state.Description}
          className={classes.textField}
          margin="normal"
          variant="outlined"
        />
        <br />
        <TextField
          id="outlined-extranotes"
          label="Extra Notes"
          multiline
          rowsMax="4"
          className={classes.textField}
          value={this.state.extraNotes}
          onChange={this.handleChange("extraNotes")}
          margin="normal"
          variant="outlined"
        />

        <br />
        <TextField
          id="filled-select-effortlevel"
          select
          label="Effort Level"
          className={classes.textField}
          value={this.state.effortlevel}
          onChange={this.handleChange("effortlevel")}
          SelectProps={{
            MenuProps: {
              className: classes.menu
            }
          }}
          margin="normal"
          variant="filled"
        >
          {level.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <br />
        <TextField
          id="filled-select-commitmentLevel"
          select
          label="commitment Level"
          className={classes.textField}
          value={this.state.commitmentLevel}
          onChange={this.handleChange("commitmentLevel")}
          SelectProps={{
            MenuProps: {
              className: classes.menu
            }
          }}
          margin="normal"
          variant="filled"
        >
          {level.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <br />
        <TextField
          id="outlined-experienceLevel"
          label="experience Level"
          className={classes.textField}
          value={this.state.experienceLevel}
          onChange={this.handleChange("experienceLevel")}
          margin="normal"
          variant="outlined"
        />
        <br />
        <TextField
          id="outlined-timeRequired"
          label="experience Level"
          className={classes.textField}
          value={this.state.timeRequired}
          onChange={this.handleChange("timeRequired")}
          margin="normal"
          variant="outlined"
        />
        <br />
        <TextField
          id="filled-select-currency"
          select
          label="Select"
          className={classes.textField}
          value={this.state.currency}
          onChange={this.handleChange("currency")}
          SelectProps={{
            MenuProps: {
              className: classes.menu
            }
          }}
          helperText="Please select your currency"
          margin="normal"
          variant="filled"
        >
          {currencies.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="outlined-name"
          label="monetaryComp"
          className={classes.textField}
          value={this.state.monetaryComp}
          onChange={this.handleChange("monetaryComp")}
          margin="normal"
          variant="outlined"
        />

        <br />

        <Fab
          variant="extended"
          color="primary"
          aria-label="Add"
          className={classes.margin}
          onClick={this.handleClick}
        >
          <NavigationIcon className={classes.extendedIcon} />
          Submit
        </Fab>
        {/* <Alert >
        This is a success alert — check it out!
        </Alert> */}
      </form>
    );
  }
}

TaskForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TaskForm);
