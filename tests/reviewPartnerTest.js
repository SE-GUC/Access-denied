const fetch = require('node-fetch')
let baseURL = process.env.BASEURL || 'http://localhost:3000'
const axios = require('axios')
let reply = ''
let memberId,
  partnerId,
  taskId = ''
const funcs = {
  postMemberReviewsPartner: async () => {
    let member = {
      name: 'ahmed',
      birthDate: '2018-01-01T00:00:00.000Z'
    }
    let memberData = (await axios.post(`${baseURL}/api/Member`, member)).data
    memberId = memberData._id

    let partner = {
      name: 'testnomoreihater',
      Telephone_number: '1015142324',
      number_of_employees: '30',
      field_of_work: 'testwhyyyyy'
    }
    let partnerRes = await axios.post(`${baseURL}/api/partner`, partner)
    let partnerData = partnerRes.data
    partnerId = partnerData._id

    const taskBody = {
      name: 'Tester.Test123',
      description: 'This is Tester.Test123 Description',
      extraNotes: 'This is Tester.Test123 Extra Notes',
      effortLevel: 9,
      monetaryComp: 999999999,
      owner: partnerId,
      assignee: memberId
    }

    let taskData = await axios.post(`${baseURL}/api/task`, taskBody)
    taskId = taskData.data._id
    const document = {
      name: 'Tester.Test123',
      owner: partnerId,
      assignee: memberId,
      description: 'This is Tester.Test123 Description',
      extraNotes: 'This is Tester.Test123 Extra Notes',
      effortLevel: 9,
      monetaryComp: 999999999,
      isComplete: true
    }
    let task = await axios.post(`${baseURL}/api/task`, document)
    let response = await fetch(`${baseURL}/api/Member/reviewPartner`, {
      method: 'POST',
      body: JSON.stringify({
        task: task.data._id,
        reviewee: partnerId,
        reviewer: memberId,
        review: 'xxxxx',
        rating: 2,
        reviewerModel: 'Members',
        revieweeModel: 'Partners',
        task: taskId
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    })
    let data = await response.json()
    reply = data
    let docID = task.data._id
    let deleteresponse = await axios.delete(
      `${baseURL}/api/task` + `?id=${docID}`
    )
    return data
  },
  deleteMemberReviewsPartner: async () => {
    let response = await fetch(`${baseURL}/api/review?id=${reply._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    })
    let data = await response.json()
    return data
  }
}

const postTest = test('post member reviews partner', async () => {
  const response = await funcs.postMemberReviewsPartner()
  expect(response.reviewer).toEqual(memberId) &&
    expect(response.reviewee).toEqual(partnerId) &&
    expect(response.task).toEqual(taskId)
})
const deleteTest = test('delete member reviews partner', async () => {
  const response = await funcs.deleteMemberReviewsPartner()
  expect(response.reviewer).toEqual(memberId) &&
    expect(response.reviewee).toEqual(partnerId) &&
    expect(response.task).toEqual(taskId)
})

module.exports = {
  postTest,
  deleteTest
}
