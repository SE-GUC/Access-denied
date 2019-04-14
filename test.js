/**

 * @jest-environment node
//  */

require('dotenv').config()
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGOURI, { useNewUrlParser: true })

beforeAll(() => {
  mongoose.connection.dropDatabase(error => {
    if (error) console.log(error)
  })
})

afterAll(() => {
  mongoose.connection.dropDatabase(error => {
    if (error) console.log(error)
  })
  mongoose.disconnect()
})

const coworkingTests = require('./tests/coworkingTest')
const consultacyTests = require('./tests/consultancyTest')
const reviewTests = require('./tests/reviewTest')
const certificationTests = require('./tests/certificationTest')
const educationalOrganisationTests = require('./tests/educationalOrganisationTest')
const taskTests = require('./tests/taskTest')
const memberTests = require('./tests/memberTest')
const PartnerTests = require('./tests/PartnerTest')
const applicationTests = require('./tests/applicationTest')
const skillsTests = require('./tests/skillsTest')
const assignmemberTests=require('./tests/assignMemberTest')