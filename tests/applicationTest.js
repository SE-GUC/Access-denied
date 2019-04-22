const coworking = require('../routes/coworkingspace')
const axios = require('axios')
const _ = require('lodash')

let baseURL = process.env.BASEURL || 'http://localhost:3000'

let id = ''
const body = {
  task: '5c9494d3f0c6c02014be6b5f',
  applier: '5c9494d3f0c6c02014be6b5f',
  details: 'Jesting just for testing',
  applierModel: 'Members'
}

const createTest = test('Creates a new Application', async () => {
  let datas = (await axios.post(`${baseURL}/api/application`, body)).data
  id = datas._id
  expect(_.pick(datas, Object.keys(body))).toEqual(body)
})

const readTest = test('Reads an existing Application', async () => {
  expect(
    _.pick((await axios.get(`${baseURL}/api/application?id=${id}`)).data, [
      'details'
    ])
  ).toEqual({ details: body.details })
})

const updateTest = test('Updates an existing Application', async () => {
  body.details = 'jesting minimum'
  expect(
    _.pick(
      (await axios.put(`${baseURL}/api/application?id=${id}`, body)).data,
      ['details']
    )
  ).toEqual({ details: body.details })
})

const deleteTest = test('Deletes an existing Application', async () => {
  expect(
    _.pick((await axios.delete(`${baseURL}/api/application?id=${id}`)).data, [
      'details'
    ])
  ).toEqual({ details: body.details })
})

module.exports = {
  createTest,
  readTest,
  updateTest,
  deleteTest
}
