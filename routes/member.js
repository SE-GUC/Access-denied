const memberModel = require('./../models/member.Model')
const express = require('express')
const router = express.Router()
const validator = require('../validations/memberValidations.js')
const app = express()
const axios = require('axios')
const _ = require('lodash')
let baseURL = process.env.BASEURL || 'http://localhost:3001'

router.get('/cert', (req, res) => {
  if (!req.query.email || !req.query.id) {
    res.send('email or id of cert is missing')
  }
  axios
    .get(`${baseURL}/api/Member`, {
      params: {
        email: req.query.email
      }
    })
    .then(response => {
      objid = response.data._id
      //if already taken
      let T = response.data.certification.find(function(value) {
        return value.ref_of_certification == req.query.id
      })

      if (T) {
        let str = JSON.stringify(T.ref_of_certification)
        res.send('already taken !')
      } else {
        //get certifcate array
        axios
          .get(`${baseURL}/api/certification`, {
            params: {
              id_of_certification: req.query.id
            }
          })
          .then(response => {
            let memberModel = response.data[0].membersapplied
            let membermodelacc = response.data[0].membersaccepted
            let allmembers = memberModel.concat(membermodelacc)
            // res.json(memberModel)
            let j = allmembers.find(function(value) {
              return value.MEMBERS == objid
            })
            if (j == null) {
              //res.send("already applied")
              memberModel.push({
                MEMBERS: objid
              })
              axios
                .put(
                  `${baseURL}/api/certification?id_of_certification=` +
                    req.query.id,
                  {
                    membersapplied: memberModel
                  }
                )
                .then(function(response) {
                  res.send(response.data)
                })
            } else {
              res.send('already applied for certifacte !')
              const f = 'true'
            }

            //   res.json(memberModel)
            //update certifcate array
          })
          .catch(error => {
            console.log(error)
          })
      }
    })
    .catch(error => {
      console.log(error)
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
router.post('/', (req, res) => {
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
      res
        .status(201)
        .send(
          _.pick(doc, ['_id', 'name', 'email', 'calendar', 'certification'])
        )
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

      response.json(document)
    })
    .catch(error => {
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
  memberModel
    .findOne({
      email: req.query.email
    })
    .then(member => {
      let Certification = member.certification
      let save = []
      Certification.forEach(function(element) {
        save = element.skills + ',' + save
      })
      let skills = {
        skills: save
      }
      return axios
        .get(`${baseURL}/api/task/filterTasks`, {
          params: {
            skills: skills
          }
        })

        .then(tasks => {
          res.json(tasks.data)
        })
    })
    .catch(err => {
      res.status(500).send(err.response.data)
    })
})
router.post('/applyonTask', (req, res) => {
  let email = req.body.email
  let taskId = req.body.id
  if (!email || !taskId) {
    return res.status(400).send('Bad Request')
  }
  axios
    .get(`${baseURL}/api/Member/tasksAvilable`, {
      params: {
        email: email
      }
    })
    .then(tasks => {
      let t = tasks.data.find(function(ele) {
        return taskId == ele._id
      })
      if ((t = !null)) {
        return memberModel
          .findOne({
            email: email
          })
          .then(member => {
            let memberId = member._id
            return axios
              .post(`${baseURL}/api/application`, {
                task: taskId,
                applier: memberId,
                details: req.body.details,
                applierModel: 'Members'
              })
              .then(response => {
                let doc = response.data
                if (!doc || doc.length === 0) return res.status(500).send(doc)
                return res.send(doc)
              })
              .catch(err => {
                console.log(err.response.data)

                return res.send(err.response.data)
              })
          })
      }
    })
    .catch(err => {
      res.status(500).send(err.response.data)
    })
})

router.post('/reviewPartner', (req, res) => {
  if (!req.body) {
    return res.status(400).send('Body is missing')
  }
  axios
    .post(`${baseURL}/api/review/newPost`, {
      reviewer: req.body.reviewer,
      reviewee: req.body.reviewee,
      rating: req.body.rating,
      review: req.body.review,
      revieweeModel: 'Partners',
      reviewerModel: 'Members',
      task: req.body.task
    })
    .then(doc => {
      if (!doc || doc.data.length === 0) {
        return res.send('Your review can not be posted')
      }
      res.status(201).json(doc.data)
    })
    .catch(err => {
      res.send('Error occured')
    })
})

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
