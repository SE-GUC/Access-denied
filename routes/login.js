const express = require('express')
const router = express.Router()
const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const _ = require('lodash')

router.post('/', (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send('Incorrect data')
  }
  User.findOne({
    email: req.body.email
  })

    .then(doc => {
      doc.comparePassword(req.body.password, (err, response) => {
        if (response) {
          let pl = jwt.sign(
            _.pick(doc, ['email', 'profile', 'type']),
            process.env.KEY,
            {
              expiresIn: '24h'
            }
          )
          return res.json(pl)
        }
        if (response === false)
          return res.status(400).json('Incorrect Password')
      })
    })
    .catch(err => res.status(400).send('err'))
})
router.get('/', (req, res) => {
  let verify = req.app.get('verifyToken')
  let ver = verify(req.query.token)
  if (ver) res.json(ver)
  else res.json('Error')
})

module.exports = router
