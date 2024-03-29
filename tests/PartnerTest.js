let baseURL = process.env.BASEURL || `http://localhost:3000`
const axios = require('axios')
let apiRoute = `${baseURL}/api/partner`

let id = ''
const testPost = test('PartnerPost right data', async () => {
  const doc = {
    name: 'testnomoreihate',
    Telephone_number: '1015142324',
    number_of_employees: '30',
    field_of_work: 'testwhyyyyy'
  }
  let response1 = await axios.post(apiRoute, doc)
  let response = response1.data
  id = response._id
  expect(response.name).toEqual('testnomoreihate')
  expect(response.Telephone_number).toEqual(1015142324)
  expect(response.number_of_employees).toEqual(30)
  expect(response.members).toEqual([])
  expect(response.events).toEqual([])
  expect(response.other).toEqual([])
  expect(response.field_of_work).toEqual('testwhyyyyy')
})

const testGet = test('PartnerGet right data', async () => {
  let response1 = await axios.get(apiRoute + `?id=${id}`)
  let response = response1.data
  expect(response.name).toEqual('testnomoreihate')
  expect(response.Telephone_number).toEqual(1015142324)
  expect(response.number_of_employees).toEqual(30)
  expect(response.members).toEqual([])
  expect(response.events).toEqual([])
  expect(response.other).toEqual([])
  expect(response.field_of_work).toEqual('testwhyyyyy')
})
const testPut = test('PartnerPut right data', async () => {
  let updatedDocument = {
    members: [
      {
        name: ' ahmedt',
        age: '21'
      }
    ]
  }
  let response1 = await axios.put(apiRoute + `?id=${id}`, updatedDocument)
  let response = response1.data
  expect(response.name).toEqual('testnomoreihate')
  expect(response.Telephone_number).toEqual(1015142324)
  expect(response.number_of_employees).toEqual(30)
  expect(response.members[0].name).toEqual(' ahmedt'),
    expect(response.members[0].age).toEqual(21),
    expect(response.events).toEqual([])
  expect(response.other).toEqual([])
  expect(response.field_of_work).toEqual('testwhyyyyy')
})

const testDelete = test('PartnerDelete right data', async () => {
  let res = await axios.delete(apiRoute + `?id=${id}`)
  let response = await axios.get(apiRoute + `?id=${id}`)
  expect(response.data).toEqual(null)
})

module.exports = {
  testPost,
  testGet,
  testPut,
  testDelete
}
