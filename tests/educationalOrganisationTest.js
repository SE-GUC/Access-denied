const fetch = require('node-fetch')
let baseURL = process.env.BASEURL || 'http://localhost:3000'
const edumodel = require('../models/educationalOrganisation.model')
let id = ''
const funcs = {
  postEducationalOrganisation: async () => {
    let response = await fetch(`${baseURL}/api/EducationalOrganisation`, {
      method: 'POST',
      body: JSON.stringify({ name: 'CarolZainab' }),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    })

    let data = await response.json()

    id = data._id
    return data
  },
  getEducationalOrganisation: async () => {
    let response = await fetch(
      `${baseURL}/api/EducationalOrganisation?id=${id} `,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
      }
    )
    let data = await response.json()
    return data
  },
  getAllEducationalOrganisations: async () => {
    let response = await fetch(`${baseURL}/api/EducationalOrganisation/all `, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    })
    let data = await response.json()
    return data
  },
  deleteEducationalOrganisation: async () => {
    let response = await fetch(
      `${baseURL}/api/EducationalOrganisation?id=${id} `,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
      }
    )
    let data = await response.json()
    return data
  },

  updateEducationalOrganisation: async () => {
    let response = await fetch(
      `${baseURL}/api/EducationalOrganisation?id=${id}`,
      {
        method: 'PUT',
        body: JSON.stringify({ name: 'newname' }),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
      }
    )
    let data = await response.json()
    return data
  },

  //attempts to post name only, email is required but missing, should give error
  postMissingData: async () => {
    let response = await fetch(`${baseURL}/api/EducationalOrganisation`, {
      method: 'POST',
      body: JSON.stringify({ name: 'eduorg' }),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    })
    let data = await response.json()
    return data
  }
}

const postTest = test('post Educational Organisation', async () => {
  const response = await funcs.postEducationalOrganisation()
  expect(response.name).toEqual('CarolZainab')
})

const readAllTest = test('get all Educational Organisations ', async () => {
  const response = await funcs.getAllEducationalOrganisations()
  expect(response).not.toBeNull()
})

const readTest = test('get Educational Organisation ', async () => {
  const response = await funcs.getEducationalOrganisation()
  expect(response._id).toEqual(id)
})

const updateTest = test('update Educational Organisation ', async () => {
  const response = await funcs.updateEducationalOrganisation()
  expect(response.name).toEqual('newname') && expect(response._id).toEqual(id)
})

const deleteTest = test('delete Educational Organisation ', async () => {
  const response = await funcs.deleteEducationalOrganisation()
  expect(response._id).toEqual(id)
})

//post an entity missing required info, expect an error
const postMissing = test('attempts to post educational organisation with missing data, should return error', async () => {
  const response = await funcs.postMissingData()
  expect(Error)
})

module.exports = {
  postTest,
  readAllTest,
  readTest,

  updateTest,
  deleteTest,
  postMissing
}
