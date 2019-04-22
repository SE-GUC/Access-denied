const certification = require('../routes/certification')
const axios = require('axios')
const _ = require('lodash')

let reviewreply = ''

let baseURL = process.env.BASEURL || 'http://localhost:3000'

let id = ''
const createTest = test('create a new certification', async () => {
  const body = {
    name: 'testname2',
    Evaluation_procedure: '5c9fdc26d3b7fb66e4c4f0d9'
  }
  reviewreply = (await axios.post(`${baseURL}/api/certification`, body)).data
  id = reviewreply.id
  expect(_.pick(reviewreply, Object.keys(body))).toEqual(body)
})

const readTest = test('reads a certification', async () => {
  const body = {
    name: 'testname2',
    Evaluation_procedure: '5c9fdc26d3b7fb66e4c4f0d9'
  }
  expect(
    _.pick(
      (await axios.get(`${baseURL}/api/certification?id=${id}`, body)).data,
      ['name']
    )
  ).toEqual({ name: reviewreply.name })
})
const updateTest = test('Updates a certification', async () => {
  const body = {
    name: 'testname2',
    Evaluation_procedure: '5c9fdc26d3b7fb66e4c4f0d9'
  }
  expect(
    _.pick(
      (await axios.put(`${baseURL}/api/certification?id=${id}`, body)).data,
      Object.keys(body)
    )
  ).toEqual(body)
})

const deleteTest = test('Deletes a certification', async () => {
  const body = {
    name: 'testname2',
    Evaluation_procedure: '5c9fdc26d3b7fb66e4c4f0d9'
  }
  expect(
    _.pick(
      (await axios.delete(`${baseURL}/api/certification?id=${id}`)).data,
      Object.keys(body)
    )
  ).toEqual(body)
})

module.exports = {
  readTest,
  createTest,
  updateTest,
  deleteTest
}
