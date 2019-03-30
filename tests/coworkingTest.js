const coworking = require("../routes/coworkingspace");
const axios = require("axios");
const _ = require('lodash');

var baseURL = process.env.BASEURL || "http://localhost:3000";

const addTest = test("Creates a new Co-working Space", async () => {
  const body = {
    name: "jesnkdfsmndn dfs ndfsqwtft",
    email: "jefdskhksdfhb123213213qqkdfsbkfsksd@test.j2s",
    phoneNumber: "01111673414634281211420123",
    description: "jest",
    noOfRooms: 10
  };
  expect(_.pick(((await axios.post(`${baseURL}/api/coworking`, body)).data),Object.keys(body))).toEqual(body);
});

module.exports.test = addTest;
