import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import NavigationIcon from '@material-ui/icons/Navigation'
import Fab from '@material-ui/core/Fab'
import { AppConsumer } from '../Containers/AppProvider'
const axios = require('axios')

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
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
    display: 'none'
  },
  root: {
    display: 'flex'
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
})

const currencies = [
  {
    value: 'USD',
    label: '$'
  },
  {
    value: 'EUR',
    label: '€'
  },
  {
    value: 'BTC',
    label: '฿'
  },
  {
    value: 'JPY',
    label: '¥'
  }
]

class newCertificate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick() {
    const data = {
      token: this.state.token,
      name: this.state.name,
      skills: this.state.Skills,
      fees: this.state.Fees
    }
    axios.put('/api/educationalorganisation/newCertification', data)
  }
  state = {
    name: null,
    multiline: null,
    SKills: [null],
    Fees: null,
    currency: null,
    token: null,
    id: null,
    type: null,
    changed: false
  }

  handleChange = name => event => {
    if (name === 'Skills') {
      const skillsArray = event.target.value.split(',')
      console.log(skillsArray)
      this.setState({
        [name]: skillsArray
      })
    } else {
      this.setState({
        [name]: event.target.value
      })
    }
  }

  render() {
    const { classes } = this.props

    return (
      <div>
        <AppConsumer>
          {context => {
            if (this.state.changed) return
            this.setState({
              token: context.token,
              id: context.id,
              type: context.type,
              changed: true
            })
          }}
        </AppConsumer>

        <form noValidate autoComplete="on">
          <TextField
            required
            id="outlined-name"
            label="Title"
            value={this.state.name}
            className={classes.textField}
            onChange={this.handleChange('name')}
            margin="normal"
            variant="outlined"
          />
          <br />
          <TextField
            id="outlined-Skills"
            label="Skills"
            multiline
            rows="4"
            value={this.state.SKills}
            onChange={this.handleChange('Skills')}
            className={classes.textField}
            helperText="Please put skills separated by comma (,)"
            margin="normal"
            variant="outlined"
          />
          <br />
          <TextField
            id="filled-select-Fees"
            select
            label="Select"
            value={this.state.currency}
            className={classes.textField}
            onChange={this.handleChange('currency')}
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
            label="Fees"
            className={classes.textField}
            value={this.state.Fees}
            onChange={this.handleChange('Fees')}
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
      </div>
    )
  }
}

newCertificate.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(newCertificate)
