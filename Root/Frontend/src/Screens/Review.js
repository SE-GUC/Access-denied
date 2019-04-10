import React from "react";
import qs from "query-string";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ReviewForm from "../Components/ReviewForm";
import RatingForm from "../Components/RatingForm";

const styles = theme => ({
  appBar: {
    position: "relative"
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3
    }
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit
  }
});

const steps = ["Review", "Rating"];

class Checkout extends React.Component {
  state = {
    activeStep: 0,
    review: "",
    rating: 0
  };

  getStepContent(step) {
    switch (step) {
      case 0:
        return <ReviewForm />;
      case 1:
        return (
          <RatingForm
            onStarClick={this.handleStarClick}
            value={this.state.rating}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  }
  handleFinish = () => {
    let reviewer = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true
    }).reviewer;
    let reviewee = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true
    }).reviewee;
    let task = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true
    }).task;
    fetch(
      this.props.type === "member"
        ? "/api/review/newPost"
        : "/api/review/partnerReview",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          reviewer: reviewer,
          reviewee: reviewee,
          task: task,
          review: this.state.review,
          rating: this.state.rating,
          reviewerModel: this.props.type === "member" ? "Members" : "Partners",
          revieweeModel: this.props.type === "member" ? "Partners" : "Members"
        })
      }
    )
      .then(res => {
        console.log(res);
        return res.json();
      })
      .then(data =>
        this.setState(state => ({
          activeStep: state.activeStep + 1
        }))
      )
      .catch(err => console.log(err));
  };

  handleStarClick = nextValue => {
    this.setState(state => ({
      rating: nextValue
    }));
  };
  handleNext = () => {
    let value = document.getElementById("review").value;
    this.setState(state => ({
      activeStep: state.activeStep + 1,
      review: value
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0
    });
  };

  render() {
    const { classes } = this.props;
    const { activeStep } = this.state;

    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              Review
            </Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography variant="h5" gutterBottom>
                    Thank you for your review.
                  </Typography>
                  <Typography variant="subtitle1">
                    Reviews like yours are what make LirtenHub a great place..
                  </Typography>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {this.getStepContent(activeStep)}
                  <div className={classes.buttons}>
                    {activeStep !== 0 && (
                      <Button
                        onClick={this.handleBack}
                        className={classes.button}
                      >
                        Back
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={
                        activeStep === 0 ? this.handleNext : this.handleFinish
                      }
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1
                        ? "Publish Review"
                        : "Next"}
                    </Button>
                  </div>
                </React.Fragment>
              )}
            </React.Fragment>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

Checkout.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Checkout);
