const consultancy = require('../routes/consultancy')
const axios = require('axios')
const _ = require('lodash')

let baseURL = process.env.BASEURL || 'http://localhost:3000'

const addTest = test('Creates a new Consultancy', async () => {
  const body = {
    name: 'fdssfdt',
    email: 'lkkj@test.j2s',
    phoneNumber: '123123',
    address: 'jestsd'
  }
  expect(
    _.pick(
      (await axios.post(`${baseURL}/api/consultancy`, body)).data,
      Object.keys(body)
    )
  ).toEqual(body)
})

const readTest = test('Reads a new Consultancy', async () => {
  const body = {
    name: 'fdssfdt',
    email: 'lkkj@test.j2s',
    phoneNumber: '123123',
    address: 'jestsd'
  }
  expect(
    _.pick(
      (await axios.get(`${baseURL}/api/consultancy?email=lkkj@test.j2s`)).data,
      Object.keys(body)
    )
  ).toEqual(body)
})

const updateTest = test('Updates a new Consultancy', async () => {
  const body = {
    name: 'fdssfdt',
    email: 'lkkj@test.j2s',
    phoneNumber: '123122',
    address: 'jestsd'
  }
  expect(
    _.pick(
      (await axios.put(`${baseURL}/api/consultancy?email=lkkj@test.j2s`, body))
        .data,
      Object.keys(body)
    )
  ).toEqual(body)
})

const deleteTest = test('Deletes a new Consultancy', async () => {
  const body = {
    name: 'fdssfdt',
    email: 'lkkj@test.j2s',
    phoneNumber: '123122',
    address: 'jestsd'
  }
  expect(
    _.pick(
      (await axios.delete(`${baseURL}/api/consultancy?email=lkkj@test.j2s`))
        .data,
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
