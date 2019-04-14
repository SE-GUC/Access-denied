const skill = require('../routes/skills')
const axios = require('axios')
const _ = require('lodash')

let baseURL = process.env.BASEURL || 'http://localhost:3000'
let reviewreply = ''

const addTest = test('Creates a new skill', async () => {
  const body = {
    name: 'test'
  }
  reviewreply = (await axios.post(`${baseURL}/api/skills`, body)).data
  expect(_.pick(reviewreply, Object.keys(body))).toEqual(body)
})

const deleteTest = test('Deletes a new skill', async () => {
  const body = {
    name: 'test'
  }
  expect(
    _.pick(
      (await axios.delete(`${baseURL}/api/skills?id=${reviewreply._id}`)).data,
      Object.keys(body)
    )
  ).toEqual(body)
})

module.exports = {
  addTest,
  deleteTest
}
