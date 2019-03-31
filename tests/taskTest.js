/**
 * @author Omar Handouk
 * @exports
 */

const task = require('../routes/task')
const axios = require('axios')
const _ = require('lodash')

const baseURL = process.env.BASEURL || 'http://localhost:3000'
const apiRoute = `${baseURL}/api/task`

/**
 * @description Task POST Test
 * @requires name-description-extraNotes-effortLevel-monetaryComp
 */

const postTask = test('POST /api/task', async () => {
  const document = {
    name: 'Tester.Test123',
    description: 'This is Tester.Test123 Description',
    extraNotes: 'This is Tester.Test123 Extra Notes',
    effortLevel: 999999999,
    monetaryComp: 999999999
  }

  let response = await axios.post(apiRoute, document)
  let docID = response.data._id
  await axios.delete(apiRoute + `?id=${docID}`)
  expect(_.pick(response.data, Object.keys(document))).toEqual(document)
})

/**
 * @description Task GET Test
 * @requires id
 */

const getTask = test('GET /api/task', async () => {
  // POST a new document
  const document = {
    name: 'Tester.Test123',
    description: 'This is Tester.Test123 Description',
    extraNotes: 'This is Tester.Test123 Extra Notes',
    effortLevel: 999999999,
    monetaryComp: 999999999
  }

  let response = await axios.post(apiRoute, document)
  let docID = response.data._id

  response = await axios.get(apiRoute + `?id=${docID}`)
  await axios.delete(apiRoute + `?id=${docID}`)
  expect(_.pick(response.data, Object.keys(document))).toEqual(document)
})

/**
 * @description Task PUT Test
 * @requires id
 */

const putTask = test('PUT /api/task', async () => {
  const document = {
    name: 'Tester.Test123',
    description: 'This is Tester.Test123 Description',
    extraNotes: 'This is Tester.Test123 Extra Notes',
    effortLevel: 999999999,
    monetaryComp: 999999999
  }

  let response = await axios.post(apiRoute, document)
  let docID = response.data._id

  const updatedDocument = {
    name: 'Tester.Tester456',
    effortLevel: 1
  }

  response = await axios.put(apiRoute + `?id=${docID}`, updatedDocument)
  await axios.delete(apiRoute + `?id=${docID}`)

  expect(_.pick(response.data, Object.keys(updatedDocument))).toEqual(
    updatedDocument
  )
})

/**
 * @description Task DELETE Test
 * @requires id
 */

const deleteTask = test('DELETE /api/task', async () => {
  // POST a new document
  const document = {
    name: 'Tester.Test123',
    description: 'This is Tester.Test123 Description',
    extraNotes: 'This is Tester.Test123 Extra Notes',
    effortLevel: 999999999,
    monetaryComp: 999999999
  }

  let response = await axios.post(apiRoute, document)
  let docID = response.data._id

  response = await axios.delete(apiRoute + `?id=${docID}`)

  expect(_.pick(response.data, Object.keys(document))).toEqual(document)
})

module.exports = {
  postTask,
  getTask,
  putTask,
  deleteTask
}
