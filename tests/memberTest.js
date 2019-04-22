const axios = require('axios')
const _ = require('lodash')

let baseURL = process.env.BASEURL || 'http://localhost:3000'

let id = ''
const posttest = test('create new Member', async () => {
  const body = {
    name: 'ahmed',
    birthDate: '2018-01-01T00:00:00.000Z'
  }
  let data = (await axios.post(`${baseURL}/api/Member`, body)).data
  id = data._id
  expect(_.pick(data, Object.keys(body))).toEqual(
    _.pick(body, ['name', 'birthDate'])
  )
})

const readTest = test('Get Member', async () => {
  const body = {
    name: 'ahmed',
    birthDate: '2018-01-01T00:00:00.000Z'
  }
  expect(
    _.pick(
      (await axios.get(`${baseURL}/api/Member?id=${id}`)).data,
      Object.keys(body)
    )
  ).toEqual(body)
})

const updateTest = test('Updates Member Data ', async () => {
  const body = {
    name: 'Mohamed',
    birthDate: '2018-01-01T00:00:00.000Z'
  }
  expect(
    _.pick(
      (await axios.put(`${baseURL}/api/Member?id=${id}`, body)).data,
      Object.keys(body)
    )
  ).toEqual(body)
})
const deleteTest = test('Deletes Member', async () => {
  const body = {
    name: 'Mohamed',
    birthDate: '2018-01-01T00:00:00.000Z'
  }
  expect(
    _.pick(
      (await axios.delete(`${baseURL}/api/Member/?id=${id}`)).data,
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
