const certification = require('../routes/certification')
const axios = require('axios')
const _ = require('lodash')

let reviewreply = ''

let baseURL = process.env.BASEURL || 'http://localhost:3000'

let id = ''
const createTest = test('create a new certification', async () => {
  const body = {
    name: 'testname2',
    Evaluation_procedure: '5c9fdc26d3b7fb66e4c4f0d9'
  }
  reviewreply = (await axios.post(`${baseURL}/api/certification`, body)).data
  id = reviewreply.id
  expect(_.pick(reviewreply, Object.keys(body))).toEqual(body)
})

const readTest = test('reads a certification', async () => {
  const body = {
    name: 'testname2',
    Evaluation_procedure: '5c9fdc26d3b7fb66e4c4f0d9'
  }
  expect(
    _.pick(
      (await axios.get(`${baseURL}/api/certification?id=${id}`, body)).data,
      ['name']
    )
  ).toEqual({ name: reviewreply.name })
})
const updateTest = test('Updates a certification', async () => {
  const body = {
    name: 'testname2',
    Evaluation_procedure: '5c9fdc26d3b7fb66e4c4f0d9'
  }
  expect(
    _.pick(
      (await axios.put(`${baseURL}/api/certification?id=${id}`, body)).data,
      Object.keys(body)
    )
  ).toEqual(body)
})

const deleteTest = test('Deletes a certification', async () => {
  const body = {
    name: 'testname2',
    Evaluation_procedure: '5c9fdc26d3b7fb66e4c4f0d9'
  }
  expect(
    _.pick(
      (await axios.delete(`${baseURL}/api/certification?id=${id}`)).data,
      Object.keys(body)
    )
  ).toEqual(body)
})

module.exports = {
  readTest,
  createTest,
  updateTest,
  deleteTest
}

////////////////////////////////////////////////////////
// const axios = require('axios')
// const _ = require('lodash')
// //const evaluation = require('../routes/Evaluation')

// const c = {
//   createCertification: async (data) => {
//     return axios.post("http://localhost:3000/api/certification/", data)
//   },
//   readCertification: async (name) => {
//     return axios.get(`http://localhost:3000/api/certification?name=${name}`)
//   },
//   createEvaluation: async (data) => {
//     return axios.post("http://localhost:3000/api/Evaluation/", data)
//   },
//   deleteCertification: async (name) => {
//     return axios.delete(`http://localhost:3000/api/certification?name=${name}`)
//   }
// }

// var baseURL = process.env.BASEURL || 'http://localhost:3000'
// const checkpost =test('create-an-certification exists', async () => {
//   expect.assertions(1)

//   return expect(typeof (c.createCertification)).toBe('function')
// })

// const checkGet =test('get-an-certification exists', async () => {
//   expect.assertions(1)

//   return expect(typeof (c.readCertification)).toBe('function')
// })

// const createTest = test('Creates a new certification', async () => {
//   const data = {
//     styleOfEvaluation:"mcq1",
//     link:"test12"

//   }
//   const created = await c.createEvaluation(data)

//   const createdData = created.data
//   const evaluationid = createdData['_id']

//   const body = {
//     name: "testname",
//     Evaluation_procedure: evaluationid,
//   }
//   const createdCertification=await c.createCertification(body)
//   const certificationcreatedData = createdCertification.data
//   expect.assertions(1)
//   expect(certificationcreatedData).toMatchObject(body)

//   await c.deleteCertification('testname')
// })

// const readTest = test('Reads a new certification', async () => {
//   const data = {
//     styleOfEvaluation:"mcq1",
//     link:"test12"

//   }
//   const created = await c.createEvaluation(data)

//   const createdData = created.data
//   const evaluationid = createdData['_id']
//   const body = {
//     name: 'testname',
//     Evaluation_procedure: evaluationid,
//   }
//   const createdCertification=await c.createCertification(body)
//   const certificationcreatedData = createdCertification.data
//   const certificationName = certificationcreatedData['name']
//   const readedCertification=await c.readCertification(certificationName)
//   const readCertificationdata=readedCertification.data[0]
//   expect.assertions(1)
//   expect(readCertificationdata).toMatchObject(certificationcreatedData)
//   await c.deleteCertification('testname')

///////////////////////////////////////////////////////////
