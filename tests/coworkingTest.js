const coworking = require("../routes/coworkingspace");

const add = (a, b) => a + b;
const addTest = test("Creates a new Co-working Space", () => {
  expect(add(1, 2)).toBe(3);
});

module.exports.test = addTest
