
const partner = require('../routes/partner')
const axios = require('axios')
const _ = require('lodash')

const testreviewee= '5c9519e7cef4f345903ba59d'
var baseURL = process.env.BASEURL || 'http://localhost:3000'
let reviewreply = ''

const postFeedbackTest= test('post feedback', async () => {
  const body = {
    reviewer: '5c951a6acef4f345903ba59e',
    reviewee: '5c9519e7cef4f345903ba59d',
    review: 'test',
    rating: 3,
    task: '5ca0011e0eb0f426b03291ac',
    reviewerModel: 'Members',
    revieweeModel: 'Partners'
  }
  reviewreply=(await axios.post(`${baseURL}/api/review`, body)).data
  expect( _.pick(reviewreply, Object.keys(body)))
      .toEqual(body)
})

const viewFeedbackTest= test('view feedback', async () => {
  const body = {
    reviewer: '5c951a6acef4f345903ba59e',
    reviewee: '5c9519e7cef4f345903ba59d',
    review: 'test',
    rating: 3,
    task: '5ca0011e0eb0f426b03291ac',
    reviewerModel: 'Members',
    revieweeModel: 'Partners'
  }
  
  expect(
    _.pick(
        (await axios.get(`${baseURL}/api/partner/getFeedback?id=5c9519e7cef4f345903ba59d`, body))
          .data[0],
          ['review']
      )).toEqual({review: reviewreply.review})
})
const deleteFeedbackTest= test('delete feedback', async () => {
  const body = {
    reviewer: '5c951a6acef4f345903ba59e',
    reviewee: '5c9519e7cef4f345903ba59d',
    review: 'test',
    rating: 3,
    task: '5ca0011e0eb0f426b03291ac',
    reviewerModel: 'Members',
    revieweeModel: 'Partners'
  }
  reviewreply=(await axios.delete(`${baseURL}/api/review?id=${reviewreply._id}`, body)).data
  expect( _.pick(reviewreply, Object.keys(body)))
      .toEqual(body)
})


module.exports = {
  deleteFeedbackTest,
    viewFeedbackTest,
    postFeedbackTest
}