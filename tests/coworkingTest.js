const coworking = require('../routes/coworkingspace')
const axios = require('axios')
const _ = require('lodash')

let baseURL = process.env.BASEURL || 'http://localhost:3000'

let id = ''
const body = {
  name: 'Jesting',
  phoneNumber: '010101010101010',
  description: 'Jesting',
  noOfRooms: 10,
  address: { city: 'jestsd', street: 'jestsae', area: 'jest' }
}

const createTest = test('Creates a new Co-working Space', async () => {
  let data = (await axios.post(`${baseURL}/api/coworking`, body)).data
  id = data._id
  expect(_.pick(data, Object.keys(body))).toEqual(body)
})

const readTest = test('Reads an existing Co-working Space', async () => {
  expect(
    _.pick(
      (await axios.get(`${baseURL}/api/coworking?id=${id}`)).data,
      Object.keys(body)
    )
  ).toEqual(body)
})

const updateTest = test('Updates an existing Co-working Space', async () => {
  body.name = 'jest'
  expect(
    _.pick(
      (await axios.put(`${baseURL}/api/coworking?id=${id}`, body)).data,
      Object.keys(body)
    )
  ).toEqual(body)
})

const deleteTest = test('Deletes an existing Co-working Space', async () => {
  expect(
    _.pick(
      (await axios.delete(`${baseURL}/api/coworking?id=${id}`)).data,
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
