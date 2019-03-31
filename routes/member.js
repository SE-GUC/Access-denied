const memberModel = require('./../models/member.Model')
const express = require('express')
const router = express.Router()
const validator = require('../validations/memberValidations.js')
const app = express()
const axios = require('axios')
let baseURL = process.env.BASEURL || 'http://localhost:3000'

router.get('/cert', (req, res) => {
  console.log(req.query.email)
  axios
    .get(`${baseURL}/api/Member`, {
      params: {
        email: req.query.email
      }
    })
    .then(response => {
      objid = response.data._id
      console.log(response.data._id)
      //get certifcate array
      axios
        .get(`${baseURL}/api/certification`, {
          params: {
            id_of_certification: req.query.id
          }
        })
        .then(response => {
          let memberModel = response.data[0].membersapplied
          // res.json(memberModel)
          let j = memberModel.find(function(value) {
            return value.MEMBERS == objid
          })

          if (j == null) {
            //res.send("already applied")
            memberModel.push({
              MEMBERS: objid,
              finished: 'false'
            })
          }

          //   res.json(memberModel)
          console.log(response.data)
          console.log(memberModel.tostring)
          //update certifcate array

          axios
            .put(
              `${baseURL}/api/certification?id_of_certification=` +
                req.query.id,
              {
                membersapplied: memberModel
              }
            )
            .then(function(response) {
              console.log('saved successfully')
              console.log(response.data)
              res.send(response.data)
            })
        })
        .catch(error => {
          console.log(error)
        })
    })
    .catch(error => {
      console.log(error)
    })
})

router.post('/', (req, res) => {
  console.log('ok')
  if (!req.body) {
    return res.status(400).send('Body is missing')
  }
  const isValidated = validator.createValidation(req.body)
  if (isValidated.error) {
    return res.status(400).send({ error: isValidated.error.details[0].message })
  }
  let model = new memberModel(req.body)
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

router.get('/', (req, res) => {
  if (!req.query.email) {
    return res.status(400).send('Email is missing.')
  }
  memberModel
    .findOne({
      email: req.query.email
    })
    .select('-password')
    .then(doc => {
      res.json(doc)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})
router.get('/all', (_request, response) => {
  let key = {}

  memberModel
    .find(key)
    .select('-password')
    .then(document => {
      if (!document || document.length == 0) {
        return response.status(500).json(document)
      }

      response.status(200).json(document)
    })
    .catch(error => {
      response.status(500).json(error)
    })
})

router.put('/', (req, res) => {
  if (!req.query.email) {
    return res.status(400).send('Email is missing.')
  }
  const isValidated = validator.updateValidation(req.body)
  if (isValidated.error)
    return res.status(400).send({ error: isValidated.error.details[0].message })
  memberModel
    .findOneAndUpdate(
      {
        email: req.query.email
      },
      req.body,
      {
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

router.delete('/', (req, res) => {
  if (!req.query.email) {
    return res.status(400).send('Email is mising.')
  }
  memberModel
    .findOneAndDelete({
      email: req.query.email
    })
    .then(doc => {
      res.json(doc)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

//user stories

router.get('/tasksAvilable', (req, res) => {
  axios
    .get(`${baseURL}/api/Member`, {
      params: {
        email: req.query.email
      }
    })
    .then(member => {
      let id = member.data._id
      let Certification = member.data.certification
      let save = []
      Certification.forEach(function(element) {
        save = element.skills + ',' + save
      })
      let skills = {
        skills: save
      }
      axios
        .get(`${baseURL}/api/task/filterTasks`, {
          params: {
            skills: skills
          }
        })

        .then(tasks => {
          let returned = {
            id: id,
            tasks: tasks.data
          }

          res.json(returned)
        })
    })
})
router.get('/applyonTask', (request, response) => {
  let email = request.query.email
  let taskemail = request.query.contactEmail
  axios
    .get(`${baseURL}/api/Member/tasksAvilable`, {
      params: {
        email: email
      }
    })
    .then(tasks => {
      axios
        .get(`${baseURL}/api/task`, {
          params: {
            contactEmail: taskemail
          }
        })
        .then(thetask => {
          //   response.json(tasks.data.id)
          tasks.data.tasks.forEach(function(atask) {
            if (atask.title == thetask.data.title) {
              axios
                .put(`${baseURL}/api/task?contactEmail=` + taskemail, {
                  assignee: tasks.data.id
                })
                .then(p => {
                  response.json(p.data)
                })
            }
          })
        })
    })
})

router.post("/reviewPartner", (req, res) => {
  if (!req.body) {
    return res.status(400).send("Body is missing");
  }
  axios
    .post(`${baseURL}/api/review/newPost`, {
      reviewer: req.body.reviewer,
      reviewee: req.body.reviewee,
      rating: req.body.rating,
      review: req.body.review,
      revieweeModel: "Partners",
      reviewerModel: "Members",
      task: req.body.task
    })
    .then(doc => {
      if (!doc || doc.data.length === 0) {
        return res.send("Your review can not be posted");
      }
      res.status(201).json(doc.data);
    })
    .catch(err => {
      res.send("Error occured");
    });
});

router.post('/adddate', (req, res) => {
  if (!req.query.email) return res.status(400).send('Email is missing')
  if (!req.body.date) return res.status(400).send('Date is missing')
  memberModel
    .findOneAndUpdate(
      {
        email: req.query.email
      },
      {
        $push: { calendar: req.body.date }
      },
      {
        new: true,
        safe: true,
        upsert: true
      }
    )
    .then(doc => {
      if (!doc || doc.length === 0) return res.status(500).send('Error')
      res.json(doc)
    })
    .catch(err => {
      return res.status(500).json(err)
    })
})


module.exports = router
