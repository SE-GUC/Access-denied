const axios = require('axios')
const _ = require('lodash')

let baseURL = process.env.BASEURL || 'http://localhost:3000'

const testingEmail = 'Jtesting@Jest.Jesting'
let slot = {
  day: 'Saturday',
  from: 10,
  to: 1,
  available: true
}
let objectId = ''
let slotId = ''

const createTest = test('Creates a new Schedule', async () => {
  let request = await axios.post(`${baseURL}/api/schedule`, {})
  objectId = request.data._id
  expect(request.status).toEqual(201)
})

const createSlotTest = test('Creates a new slot', async () => {
  let request = await axios.post(
    `${baseURL}/api/schedule/${objectId}/slot`,
    slot
  )
  slotId = request.data.Saturday[0]._id
  expect(_.pick(request.data.Saturday[0], Object.keys(slot))).toEqual(
    _.pick(slot, ['available', 'from', 'to'])
  )
})

const readTest = test('Reads an existing Schedule', async () => {
  expect(
    (await axios.get(`${baseURL}/api/schedule/${objectId}`)).status
  ).toEqual(200)
})
const readSlotTest = test('Reads an existing Slot', async () => {
  expect(
    _.pick(
      (await axios.get(`${baseURL}/api/schedule/${objectId}/slot?id=${slotId}`))
        .data,
      Object.keys(slot)
    )
  ).toEqual(_.pick(slot, ['available', 'from', 'to']))
})

const updateSlotTest = test('Updates an existing Slot', async () => {
  slot.available = false
  expect(
    _.pick(
      (await axios.put(
        `${baseURL}/api/schedule/${objectId}/slot?id=${slotId}`,
        slot
      )).data.Saturday[0],
      Object.keys(slot)
    )
  ).toEqual(_.pick(slot, ['available', 'from', 'to']))
})

const deleteSlotTest = test('Deletes an existing Slot', async () => {
  expect(
    (await axios.delete(
      `${baseURL}/api/schedule/${objectId}/slot?id=${slotId}&day=Saturday`
    )).status
  ).toEqual(200)
})
const deleteTest = test('Deletes an existing Schedule', async () => {
  expect(
    (await axios.delete(`${baseURL}/api/schedule/${objectId}`)).status
  ).toEqual(200)
})

module.exports = {
  createTest,
  createSlotTest,
  readTest,
  readSlotTest,
  updateSlotTest,
  deleteSlotTest,
  deleteTest
}
