const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
let baseURL = process.env.BASEURL || 'http://localhost:3001'
const axios = require('axios')

Object.defineProperty(Array.prototype, 'flat', {
  value: function(depth = 1) {
    return this.reduce(function(flat, toFlatten) {
      return flat.concat(
        Array.isArray(toFlatten) && depth - 1
          ? toFlatten.flat(depth - 1)
          : toFlatten
      )
    }, [])
  }
})

const searchNames = list => {
  let models = []
  models.push(mongoose.models.Certification)
  models.push(mongoose.models.Task)
  models.push(mongoose.models.Members)
  regex = list.map(e => new RegExp(e, 'i'))
  return Promise.all(
    models.map(model =>
      model
        .find({
          name: {
            $in: regex
          }
        })
        .select('name')
    )
  )
}

function searcht(tags, alltasks) {
  let tasks = []
  tags.forEach(function(tag) {
    alltasks.forEach(function(task) {
      task.Tags.forEach(function(key) {
        let j = tasks.find(function(ele) {
          return task == ele
        })
        if (tag == key && j == null) {
          tasks.push(task)
        }
      })
    })
  })
  return tasks
}
router.get('/', (req, res) => {
  
  let resolved = false
  if (!req.query.q) {
    return res.status(400).send('Query is Missing')
  }
  let splitted = req.query.q.split(' ')
  let result = []
  searchNames([req.query.q])
    .then(doc => {
      if (splitted.length < 2) {
        resolved = true
        return res.json(doc.flat(Infinity))
      }
      result = doc
      return searchNames(splitted)
    })
    .then(docs => {
      if (!docs) {
        return res.status(400).send('Bad Request')
      }
      if (!resolved) {
        result = result.concat(docs)
        res.json(result.flat(Infinity))
      }
    })
    .catch(err => {console.log(err)
    res.status(500).json(err)})
})
router.get('/sk', (req, res) => {
  //how the array of skills will come , may need to stringfy the array
  let skills = req.query.skills
  if (!skills) {
    return res.status(400).status('400: no skills is provided')
  }
  axios
    .get(`${baseURL}/api/task/filterTasks`, {
      params: {
        skills: skills
      }
    })
    .then(response => {
      return res.send(response.data)
    })

    .catch(error => {
      return res.status(500).send(error.response.data)
    })
})

router.get('/filteredbyt', (req, res) => {
  //will get the tags like normal array
  let q = req.query.tags
  console.log(JSON.stringify(q))

  let tags = JSON.parse(q)
console.log(tags)
  if (!tags) {
    return res.status(400).status('400: no criteria has been specified')
  }

  axios
    .get(`${baseURL}/api/task/all`)

    .then(alltasks => {
      let result = searcht(tags, alltasks.data)
      return res.json(result)
    })
    .catch(error => {
      console.log(error)
      return res.send(error)
    })
})

router.get('/filteredbycert', (req, res) => {
  //will get the tags like normal array
  let q = req.query.tags
  console.log(JSON.stringify(q))

  let tags = JSON.parse(q)
console.log(tags)
  if (!tags) {
    return res.status(400).status('400: no criteria has been specified')
  }

  axios
    .get(`${baseURL}/api/certification/all`)

    .then(allcert => {
      let result = searcht(tags, allcert.data)
      return res.json(result)
    })
    .catch(error => {
      console.log(error)
      return res.send(error)
    })
})

router.get('/filteredbym', (req, res) => {
  //will get the tags like normal array
  let q = req.query.tags
  console.log(JSON.stringify(q))

  let tags = JSON.parse(q)
console.log(tags)
  if (!tags) {
    return res.status(400).status('400: no criteria has been specified')
  }

  axios
    .get(`${baseURL}/api/Member/all`)

    .then(allmembers => {
      let result = searcht(tags, allmembers.data)
      return res.json(result)
    })
    .catch(error => {
      console.log(error)
      return res.send(error)
    })
})
module.exports = router
