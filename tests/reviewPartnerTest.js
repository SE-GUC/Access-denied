const fetch = require('node-fetch')
let baseURL = process.env.BASEURL || 'http://localhost:3000'
const axios = require('axios')
let reply = ''
const funcs = {
  postMemberReviewsPartner: async () => {
    const document = {
      name: 'Tester.Test123',
      owner: '5c9494d3f0c6c02014be6b5f',
      assignee: '5c7581a12357f33970c4d757',
      description: 'This is Tester.Test123 Description',
      extraNotes: 'This is Tester.Test123 Extra Notes',
      effortLevel: 999999999,
      monetaryComp: 999999999,
      isComplete: true
    }
    let task = await axios.post(`${baseURL}/api/task`, document)
    let response = await fetch(`${baseURL}/api/Member/reviewPartner`, {
      method: 'POST',
      body: JSON.stringify({
        task: task.data._id,
        reviewee: '5c9494d3f0c6c02014be6b5f',
        reviewer: '5c7581a12357f33970c4d757',
        review: 'xxxxx',
        rating: 2
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
  expect(response.reviewer).toEqual('5c7581a12357f33970c4d757') &&
    expect(response.reviewee).toEqual('5c9494d3f0c6c02014be6b5f') &&
    expect(response.task).toEqual('5ca002ae15f5040438cf1fa9')
})
const deleteTest = test('delete member reviews partner', async () => {
  const response = await funcs.deleteMemberReviewsPartner()
  expect(response.reviewer).toEqual('5c7581a12357f33970c4d757') &&
    expect(response.reviewee).toEqual('5c9494d3f0c6c02014be6b5f') &&
    expect(response.task).toEqual('5ca002ae15f5040438cf1fa9')
})

module.exports = {
  postTest,
  deleteTest
}
