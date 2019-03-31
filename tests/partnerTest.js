const partner = require('../routes/partner')
const axios = require('axios')
const _ = require('lodash')

const testreviewee= '5c9519e7cef4f345903ba59d'
var baseURL = process.env.BASEURL || 'http://localhost:3000'
let reviewreply = ''

const viewFeedbackTest= test('view feedback', async () => {
  const body = {
    reviewer: '5c955e896044620bf8a81091',
    reviewee: '5c9560186044620bf8a81094',
    review: 'test',
    rating: 3,
    task: '5c9563076044620bf8a81097',
    reviewerModel: 'Members',
    revieweeModel: 'Partners'
  }
  reviewreply=(await axios.get(`${baseURL}/api/partner/getFeedback?id=5c9560186044620bf8a81094`, body)).data
  expect(
    _.pick(
        (await axios.get(`${baseURL}/api/partner/getFeedback?id=5c9560186044620bf8a81094`, body))
          .data[0],
          ['review']
      )).toEqual({review: reviewreply.review})
})



module.exports = {
    viewFeedbackTest
}
