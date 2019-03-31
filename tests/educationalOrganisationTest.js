var fetch = require("node-fetch");
var baseURL = process.env.BASEURL || 'http://localhost:3000'
const funcs = {
  postEducationalOrganisation: async () => {
    let response = await fetch(
      `${baseURL}/api/EducationalOrganisation`,
      {
        method: "POST",
        body: JSON.stringify({ name: "CarolZainab", email: "ct@gmail.com" }),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
      }
    );
    let data = await response.json();
    return data;
  },
  getEducationalOrganisation: async () => {
    let response = await fetch(
      `${baseURL}/api/EducationalOrganisation?email=ct@gmail.com `,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
      }
    );
    let data = await response.json();
    return data;
  },
  getAllEducationalOrganisations: async () => {
    let response = await fetch(
      `${baseURL}/api/EducationalOrganisation/all `,
      {
        method: "GET",
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

const postTest=test("post Educational Organisation", async () => {
  const response = await funcs.postEducationalOrganisation();
  console.log(response);
  expect(response.name).toEqual("CarolZainab");
});

const readAllTest=test("get all Educational Organisations ", async () => {
  const response = await funcs.getAllEducationalOrganisations();
  console.log(response);
  expect(response).not.toBeNull();
});

const readTest=test("get Educational Organisation ", async () => {
  const response = await funcs.getEducationalOrganisation();
  expect(response.email).toEqual("ct@gmail.com");
});

module.exports={
postTest,
readAllTest,
readTest
}