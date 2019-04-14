let baseURL = process.env.BASEURL || `http://localhost:3000`
const axios = require('axios')
let fetch = require('node-fetch')
const testMemberApply = test('Member apply on task', async () => {
  const taskdocument = {
    name: 'z.Test123',
    description: 'This is z.Test123 Description',
    extraNotes: 'This is z.Test123 Extra Notes',
    effortLevel: 995,
    monetaryComp: 93,
    skills: ['python', 'java']
  }
  const memberdocument = {
    name: 'testz',
    certification: [
      {
        skills: ['python', 'java']
      }
    ]
  }
  let responsetask = await axios.post(`${baseURL}/api/task`, taskdocument)
  let responsemember = await axios.post(`${baseURL}/api/Member`, memberdocument)
  let taskid = responsetask.data._id
  let memberid = responsemember.data._id
  const document = {
    id: memberid,
    taskId: taskid,
    details: 'helllllo from other siiiiide'
  }
  let com = await axios.post(`${baseURL}/api/Member/applyonTask`, document)
  let response = com.data
  expect(response.task).toEqual(taskid)
  expect(response.applier).toEqual(memberid)
  expect(response.applierModel).toEqual('Members')
  await axios.delete(`${baseURL}/api/task` + `?id=${taskid}`)
  await axios.delete(`${baseURL}/api/Member` + `?id=${memberid}`)
  await axios.delete(`${baseURL}/api/application` + `?id=${response._id}`)
})
const testSearchTags = test('searching with keywords', async () => {
  const taskdocument = {
    name: 'z2.Test123',
    description: 'This is z.Test123 Description',
    extraNotes: 'This is z.Test123 Extra Notes',
    effortLevel: 995,
    monetaryComp: 93,
    Keywords: ['k1']
  }
  let responsetask = await axios.post(`${baseURL}/api/task`, taskdocument)
  let searching = await axios.get(
    `${baseURL}/search/filteredbyt` + `?tags=["k1"]`
  )
  let response = searching.data
  let taskId = responsetask.data._id
  let t = response.find(function(ele) {
    return ele._id == taskId
  })
  expect(t).not.toBe(null)
  await axios.delete(`${baseURL}/api/task` + `?id=${taskId}`)
})

const testSearchSkills = test('searching for some skills', async () => {
  const taskdocument = {
    name: 'z2.Test123',
    description: 'This is z.Test123 Description',
    extraNotes: 'This is z.Test123 Extra Notes',
    effortLevel: 995,
    monetaryComp: 93,
    skills: ['k1']
  }
  let jason = JSON.stringify({ skills: taskdocument.skills[0] })

  let responsetask = await axios.post(`${baseURL}/api/task`, taskdocument)
  let searching = await axios.get(`${baseURL}/search/sk` + `?skills=` + jason)
  let response = searching.data
  let taskId = responsetask.data._id
  let t = response.find(function(ele) {
    return ele._id == taskId
  })
  expect(t).not.toBe(null)
  await axios.delete(`${baseURL}/api/task` + `?id=${taskId}`)
})

module.exports = { testMemberApply, testSearchSkills, testSearchTags }
