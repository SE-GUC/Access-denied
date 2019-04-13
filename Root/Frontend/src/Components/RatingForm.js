import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import StarRatingComponent from "react-star-rating-component";

function RatingForm(props) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Rating
      </Typography>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <div style={{ fontSize: 35 }}>
            <StarRatingComponent
              name="rate"
              emptyStarColor={"grey"}
              starCount={5}
              value={props.value}
              onStarClick={props.onStarClick}
            />
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default RatingForm;
