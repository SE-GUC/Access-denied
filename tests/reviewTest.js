const review = require('../routes/review')
const axios = require('axios')
const _ = require('lodash')

let baseURL = process.env.BASEURL || 'http://localhost:3000'
let reviewreply = ''
let memberId,
  partnerId,
  taskId = ''
const addTest = test('Creates a new review', async () => {
  //Seeding

  let member = {
    name: 'ahmed',
    birthDate: '2018-01-01T00:00:00.000Z'
  }
  let memberData = (await axios.post(`${baseURL}/api/Member`, member)).data
  memberId = memberData._id

  let partner = {
    name: 'testnomoreihate',
    Telephone_number: '1015142324',
    number_of_employees: '30',
    field_of_work: 'testwhyyyyy'
  }
  let partnerRes = await axios.post(`${baseURL}/api/partner`, partner)
  let partnerData = partnerRes.data
  partnerId = partnerData._id

  const task = {
    name: 'Tester.Test123',
    description: 'This is Tester.Test123 Description',
    extraNotes: 'This is Tester.Test123 Extra Notes',
    effortLevel: 999999999,
    monetaryComp: 999999999,
    owner: partnerId,
    assignee: memberId
  }

  let taskData = await axios.post(`${baseURL}/api/task`, task)
  taskId = taskData.data._id
  const body = {
    reviewer: memberId,
    reviewee: partnerId,
    review: 'test',
    rating: 3,
    task: taskId,
    reviewerModel: 'Members',
    revieweeModel: 'Partners'
  }
  reviewreply = (await axios.post(`${baseURL}/api/review`, body)).data
  expect(_.pick(reviewreply, Object.keys(body))).toEqual(body)
})

const readTest = test('Reads a new review', async () => {
  const body = {
    reviewer: memberId,
    reviewee: partnerId,
    review: 'test',
    rating: 3,
    task: taskId,
    reviewerModel: 'Members',
    revieweeModel: 'Partners'
  }
  expect(
    _.pick(
      (await axios.get(
        `${baseURL}/api/review?reviewee=${reviewreply.reviewee}`
      )).data[0],
      ['review']
    )
  ).toEqual({ review: reviewreply.review })
})

const updateTest = test('Updates a new review', async () => {
  const body = {
    reviewer: memberId,
    reviewee: partnerId,
    review: 'test',
    rating: 4,
    task: taskId,
    reviewerModel: 'Members',
    revieweeModel: 'Partners'
  }
  expect(
    _.pick(
      (await axios.put(`${baseURL}/api/review?id=${reviewreply._id}`, body))
        .data,
      Object.keys(body)
    )
  ).toEqual(body)
})

const deleteTest = test('Deletes a new review', async () => {
  const body = {
    reviewer: memberId,
    reviewee: partnerId,
    review: 'test',
    rating: 4,
    task: taskId,
    reviewerModel: 'Members',
    revieweeModel: 'Partners'
  }
  expect(
    _.pick(
      (await axios.delete(`${baseURL}/api/review?id=${reviewreply._id}`)).data,
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
