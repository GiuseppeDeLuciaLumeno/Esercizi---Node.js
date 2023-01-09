import supertest from "supertest";
import { app } from "./server.js";
import { obj } from "./database.js";

const request = supertest(app)

test("GET / my-server", async() => {
    const response = await request

    .get("/my-server")
    .expect(200)
    .expect("Content-Type", /application\/json/)

    expect(response.body).toEqual(obj)
})