const certification = require('../routes/certification')
const axios = require('axios')
const _ = require('lodash')
const evaluation = require('../routes/Evaluation')
const id=''



var baseURL = process.env.BASEURL || 'http://localhost:3000'
const checkpost =test('create-an-certification exists', async () => {
  expect.assertions(1)
  const c ={createcer: async (data) => {
    return axios.post("http://localhost:3000/api/certification/", data)
  }
}
  return expect(typeof (c.createcer)).toBe('function')
})

// const createcertification = test('Creates a new certification', async () => {
//   const data = {
//     evaluationCode: 'testcode',
//     certificationName: 'testcertificationname',
//     certificationCode: 'testcertificationcode',
//     styleOfEvaluation: 'mcq',
//     link: 'testlink',
//     nameOfEducationalOrganisationOfferingIt: 'testnameOfEducationalOrganisationOfferingIt',
//     emailCOfEducationalOrganisationOfferingIt: 'testemailCOfEducationalOrganisationOfferingIt'
    
//   }
//   const created = await evaluation.createInvestor(data)
//   const createdData = created.data.data
//   id = createdData['_id']
//   const body = {
//     name: 'testname',
//     Evaluation_procedure: id,
//   }
//   expect(
//     _.pick(
//       (await axios.post(`${baseURL}/api/certification`, body)).data,
//       Object.keys(body)
//     )
//   ).toEqual(body)
// })

// const readcertification = test('Reads a new certification', async () => {
//   const body = {
//     name: 'testname',
//     Evaluation_procedure: id,
//   }
//   expect(
//     _.pick(
//       (await axios.get(`${baseURL}/api/consultancy?name=testname`)).data,
//       Object.keys(body)
//     )
//   ).toEqual(body)
// })

// const updateCertification = test('Updates a new certification', async () => {
//   const body = {
//     name: 'testname',
//     Evaluation_procedure: id,
//   }
//   expect(
//     _.pick(
//       (await axios.put(`${baseURL}/api/consultancy?name=testname2`, body))
//         .data,
//       Object.keys(body)
//     )
//   ).toEqual(body)
// })

// const deleteTest = test('Deletes a new Consultancy', async () => {
//   const body = {
//     name: 'fdssfdt',
//     email: 'lkkj@test.j2s',
//     phoneNumber: '123122',
//     address: 'jestsd'
//   }
//   expect(
//     _.pick(
//       (await axios.delete(`${baseURL}/api/consultancy?email=lkkj@test.j2s`))
//         .data,
//       Object.keys(body)
//     )
//   ).toEqual(body)
// })

// test('Read-an-Investor exists', async () => {
//   expect.assertions(1)
//   return expect(typeof (investor.readInvestor)).toBe('function')
// })

// test('Read an Investor by id', async () => {
//    const data = {
//     fullName: 'Kevin Smith',
//     birthdate: '2001-10-02',
//     email: 'high@tower.net'
//   }
//   const created = await investor.createInvestor(data)
//   const createdData = created.data.data
//   const id = createdData['_id']
//   const data = {
//     fullName: 'Sam Water',
//     birthdate: '1837-02-15',
//     email: 'great@guy.com'
//   }
//   const created = await investor.createInvestor(data)
//   const createdData = created.data.data
//   const id = createdData['_id']
//   const read = await investor.readInvestor(id)
//   const readData = read.data.data
//   expect.assertions(1)
//   return expect(readData).toEqual(createdData)
// })

// test('Delete-an-Investor exists', async () => {
//   expect.assertions(1)
//   return expect(typeof (investor.deleteInvestor)).toBe('function')
// },
// 10000)

// test('Delete an Investor by id', async () => {
//   const data = {
//     fullName: 'Kevin Smith',
//     birthdate: '2001-10-02',
//     email: 'high@tower.net'
//   }
//   const created = await investor.createInvestor(data)
//   const createdData = created.data.data
//   const id = createdData['_id']
//   const deleted = await investor.deleteInvestor(id)
//   const deletedData = deleted.data.deletedInvestor
//   expect.assertions(1)
//   return expect(deletedData).toEqual(createdData)
// })
module.exports = {
  checkpost
}