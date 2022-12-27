const supertest = require("supertest");

const appServer = require("./app.js");

const request = supertest(appServer);

test("GET /", async() => {
  const response = await request.get("/")
    .expect(200)
    .expect("Content-Type", "text/html");

  expect(response.text).toEqual("Welcome to the World Wide Web!")
});
