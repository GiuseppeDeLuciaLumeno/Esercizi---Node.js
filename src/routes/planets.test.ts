import supertest from "supertest";
import app from "../app";
import { prismaMock } from "../lib/prisma/client.mock"

const request = supertest(app);

describe("GET /planets", () => {
test("Valid request", async () => {
    const planets = [
        {
            id: 1,
            name: "Mercury",
            description: null,
            diameter: 1234,
            moons: 12,
            createdAt: "2023-01-12T16:51:20.763Z",
            updateAt: "2023-01-12T16:52:26.111Z"
        },
        {
            id: 2,
            name: "Venus",
            description: null,
            diameter: 5678,
            moons: 2,
            createdAt: "2023-01-12T16:52:26.111Z",
            updateAt: "2023-01-12T16:51:27.412Z"
        }

    ];

    //@ts-ignore
    prismaMock.planet.findMany.mockResolvedValue(planets);

    const response = await request
        .get("/planets")
        .expect(200)
        .expect("Content-Type", /application\/json/)
        .expect("Access-COntrol-Allow-Origin", "http://localhost:8080");

    expect(response.body).toEqual(planets);
});
});

describe("GET /planet/:id", () => {
    test("Valid request", async () => {
        const planet =
            {
                id: 1,
                name: "Mercury",
                description: null,
                diameter: 1234,
                moons: 12,
                createdAt: "2023-01-12T16:51:20.763Z",
                updateAt: "2023-01-12T16:52:26.111Z"
            };

        //@ts-ignore
        prismaMock.planet.findUnique.mockResolvedValue(planet);

        const response = await request
            .get("/planets/1")
            .expect(200)
            .expect("Content-Type", /application\/json/);

        expect(response.body).toEqual(planet);
    });

        test("Planet does not exist", async () => {
             //@ts-ignore
        prismaMock.planet.findUnique.mockResolvedValue(null);

        const response = await request
            .get("/planets/23")
            .expect(404)
            .expect("Content-Type", /text\/html/);

        expect(response.text).toContain("Cannot GET /planets/23");
        })

        test("Invalid planet ID", async () => {

       const response = await request
           .get("/planets/asdf")
           .expect(404)
           .expect("Content-Type", /text\/html/);

       expect(response.text).toContain("Cannot GET /planets/asdf");
       })
    });

describe("POST /planets", () => {
    test("Valid request", async () => {

        const planet =
            {
                id: 3,
                name: "Mercury",
                description: null,
                diameter: 1234,
                moons: 12,
                createdAt: "2023-01-13T16:17:08.865Z",
                updateAt: "2023-01-13T16:17:08.865Z"
            };

        //@ts-ignore
        prismaMock.planet.create.mockResolvedValue(planet);

        const response = await request
            .post("/planets")
            .send({
                name: "Mercury",
                diameter: 1234,
                moons: 12
            })
            .expect(201)
            .expect("Content-Type", /application\/json/)
            .expect("Access-COntrol-Allow-Origin", "http://localhost:8080");

        expect(response.body).toEqual(planet);
    });

    test("Invalid request", async () => {
        const planet =
            {
                diameter: 1234,
                moons: 12
            };

        const response = await request
            .post("/planets")
            .send(planet)
            .expect(422)
            .expect("Content-Type", /application\/json/);

        expect(response.body).toEqual({
            errors: {
                body: expect.any(Array)
            }
        });
    });

});


describe("PUT /planets/:id", () => {
    test("Valid request", async () => {

        const planet =
            {
                id: 3,
                name: "Mercury",
                desciption: "Lovely planet",
                diameter: 1234,
                moons: 12,
                createdAt: "2023-01-13T16:17:08.865Z",
                updateAt: "2023-01-13T16:17:08.865Z"
            };

        //@ts-ignore
        prismaMock.planet.update.mockResolvedValue(planet);

        const response = await request
            .put("/planets/3")
            .send({
                name: "Mercury",
                desciption: "Lovely planet",
                diameter: 1234,
                moons: 12
            })
            .expect(200)
            .expect("Content-Type", /application\/json/)
            .expect("Access-COntrol-Allow-Origin", "http://localhost:8080");

        expect(response.body).toEqual(planet);
    });

    test("Invalid request", async () => {
        const planet =
            {
                diameter: 1234,
                moons: 12
            };

        const response = await request
            .put("/planets/")
            .send(planet)
            .expect(422)
            .expect("Content-Type", /application\/json/);

        expect(response.body).toEqual({
            errors: {
                body: expect.any(Array)
            }
        });
    });

    test("Planet does not exist", async () => {
        //@ts-ignore
   prismaMock.planet.update.mockRejectedValue(new Error("Error"));

   const response = await request
       .put("/planets/23")
       .send({
            name: "Mercury",
            desciption: "Lovely planet",
            diameter: 1234,
            moons: 12
        })
       .expect(404)
       .expect("Content-Type", /text\/html/);

   expect(response.text).toContain("Cannot PUT /planets/23");
   })

   test("Invalid planet ID", async () => {

  const response = await request
      .put("/planets/asdf")
      .send({
        name: "Mercury",
        desciption: "Lovely planet",
        diameter: 1234,
        moons: 12
    })
      .expect(404)
      .expect("Content-Type", /text\/html/);

  expect(response.text).toContain("Cannot PUT /planets/asdf");
  });
});

describe("DELETE /planet/:id", () => {
    test("Valid request", async () => {
        const response = await request
            .delete("/planets/1")
            .expect(204)
            .expect("Access-COntrol-Allow-Origin", "http://localhost:8080");


        expect(response.text).toEqual("");
    });

        test("Planet does not exist", async () => {
             //@ts-ignore
        prismaMock.planet.delete.mockRejectedValue(new Error("Error"));

        const response = await request
            .delete("/planets/23")
            .expect(404)
            .expect("Content-Type", /text\/html/);

        expect(response.text).toContain("Cannot DELETE /planets/23");
        })

        test("Invalid planet ID", async () => {

       const response = await request
           .delete("/planets/asdf")
           .expect(404)
           .expect("Content-Type", /text\/html/);

       expect(response.text).toContain("Cannot DELETE /planets/asdf");
       });
    });

/**
 * These test depend on: /src/lib/middleware/multer.mock.ts
 * It uses multer.memoryStorage so no files are written to disk
 */
describe("POST /planets/:id/photo", () => {
    test("Valid request with PNG file upload", async () => {
        await request
            .post("/planets/23/photo")
            .attach("photo", "test-fixtures/photo/file.png")
            .expect(201)
            .expect("Access-COntrol-Allow-Origin", "http://localhost:8080");
    });

    test("Invalid planet ID", async () => {
        const response = await request
            .post("/planets/asdf/photo")
            .expect(404)
            .expect("Content-Type", /text\/html/);

        expect(response.text).toContain("Cannot POST planets/asdf/photo");
    });

    test("Invalid request with no file upload", async () => {
        const response = await request
            .post("/planets/23/photo")
            .expect(400)
            .expect("Content-Type", /text\/html/);

        expect(response.text).toContain("No photo file uploaded.");
    });
});