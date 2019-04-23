const axios = require('axios')
const _ = require('lodash')

const a = {
  createPartner: async data => {
    return axios.post('http://localhost:3000/api/partner/', data)
  },
  createMember: async data => {
    return axios.post('http://localhost:3000/api/member/', data)
  },
  createReview: async data => {
    return axios.post('http://localhost:3000/api/partner/partnerReview', data)
  },
  createtask: async data => {
    return axios.post('http://localhost:3000/api/task/', data)
  },
  deletePartner: async email => {
    return axios.delete(`http://localhost:3000/api/partner?email=${email}`)
  },
  deleteMember: async email => {
    return axios.delete(`http://localhost:3000/api/member?email=${email}`)
  },
  deleteTask: async id => {
    return axios.delete(`http://localhost:3000/api/task?id=${id}`)
  },
  deleteReview: async id => {
    return axios.delete(`http://localhost:3000/api/review?id=${id}`)
  }
}

const partnerCreateReview = test('partner give feedback', async () => {
  //create partner to get his id
  const data1 = {
    name: 'testname1',
    field_of_work: 'testfieldofwork1',
    email: 'emailtest@test1',
    address: 'test1'
  }
  const createdPartner = await a.createPartner(data1)

  const createdPartnerData = createdPartner.data
  const partnerId = createdPartnerData['_id']
  console.log('moaz' + partnerId)
  //create member to git his id
  const data2 = {
    name: 'testname1',
    email: 'email@test1',
    password: 'passwordtest1'
  }
  const createdMember = await a.createMember(data2)

  const createdMemberData = createdMember.data
  const memberId = createdMemberData['_id']

  //create task
  const data3 = {
    name: 'newtest2',
    owner: partnerId,
    assignee: memberId,
    isComplete: true
  }
  const createdTask = await a.createtask(data3)

  const createdTaskData = createdTask.data
  const taskId = createdTaskData['_id']
  console.log('da el id task' + taskId)
  //create review
  const body = {
    reviewer: partnerId,
    reviewee: memberId,
    task: taskId,
    review: 'nice',
    rating: '4',
    reviewerModel: 'Partners',
    revieweeModel: 'Members'
  }
  const createdReview = await a.createReview(data3)

  const createdReviewData = createdReview.data
  const reviewId = createdReviewData['_id']
  console.log('da el rev id' + reviewId)
  expect.assertions(1)
  expect(createdReviewData).toMatchObject(body)

  a.deletePartner('emailtest@test1')
  a.deleteMember('email@test1')
  a.deleteTask(taskId)
  a.deleteReview(reviewId)
})

module.exports = {
  partnerCreateReview
}
