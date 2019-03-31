const fetch = require('node-fetch')
let baseURL = process.env.BASEURL || 'http://localhost:3000'
let reply = ''

const funcs = {
  postEvaluation: async () => {
    let response = await fetch(
        `${baseURL}/api/Evaluation`,
      {
        method: "POST",
        body: JSON.stringify({ styleOfEvaluation: "WriteCode", link: "www.test.com" }),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
      }
    );
    let data = await response.json();
    reply = data
    return data;
  },
  getEvaluation: async () => {
    let response = await fetch(
        `${baseURL}/api/Evaluation?id=${reply._id}`, 
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
  updateEvaluation: async () => {
    let response = await fetch(
        `${baseURL}/api/Evaluation?id=${reply._id}`,
      {
        method: "PUT",
        body: JSON.stringify({ styleOfEvaluation: "WriteCode", link: "www.testupdated.com"  }),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
      }
    );
    let data = await response.json();
    return data;
  },
  deleteEvaluation: async () => {
    let response = await fetch(
        `${baseURL}/api/Evaluation?id=${reply._id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
      }
    );
    let data = await response.json();
    return data;
  },
  postMissingData: async () => {
    let response = await fetch(
        `${baseURL}/api/Evaluation`,
      {
        method: "POST",
        body: JSON.stringify({link: "www.testupdated.com"  }),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
      }
    );
    let data = await response.json();
    return data;
  }

}

  const postTest=test("post Evaluation", async () => {
    const response = await funcs.postEvaluation();
    console.log(response);
    expect(response.styleOfEvaluation).toEqual("WriteCode")&&
    expect(response.link).toEqual("www.test.com")
  });
  const readTest=test("get Evaluation ", async () => {
    const response = await funcs.getEvaluation();
    console.log(response);
    expect(response.styleOfEvaluation).toEqual("WriteCode")&&
    expect(response.link).toEqual("www.test.com")&&
    expect(response._id).toEqual(`${reply._id}`);
  });
  const updateTest=test("update Evaluation", async () => {
    const response = await funcs.updateEvaluation();
    console.log(response);
    expect(response.styleOfEvaluation).toEqual("WriteCode")&&
    expect(response.link).toEqual("www.testupdated.com")&&
    expect(response._id).toEqual(`${reply._id}`);
  });
  const deleteTest=test("delete Evaluation ", async () => {
    const response = await funcs.deleteEvaluation();
    console.log(response);
    expect(response.styleOfEvaluation).toEqual("WriteCode")&&
    expect(response.link).toEqual("www.testupdated.com") &&
    expect(response._id).toEqual(`${reply._id}`);
    
  });
  const postMissing = test("attempts to post evaluation with missing data, should return error", async () => {
    const response = await funcs.postMissingData();
    console.log(response);
    expect(Error)
    
  });



  module.exports={
    postTest,
    readTest,
    updateTest,
    deleteTest,
    postMissing
    }