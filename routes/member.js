const memberModel = require('./../models/member.Model')
const express = require('express')
const router = express.Router()
const validator = require('../validations/memberValidations.js')
const app = express()
const axios = require('axios')
const _ = require('lodash')
let baseURL = process.env.BASEURL || 'http://localhost:3001'

router.get('/cert', (req, res) => {
  if (!req.query.id || !req.query.cert) {
    res.send('id or id of cert is missing')
  }
  axios
    .get(`${baseURL}/api/Member`, {
      params: {
        _id: req.query.id
      }
    })
    .then(response => {
      objid = response.data._id
      //if already taken
      let T = response.data.certification.find(function(value) {
        return value.ref_of_certification == req.query.cert
      })

      if (T) {
        let str = JSON.stringify(T.ref_of_certification)
        res.send('already taken !')
      } else {
        //get certifcate array
        axios
          .get(`${baseURL}/api/certification`, {
            params: {
              id_of_certification: req.query.cert
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
                    req.query.cert,
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
          _.pick(doc, [
            '_id',
            'name',
            'email',
            'calendar',
            'certification',
            'address',
            'birthDate',
            'expiryDate'
          ])
        )
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

router.get('/', (req, res) => {
  if (!req.query.id) {
    return res.status(400).send('id is missing.')
  }
  memberModel
    .findOne({
      _id: req.query.id
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
      document = document.map(doc => {
        doc = JSON.stringify(doc).replace('_id', 'id')
        return JSON.parse(doc)
      })
      if (!document || document.length == 0) {
        return response.status(500).json(document)
      }
      response.setHeader('X-Total-Count', '2')
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
  if (!req.query.id) {
    return res.status(400).send('id is missing.')
  }
  const isValidated = validator.updateValidation(req.body)
  if (isValidated.error)
    return res.status(400).send({ error: isValidated.error.details[0].message })
  memberModel
    .findOneAndUpdate(
      {
        _id: req.query.id
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
  if (!req.query.id) {
    return res.status(400).send('id is mising.')
  }
  memberModel
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

//user stories

router.get('/tasksAvilable', (req, res) => {
  memberModel
    .findOne({
      _id: req.query.id
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
  let id = req.body.id
  let taskId = req.body.id
  if (!id || !taskId) {
    return res.status(400).send('Bad Request')
  }
  axios
    .get(`${baseURL}/api/Member/tasksAvilable`, {
      params: {
        id: id
      }
    })
    .then(tasks => {
      let t = tasks.data.find(function(ele) {
        return taskId == ele._id
      })
      if ((t = !null)) {
        return memberModel
          .findOne({
            _id: id
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
  if (!req.query.id) return res.status(400).send('id is missing')
  if (!req.body.date) return res.status(400).send('Date is missing')
  memberModel
    .findOneAndUpdate(
      {
        _id: req.query.id
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
