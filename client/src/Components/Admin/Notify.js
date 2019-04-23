import React from 'react'
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import { handleStartOptimistic } from 'ra-core/esm/sideEffect/unload'

export default () => {
  const handleClick = event => {
    let id = document.getElementById('id').value
    let notification = document.getElementById('notification').value
    fetch(`/api/message/notify?id=${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: notification
      })
    })
      .then(res => res.json())
      .then(data => {})
      .catch(err => console.log(err))
  }
  let users = 0
  const handleStats = e => {
    fetch(`/api/user/all`)
      .then(res => res.json())
      .then(data => {
        users = data.length
        document.getElementById(
          'statsfill'
        ).innerText = `There are currently ${users} users on the site`
      })
      .catch(err => console.log(err))
  }
  return (
    <ul>
      <Card>
        <h2>Notify</h2>
        <form>
          <FormControl margin="normal" required>
            <InputLabel htmlFor="id">User ID:</InputLabel>
            <Input id="id" name="id" autoComplete="id" autoFocus />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="notification">Notification</InputLabel>
            <Input
              id="notification"
              name="notification"
              autoComplete="notification"
              autoFocus
              multiline
              rows="3"
            />
          </FormControl>{' '}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={'btn btn-secondary'}
            onClick={e => handleClick(e)}
          >
            Send Notification
          </Button>
        </form>
      </Card>
      <Card style={{ marginTop: '10%' }}>
        <div class="card-body">
          <h4 class="card-title">Stats</h4>
          <p class="card-text" id="statsfill" />
          <Button class="btn btn-primary" onClick={e => handleStats()}>
            Get Stats
          </Button>{' '}
        </div>
      </Card>
    </ul>
  )
}
