const partner = require('../routes/partner')
const axios = require('axios')
const _ = require('lodash')

const testreviewee = '5c9519e7cef4f345903ba59d'
let baseURL = process.env.BASEURL || 'http://localhost:3000'
let reviewreply = ''
let task = ''
const postFeedbackTest = test('post feedback', async () => {
  const document = {
    name: 'Tester.Test123',
    owner: '5c9519e7cef4f345903ba59d',
    assignee: '5c951a6acef4f345903ba59e',
    description: 'This is Tester.Test123 Description',
    extraNotes: 'This is Tester.Test123 Extra Notes',
    effortLevel: 999999999,
    monetaryComp: 999999999,
    isComplete: true
  }
  task = await axios.post(`${baseURL}/api/task`, document)
  const body = {
    reviewer: '5c951a6acef4f345903ba59e',
    reviewee: '5c9519e7cef4f345903ba59d',
    review: 'test',
    rating: 3,
    task: task.data._id,
    reviewerModel: 'Members',
    revieweeModel: 'Partners'
  }
  reviewreply = (await axios.post(`${baseURL}/api/review`, body)).data
  let docID = task.data._id
  let deleteresponse = await axios.delete(`${baseURL}/api/task?id=${docID}`)
  expect(_.pick(reviewreply, Object.keys(body))).toEqual(body)
})

const viewFeedbackTest = test('view feedback', async () => {
  const body = {
    reviewer: '5c951a6acef4f345903ba59e',
    reviewee: '5c9519e7cef4f345903ba59d',
    review: 'test',
    rating: 3,
    task: task.data._id,
    reviewerModel: 'Members',
    revieweeModel: 'Partners'
  }

  expect(
    _.pick(
      (await axios.get(
        `${baseURL}/api/partner/getFeedback?id=5c9519e7cef4f345903ba59d`,
        body
      )).data[0],
      ['review']
    )
  ).toEqual({ review: reviewreply.review })
})
const deleteFeedbackTest = test('delete feedback', async () => {
  const body = {
    reviewer: '5c951a6acef4f345903ba59e',
    reviewee: '5c9519e7cef4f345903ba59d',
    review: 'test',
    rating: 3,
    task: task.data._id,
    reviewerModel: 'Members',
    revieweeModel: 'Partners'
  }
  reviewreply = (await axios.delete(
    `${baseURL}/api/review?id=${reviewreply._id}`,
    body
  )).data
  expect(_.pick(reviewreply, Object.keys(body))).toEqual(body)
})

module.exports = {
  postFeedbackTest,
  viewFeedbackTest,
  deleteFeedbackTest
}
