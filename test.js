// /**
//  * @jest-environment node
//  */
// const coworkingTests = require('./tests/coworkingTest')
// const consultacyTests = require('./tests/consultancyTest')
// const reviewTests = require('./tests/reviewTest')
// var baseURL =  "http://localhost:3000"
// const axios = require('axios');
// var fetch = require('node-fetch')

// async function getDataFromAPI(data) {
//     let response = await fetch(`${baseURL}/api/Partner`, {
//         method: "POST",
//         body: JSON.stringify(data),
//         headers: {
//           "Content-Type": "application/json"
//         },
//         credentials: "same-origin"
//       })
//     let data = await response.json()
//     // console.log(data)
//     return data
// }

// async function getDataFromAPI(data) {
//   let response = await fetch(`${baseURL}/api/Member`, {
//       method: "POST",
//       body: JSON.stringify(data),
//       headers: {
//         "Content-Type": "application/json"
//       },
//       credentials: "same-origin"
//     })
//   let data = await response.json()
//   // console.log(data)
//   return data
// }

// async function getDataFromAPI(data) {
//   let response = await fetch(`${baseURL}/api/Member`, {
//       method: "POST",
//       body: JSON.stringify(data),
//       headers: {
//         "Content-Type": "application/json"
//       },
//       credentials: "same-origin"
//     })
//   let data = await response.json()
//   // console.log(data)
//   return data
// }
// // getDataFromAPI( {
//     //     "name": "test",
//     //     "email": "test@gmail.com",
//     //     "location": "test"
//     // })

// test('get all members', async () => {
//     const response = await getDataFromAPIgetDataFromAPI( {
//           name: "test",
//           email: "test@gmail.com",
//           location: "test"
//       })
//     console.log(response)
//              expect(response.name).toEqual('test');
//              expect(response.email).toEqual('test@gmail.com');
//              expect(response.password).toEqual('test'); 
                     
// });
// test('object assignment', () => {
//     const data = {one: 1};
//     data['two'] = 2;
//     expect(data.one).toEqual(1);
//     expect(data.two).toEqual(2);

// });

// // test('Number of books should be 11', async () => {
// //     expect.assertions(1)
// //     const response =  await funcs.getBooks()
// //     expect(response.data.data.length).toBe(11)
// // });

