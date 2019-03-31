const member = require('../routes/member')
const axios = require('axios')
const _ = require('lodash')

var baseURL = process.env.BASEURL || 'http://localhost:3000'

const posttest = test('create new Member', async () => {
  const body = {
    name: 'ahmed',
    email: 'gtr@50.gmail.com',
    password: 'hateyou5'
  }
  expect(
    _.pick(
      (await axios.post(`${baseURL}/api/member`, body)).data,
      Object.keys(body)
    )
  ).toEqual(_.pick(body, ['name', 'email']))
})

const readTest = test('Get Member', async () => {
  const body = {
    name: 'ahmed',
    email: 'gtr@50.gmail.com'
  }
  expect(
    _.pick(
      (await axios.get(`${baseURL}/api/Member/?email=gtr@50.gmail.com`)).data,
      Object.keys(body)
    )
  ).toEqual(body)
})

const updateTest = test('Updates Member Data ', async () => {
  const body = {
    name: 'Mohamed',
    email: 'notme@gmail.com'
  }
  expect(
    _.pick(
      (await axios.put(`${baseURL}/api/Member/?email=gtr@50.gmail.com`, body))
        .data,
      Object.keys(body)
    )
  ).toEqual(body)
})
const deleteTest = test('Deletes Member', async () => {
  const body = {
    name: 'Mohamed',
    email: 'notme@gmail.com'
  }
  expect(
    _.pick(
      (await axios.delete(`${baseURL}/api/Member/?email=notme@gmail.com`)).data,
      Object.keys(body)
    )
  ).toEqual(body)
})

module.exports = {
  posttest,
  readTest,
  updateTest,
  deleteTest
}
