import express from "express";
import "express-async-errors";
import "dotenv/config";


const port = process.env.PORT
const path = "/my-server"
const link = `http://localhost:${3000}${path}`

const dataToSend = {
    key: "value",
    key2: ["index1", "index2"],
    key3: {["key3.1"]: "elemen1", ["key3.2"]: "elmenet2"}
}



const server = express()

server.get(path, (request, response) => {
    response.json(dataToSend)
})


export {server as app, port, link, dataToSend as obj}