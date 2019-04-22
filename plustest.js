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
const evaluationTests = require('./tests/evaluationTest')
const scheduleTests = require('./tests/scheduleTest')
