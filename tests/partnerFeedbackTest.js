const partner = require('../routes/partner')
const axios = require('axios')
const _ = require('lodash')

const testreviewee = '5c9519e7cef4f345903ba59d'
let baseURL = process.env.BASEURL || 'http://localhost:3000'
let reviewreply = ''
let task = ''
let memberId, partnerId
const postFeedbackTest = test('post feedback', async () => {
  let member = {
    name: 'ahmed',
    birthDate: '2018-01-01T00:00:00.000Z'
  }
  let memberData = (await axios.post(`${baseURL}/api/Member`, member)).data
  memberId = memberData._id

  let partner = {
    name: 'testnomoreihatez',
    Telephone_number: '1015142324',
    number_of_employees: '30',
    field_of_work: 'testwhyyyyy'
  }
  let partnerRes = await axios.post(`${baseURL}/api/partner`, partner)
  let partnerData = partnerRes.data
  partnerId = partnerData._id
  const document = {
    name: 'Tester.Test123',
    owner: partnerId,
    assignee: memberId,
    description: 'This is Tester.Test123 Description',
    extraNotes: 'This is Tester.Test123 Extra Notes',
    effortLevel: 999999999,
    monetaryComp: 999999999,
    isComplete: true
  }
  task = await axios.post(`${baseURL}/api/task`, document)
  const body = {
    reviewer: memberId,
    reviewee: partnerId,
    review: 'test',
    rating: 3,
    task: task.data._id,
    reviewerModel: 'Members',
    revieweeModel: 'Partners'
  }
  reviewreply = (await axios.post(`${baseURL}/api/review`, body)).data
  expect(_.pick(reviewreply, Object.keys(body))).toEqual(body)
})

const viewFeedbackTest = test('view feedback', async () => {
  const body = {
    reviewer: memberId,
    reviewee: partnerId,
    review: 'test',
    rating: 3,
    task: task.data._id,
    reviewerModel: 'Members',
    revieweeModel: 'Partners'
  }

  expect(
    _.pick(
      (await axios.get(`${baseURL}/api/partner/getFeedback?id=${partnerId}}`))
        .data[0],
      ['review']
    )
  ).toEqual({ review: reviewreply.review })
})
const deleteFeedbackTest = test('delete feedback', async () => {
  const body = {
    reviewer: memberId,
    reviewee: partnerId,
    review: 'test',
    rating: 3,
    task: task.data._id,
    reviewerModel: 'Members',
    revieweeModel: 'Partners'
  }
  reviewreplyz = (await axios.delete(
    `${baseURL}/api/review?id=${reviewreply._id}`
  )).data[0]
  expect(_.pick(reviewreplyz, Object.keys(body))).toEqual(body)
})

module.exports = {
  postFeedbackTest,
  viewFeedbackTest,
  deleteFeedbackTest
}
