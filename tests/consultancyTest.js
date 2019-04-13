const consultancy = require('../routes/consultancy')
const axios = require('axios')
const _ = require('lodash')

let baseURL = process.env.BASEURL || 'http://localhost:3000'
let id = ''
const addTest = test('Creates a new Consultancy', async () => {
  const body = {
    name: 'fdssfdt',
    phoneNumber: '123123',
    address: { city: 'jestsd', street: 'jestsae', area: 'jest' }
  }
  let data = (await axios.post(`${baseURL}/api/consultancy`, body)).data
  id = data._id
  expect(_.pick(data, Object.keys(body))).toEqual(body)
})

const readTest = test('Reads a new Consultancy', async () => {
  const body = {
    name: 'fdssfdt',
    phoneNumber: '123123',
    address: { city: 'jestsd', street: 'jestsae', area: 'jest' }
  }
  expect(
    _.pick(
      (await axios.get(`${baseURL}/api/consultancy?id=${id}`)).data,
      Object.keys(body)
    )
  ).toEqual(body)
})

const updateTest = test('Updates a new Consultancy', async () => {
  const body = {
    name: 'fdssfdt',
    phoneNumber: '123122',
    address: { city: 'jestsd', street: 'jestsae', area: 'jest' }
  }
  expect(
    _.pick(
      (await axios.put(`${baseURL}/api/consultancy?id=${id}`, body)).data,
      Object.keys(body)
    )
  ).toEqual(body)
})

const deleteTest = test('Deletes a new Consultancy', async () => {
  const body = {
    name: 'fdssfdt',
    phoneNumber: '123122',
    address: { city: 'jestsd', street: 'jestsae', area: 'jest' }
  }
  expect(
    _.pick(
      (await axios.delete(`${baseURL}/api/consultancy?id=${id}`)).data,
      Object.keys(body)
    )
  ).toEqual(body)
})

module.exports = {
  addTest,
  readTest,
  updateTest,
  deleteTest
}
