const fetch = require('node-fetch')

let baseURL = process.env.BASEURL || 'http://localhost:3000'

const axios = require('axios')

let reply = ''

let memberId,
  partnerId,
  taskId = ''

const funcs = {
  putPartnerAssignesMember: async () => {
    let member = {
      name: 'ahmed',

      birthDate: '2018-01-01T00:00:00.000Z'
    }

    let memberData = (await axios.post(`${baseURL}/api/Member`, member)).data

    memberId = memberData._id

    let partner = {
      name: 'partner',

      Telephone_number: '13333334444',

      number_of_employees: '30',

      field_of_work: 'testingg'
    }

    let partnerRes = await axios.post(`${baseURL}/api/partner`, partner)

    let partnerData = partnerRes.data

    partnerId = partnerData._id

    let task = {
      name: 'Tester.Test123',

      description: 'This is Tester.Test123 Description',

      extraNotes: 'This is Tester.Test123 Extra Notes',

      effortLevel: 9,

      monetaryComp: 999999999,

      owner: partnerId,

      applications: {
        applier: memberId,

        details: 'my plan',

        applierModel: 'Members'
      }
    }

    let taskRes = await axios.post(`${baseURL}/api/task`, task)

    let taskData = taskRes.data

    taskId = taskData._id

    let response = await fetch(
      `${baseURL}/api/partner/chooseAssignee` + `?id=${taskId}`,
      {
        method: 'PUT',

        body: JSON.stringify({
          assignee: memberId
        }),

        headers: {
          'Content-Type': 'application/json'
        },

        credentials: 'same-origin'
      }
    )

    let data = await response.json()

    reply = data

    let deleteresponse = await axios.delete(
      `${baseURL}/api/task` + `?id=${taskId}`
    )

    return data
  }
}

const putTest = test('partner chooses assignee', async () => {
  const response = await funcs.putPartnerAssignesMember()

  expect(response.assignee).toEqual(memberId)
})

module.exports = {
  putTest
}
