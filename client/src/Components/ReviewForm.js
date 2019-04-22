import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'

function ReviewForm() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Write about your experience
      </Typography>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <TextField
            required
            id="review"
            name="Review"
            label="Review"
            fullWidth
            autoComplete="review"
            multiline={true}
            rows={10}
            rowsMax={4}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default ReviewForm
