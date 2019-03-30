const coworking = require('../routes/coworkingspace')
const axios = require('axios')
const _ = require('lodash')

var baseURL = process.env.BASEURL || 'http://localhost:3000'

const testingEmail = 'Jtesting@Jest.Jesting'
const body = {
  name: 'Jesting',
  email: testingEmail,
  phoneNumber: '010101010101010',
  description: 'Jesting',
  noOfRooms: 10
}

const createTest = test('Creates a new Co-working Space', async () => {
  expect(
    _.pick(
      (await axios.post(`${baseURL}/api/coworking`, body)).data,
      Object.keys(body)
    )
  ).toEqual(body)
})

const readTest = test('Reads an existing Co-working Space', async () => {
  expect(
    _.pick(
      (await axios.get(`${baseURL}/api/coworking?email=${testingEmail}`)).data,
      Object.keys(body)
    )
  ).toEqual(body)
})

const updateTest = test('Updates an existing Co-working Space', async () => {
  body.name = 'jest'
  expect(
    _.pick(
      (await axios.put(`${baseURL}/api/coworking?email=${testingEmail}`, body))
        .data,
      Object.keys(body)
    )
  ).toEqual(body)
})

const deleteTest = test('Deletes an existing Co-working Space', async () => {
  expect(
    _.pick(
      (await axios.delete(`${baseURL}/api/coworking?email=${testingEmail}`))
        .data,
      Object.keys(body)
    )
  ).toEqual(body)
})

module.exports = {
  createTest,
  readTest,
  updateTest,
  deleteTest
}
