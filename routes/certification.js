'use strict'
const certificationModel = require('../models/certification.model')
const express = require('express')
const router = express.Router()
const validator = require('../validations/certificationValidations.js')
const axios = require('axios')
let baseURL = process.env.BASEURL || 'http://localhost:3000'

//TODO:check if its admin or not aka {request.query.token_id}
//if it's admin it will do its job
//if not it will make post request to this API
//sample code : if(request.query.token_id!=admin_token)
//axios.post(
// `http://localhost:3001/api/?token_id=${request.query.token_id}`,         //ref partner, members , users of the system
// {

//     route:`api/task`,
//     body: request.body,
//     type: "POST"},
//  )
// .then(q=>{
//   console.log(q.data)

//   response.send(q.data)
// })
// .catch(e=>{
//   response.send(e)
// })
// ) else "the rest of the code"
router.post('/', (req, res) => {
  if (!req.body) {
    return res.status(400).send('Body is missing')
  }
  // const isValidated = validator.createValidation(req.body)
  // if (isValidated.error)
  //   return res.status(400).send({ error: isValidated.error.details[0].message })
  // let model = new certificationModel(req.body)
  certificationModel
    .create(req.body)
    .then(doc => {
      console.log(doc)
      if (!doc || doc.length === 0) {
        return res.status(500).send(doc)
      }

      res.json(doc)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

router.get('/all', (request, response) => {
  let key = {}
  if (request.query.filter) {
    key = JSON.parse(request.query.filter)
    var searchKey = new RegExp(key.name, 'i')
    key.name = { $in: searchKey }
  }
  certificationModel
    .find(key)
    .populate('schedule')
    .populate('eduorganization')
    .then(document => {
      if (!document || document.length == 0) {
        return response.status(500).json(document)
      }
      response.json(document)
    })
    .catch(error => {
      console.log(error)
      response.status(500).json(error)
    })
})
//TODO:check if its admin or not aka {request.query.token_id}
//if it's admin it will do its job
//if not it will make post request to this API
//sample code : if(request.query.token_id!=admin_token)
//axios.post(
// `http://localhost:3001/api/?token_id=${request.query.token_id}`,         //ref partner, members , users of the system
// {

//     route:`api/task`,
//     body: request.body,
//     type: "POST"},
//  )
// .then(q=>{
//   console.log(q.data)

//   response.send(q.data)
// })
// .catch(e=>{
//   response.send(e)
// })
// ) else "the rest of the code"
router.put('/', (req, res) => {
  if (!req.query.id) {
    return res.status(400).send('id of certification is missing.')
  }
  const isValidated = validator.updateValidation(req.body)
  if (isValidated.error)
    return res.status(400).send({ error: isValidated.error.details[0].message })
  certificationModel
    .findOneAndUpdate(
      {
        _id: req.query.id
      },
      req.body,
      {
        new: true,
        useFindAndModify: false
      }
    )
    .then(doc => {
      res.json(doc)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

router.delete('/', (req, res) => {
  if (!req.query.id) {
    return res.status(400).send('id is missing.')
  }
  certificationModel
    .findOneAndDelete({
      _id: req.query.id
    })
    .then(doc => {
      res.json(doc)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

router.get('/', (req, res) => {
  if (!req.query.id) {
    return res.status(400).send('id of certification is missing.')
  }
  certificationModel
    .findById(req.query.id)

    .populate('schedule')
    .populate('eduorganization')
    .populate('membersapplied', 'name')

    .then(doc => {
      res.json(doc)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

router.post('/offlineEvaluation/', (req, res) => {
  if (!req || !req.body) {
    return res.status(400).send('Body is Missing')
  }
  if (!req.query.id) {
    return res.status(400).send('Certificate id is Missing')
  }
  axios
    .post(`${baseURL}/api/schedule`, {})
    .then(response => {
      let schedule = response.data._id
      req.body.schedule = schedule
      return certificationModel.findByIdAndUpdate(req.query.id, {
        schedule: response.data._id
      })
    })
    .then(doc => {
      if (!doc || doc.length === 0) {
        return res.status(500).send(doc)
      }
      res.status(201).send(doc)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
})

router.post('/schedule', (req, res) => {
  if (!req || !req.body) {
    return res.status(400).send('Body Is Missing')
  }
  if (!req.query.id) return res.status(400).send('Certificate Id Is Missing')
  let id = req.query.id
  certificationModel
    .findById(id)
    .then(doc => {
      if (!doc || doc.length === 0) {
        return res.status(500).send(doc)
      }
      let scheduleId = doc.schedule
      res.redirect(307, `../schedule/${scheduleId}/slot`)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

router.get('/schedule', (req, res) => {
  if (!req || !req.body) {
    return res.status(400).send('Body Is Missing')
  }
  if (!req.query.id) return res.status(400).send('Certificate Id Is Missing')
  let id = req.query.id
  certificationModel
    .findById(id)
    .then(doc => {
      if (!doc || doc.length === 0) {
        return res.status(500).send(doc)
      }
      let scheduleId = doc.schedule
      if (!req.query.slot) {
        res.redirect(307, `../schedule/${scheduleId}`)
      } else {
        res.redirect(307, `../schedule/${scheduleId}/slot?id=${req.query.slot}`)
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

router.put('/schedule', (req, res) => {
  if (!req || !req.body) {
    return res.status(400).send('Body Is Missing')
  }
  if (!req.query.id) return res.status(400).send('Certificate Id Is Missing')
  if (!req.query.slot) return res.status(400).send('Slot Id Is Missing')
  let id = req.query.id
  certificationModel
    .findById(id)
    .then(doc => {
      if (!doc || doc.length === 0) {
        return res.status(500).send(doc)
      }
      let scheduleId = doc.schedule
      res.redirect(307, `../schedule/${scheduleId}/slot?id=${req.query.slot}`)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})
router.delete('/schedule', (req, res) => {
  if (!req || !req.body) {
    return res.status(400).send('Body Is Missing')
  }
  if (!req.query.id) return res.status(400).send('Certificate Id Is Missing')
  if (!req.query.slot) return res.status(400).send('Slot Id Is Missing')
  let id = req.query.id
  certificationModel
    .findById(id)
    .then(doc => {
      if (!doc || doc.length === 0) {
        return res.status(500).send(doc)
      }
      let scheduleId = doc.schedule
      res.redirect(307, `../schedule/${scheduleId}/slot?id=${req.query.slot}`)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

router.post('/apply', (req, res) => {
  if (!req || !req.query.id || !req.body.token) {
    return res.status(400).send('Body is Missing')
  }

  let verify = req.app.get('verifyToken')
  let ver = verify(req.body.token)
  if (!ver) return res.status(500).send('Error')
  let id = ver.profile

  certificationModel
    .findOneAndUpdate(
      { _id: req.query.id },
      {
        $push: {
          membersapplied: id
        }
      },
      {
        safe: true,
        upsert: true,
        new: true
      }
    )
    .then(doc => {
      res.json(doc)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

router.put('/chooseApplicant', (req, res) => {
  if (!req.query.id) {
    return res.status(400).send('Certification id is missing.')
  }
  const isValidated = validator.updateValidation(req.body)
  if (isValidated.error) {
    console.log('errorhere')
    return res.send()
  }

  let key = {
    _id: req.query.id
  }

  certificationModel
    .find(key)
    .then(document => {
      if (!document || document.length == 0) {
        console.log('error1')
        return res.send()
      }
      let s = document[0].membersapplied
      let result = s.find(function(element) {
        console.log(element._id)
        return element._id == req.body.membersapplied
      })
      if (result != null) {
        let memberID = req.body.membersapplied
        console.log(memberID)
        certificationModel
          .findOneAndUpdate(
            {
              _id: req.query.id
            },
            certificationModel.update(
              { _id: 'req.query.id' },
              {
                $push: {
                  membersaccepted: memberID
                },
                $pull: {
                  membersapplied: memberID
                }
              }
            ),
            {
              new: true
            }
          )
          .populate('Evaluation_procedure')
          .then(doc => {
            axios.post(`${baseURL}/api/message/notify?id=${memberID}`, {
              message: doc.Evaluation_procedure
            })
            res.status(201).send(doc)
          })
          .catch(err => {
            console.log('err')
            res.send()
          })
      } else {
        console.log('notfound')
        res.send()
      }
    })
    .catch(err => {
      console.log('errfinal')
      res.send()
    })
})
router.get('/applied', (req, res) => {
  if (!req || !req.query.id) {
    return res.status(400).send('Bad request')
  }

  certificationModel.find({ membersapplied: req.query.id }).then(doc => {
    res.json(doc)
  })
})
module.exports = router
