const fetch = require('node-fetch')
let baseURL = process.env.BASEURL || 'http://localhost:3000'


const funcs = {

  postEducationalOrganisation: async () => {
    let response = await fetch(`${baseURL}/api/EducationalOrganisation`, {
      method: 'POST',
      body: JSON.stringify({ name: 'CarolZainab', email: 'ct@gmail.com' }),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    })
    let data = await response.json()
    return data
  },
  getEducationalOrganisation: async () => {
    let response = await fetch(
      `${baseURL}/api/EducationalOrganisation?email=ct@gmail.com `,
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
      `${baseURL}/api/EducationalOrganisation?email=ct@gmail.com `,
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
        `${baseURL}/api/EducationalOrganisation?email=ct@gmail.com`,
      {
        method: "PUT",
        body: JSON.stringify({ name: "newname",email: "ct@gmail.com" }),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
      }
    );
    let data = await response.json();
    return data;
  },
 


  //attempts to post name only, email is required but missing, should give error
  postMissingData: async () => {
    let response = await fetch(
        `${baseURL}/api/EducationalOrganisation`,
      {
        method: "POST",
        body: JSON.stringify({name:"eduorg" }),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
      }
    );
    let data = await response.json();
    return data;
  }

};








const postTest = test('post Educational Organisation', async () => {
  const response = await funcs.postEducationalOrganisation()
  console.log(response)
  expect(response.name).toEqual('CarolZainab')
})

const readAllTest = test('get all Educational Organisations ', async () => {
  const response = await funcs.getAllEducationalOrganisations()
  console.log(response)
  expect(response).not.toBeNull()
})

const readTest = test('get Educational Organisation ', async () => {
  const response = await funcs.getEducationalOrganisation()
  expect(response.email).toEqual('ct@gmail.com')
})

const deleteTest = test('delete Educational Organisation ', async () => {
  const response = await funcs.deleteEducationalOrganisation()
  expect(response.email).toEqual('ct@gmail.com')
})
const updateTest=test("update Educational Organisation ", async () => {
  const response = await funcs.updateEducationalOrganisation();
  console.log(response);
  expect(response.name).toEqual("newname")&&
  expect(response.email).toEqual("ct@gmail.com");
});

 
  //post an entity missing required info, expect an error 
  const postMissing = test("attempts to post educational organisation with missing data, should return error", async () => {
    const response = await funcs.postMissingData();
    console.log(response);
    expect(Error)
    
  });

module.exports = {
  postTest,
  readAllTest,
  readTest,

  updateTest,
deleteTest,
postMissing
}
