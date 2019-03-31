// var fetch = require('node-fetch')
// var baseURL = process.env.BASEURL || 'http://localhost:3000'
// let reply = ''
// const funcs = {
//   postMemberReviewsPartner: async () => {
//     let response = await fetch(`${baseURL}/api/Member/reviewPartner`, {
//       method: 'POST',
//       body: JSON.stringify({
//         task: '5ca002ae15f5040438cf1fa9',
//         reviewee: '5c9494d3f0c6c02014be6b5f',
//         reviewer: '5c7581a12357f33970c4d757',
//         review: 'xxxxx',
//         rating: 2
//       }),
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       credentials: 'same-origin'
//     })
//     let data = await response.json()
//     reply = data
//     return data
//   },
//   deleteMemberReviewsPartner: async () => {
//     let response = await fetch(`${baseURL}/api/review?id=${reply._id}`, {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       credentials: 'same-origin'
//     })
//     let data = await response.json()
//     return data
//   }
// }

// const postTest = test('post member reviews partner', async () => {
//   const response = await funcs.postMemberReviewsPartner()
//   console.log(response)
//   expect(response.reviewer).toEqual('5c7581a12357f33970c4d757') &&
//     expect(response.reviewee).toEqual('5c9494d3f0c6c02014be6b5f') &&
//     expect(response.task).toEqual('5ca002ae15f5040438cf1fa9')
// })
// const deleteTest = test('delete member reviews partner', async () => {
//   const response = await funcs.deleteMemberReviewsPartner()
//   console.log(reply._id)
//   console.log(response)
//   expect(response.reviewer).toEqual('5c7581a12357f33970c4d757') &&
//     expect(response.reviewee).toEqual('5c9494d3f0c6c02014be6b5f') &&
//     expect(response.task).toEqual('5ca002ae15f5040438cf1fa9')
// })

// module.exports = {
//   postTest,
//   deleteTest
// }