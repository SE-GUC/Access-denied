const ScheduleModel = require('../models/Schedule.model')
const express = require('express')
const router = express.Router()
const validator = require('../validations/scheduleValidations')

router.post('/', (req, res) => {
  if (!req || !req.body) {
    return res.status(400).send('Body is Missing')
  }
  let model = new ScheduleModel(req.body)
  model
    .save()
    .then(doc => {
      if (!doc || doc.length === 0) {
        return res.status(500).send(doc)
      }
      res.status(201).send(doc)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

router.post('/:id/slot', (req, res) => {
  if (!req || !req.body) {
    return res.status(400).send('Body is Missing')
  }
  if (!req.params.id) return res.status(400).send('Schedule Id is Missing')
  const isValidated = validator.createValidation(req.body)
  if (isValidated.error)
    return res.status(400).send({
      error: isValidated.error.details[0].message
    })

  let slot = {
    from: req.body.from,
    to: req.body.to,
    available: req.body.available
  }
  if (req.body.assignedTo) {
    slot.assignedTo = req.body.assignedTo
  }
  ScheduleModel.findByIdAndUpdate(
    req.params.id,
    {
      $push: {
        [req.body.day]: slot
      }
    },
    {
      safe: true,
      upsert: true
    },
    function(err, doc) {
      if (err) {
        return res.status(500).json(err)
      } else {
        ScheduleModel.findById(req.params.id)
          .then(doc => {
            if (!doc || doc.length === 0) {
              return res.status(500).send(doc)
            }
            res.status(200).send(doc)
          })
          .catch(err => {
            res.status(500).json(err)
          })
      }
    }
  )
})

router.get('/:id', (req, res) => {
  if (!req || !req.params.id) {
    res.status(400).send('Body Is Missing')
  }
  ScheduleModel.findById(req.params.id)
    .then(doc => {
      if (!doc || doc.length === 0) {
        return res.status(500).send(doc)
      }
      res.status(200).send(doc)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

router.get('/all', (req, res) => {
  ScheduleModel.find({})
    .then(document => {
      if (!document || document.length === 0) {
        return res.status(500).json(document)
      }

      res.status(200).json(document)
    })
    .catch(error => {
      res.status(500).json(error)
    })
})

router.get('/:id/slot', (req, res) => {
  if (!req.params.id) return res.status(400).send('Schedule Id is Missing')
  if (!req.query.id) return res.status(400).send('Slot Id Is Missing')
  let schedule = req.params.id
  ScheduleModel.findById(schedule).then(doc => {
    if (!doc || doc.length === 0) {
      return res.status(500).send(doc)
    }
    var slot = doc.Saturday.find(slot => {
      return slot._id == req.query.id
    })
    if (!(!slot || slot.length === 0)) {
      return res.status(200).send(slot)
    }
    var slot = doc.Sunday.find(slot => {
      return slot._id == req.query.id
    })
    if (!(!slot || slot.length === 0)) {
      return res.status(200).send(slot)
    }
    var slot = doc.Monday.find(slot => {
      return slot._id == req.query.id
    })
    if (!(!slot || slot.length === 0)) {
      return res.status(200).send(slot)
    }
    var slot = doc.Tuesday.find(slot => {
      return slot._id == req.query.id
    })
    if (!(!slot || slot.length === 0)) {
      return res.status(200).send(slot)
    }
    var slot = doc.Wednesday.find(slot => {
      return slot._id == req.query.id
    })
    if (!(!slot || slot.length === 0)) {
      return res.status(200).send(slot)
    }
    var slot = doc.Thursday.find(slot => {
      return slot._id == req.query.id
    })
    if (!(!slot || slot.length === 0)) {
      return res.status(200).send(slot)
    }
    var slot = doc.Friday.find(slot => {
      return slot._id == req.query.id
    })
    if (!(!slot || slot.length === 0)) {
      return res.status(200).send(slot)
    }
    return res.status(404).send('Slot not found')
  })
})
router.put('/:id/slot', (req, res) => {
  if (!req || !req.body) {
    return res.status(400).send('Body is Missing')
  }
  if (!req.params.id) return res.status(400).send('Schedule Id is Missing')
  if (!req.query.id) return res.status(400).send('Slot Id Is Missing')
  const isValidated = validator.updateValidation(req.body)
  if (isValidated.error)
    return res.status(400).send({
      error: isValidated.error.details[0].message
    })
  let slot = {
    _id: req.query.id,
    from: req.body.from,
    to: req.body.to,
    available: req.body.available
  }
  if (req.body.assignedTo) {
    slot.assignedTo = req.body.assignedTo
  }
  //Delete the old Slot
  ScheduleModel.findByIdAndUpdate(
    req.params.id,
    {
      $pull: {
        [req.body.day]: {
          _id: req.query.id
        }
      }
    },
    {
      safe: true,
      upsert: true
    },
    function(err, doc) {
      if (err) {
        return res.status(500).json(err)
      } else {
        ScheduleModel.findByIdAndUpdate(
          req.params.id,
          {
            $push: {
              [req.body.day]: slot
            }
          },
          {
            safe: true,
            upsert: true
          },
          function(err, doc) {
            if (err) {
              return res.status(500).json(err)
            } else {
              console.log(doc)
              ScheduleModel.findById(req.params.id)
                .then(doc => {
                  if (!doc || doc.length === 0) {
                    return res.status(500).send(doc)
                  }
                  res.status(200).send(doc)
                })
                .catch(err => {
                  return res.status(500).json(err)
                })
            }
          }
        )
      }
    }
  )
})
router.delete('/:id/slot', (req, res) => {
  if (!req || !req.body) {
    return res.status(400).send('Body is Missing')
  }
  if (!req.params.id) return res.status(400).send('Schedule Id is Missing')
  if (!req.query.id) return res.status(400).send('Slot Id Is Missing')
  if (!req.body.day) return res.status(400).send('Day Is Missing')
  ScheduleModel.findByIdAndUpdate(
    req.params.id,
    {
      $pull: {
        [req.body.day]: {
          _id: req.query.id
        }
      }
    },
    {
      safe: true,
      upsert: true
    },
    function(err, doc) {
      if (err) {
        return res.status(500).json(err)
      } else {
        ScheduleModel.findById(req.params.id)
          .then(doc => {
            if (!doc || doc.length === 0) {
              return res.status(500).send(doc)
            }
            res.status(200).send(doc)
          })
          .catch(err => {
            res.status(500).json(err)
          })
      }
    }
  )
})

router.delete('/:id', (req, res) => {
  if (!req || !req.body) {
    res.status(400).send('Body Is Missing')
  }
  if (!req.params.id) return res.status(400).send('Schedule Id is Missing')
  ScheduleModel.findByIdAndDelete(req.params.id)
    .then(doc => {
      if (!doc || doc.length === 0) {
        return res.status(500).send(doc)
      }
      res.status(200).send(doc)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

module.exports = router
