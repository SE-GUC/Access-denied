const review = require('../routes/review')
const axios = require('axios')
const _ = require('lodash')

let baseURL = process.env.BASEURL || 'http://localhost:3000'
let reviewreply = ''

const addTest = test('Creates a new review', async () => {
  const body = {
    reviewer: '5c955e896044620bf8a81091',
    reviewee: '5c9560186044620bf8a81094',
    review: 'test',
    rating: 3,
    task: '5c9563076044620bf8a81097',
    reviewerModel: 'Members',
    revieweeModel: 'Partners'
  }
  reviewreply = (await axios.post(`${baseURL}/api/review`, body)).data
  expect(_.pick(reviewreply, Object.keys(body))).toEqual(body)
})

const readTest = test('Reads a new review', async () => {
  const body = {
    reviewer: '5c955e896044620bf8a81091',
    reviewee: '5c9560186044620bf8a81094',
    review: 'test',
    rating: 3,
    task: '5c9563076044620bf8a81097',
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
    reviewer: '5c955e896044620bf8a81091',
    reviewee: '5c9560186044620bf8a81094',
    review: 'testupdate',
    rating: 3,
    task: '5c9563076044620bf8a81097',
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
    reviewer: '5c955e896044620bf8a81091',
    reviewee: '5c9560186044620bf8a81094',
    review: 'testupdate',
    rating: 3,
    task: '5c9563076044620bf8a81097',
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
