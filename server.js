import express from "express";
import "express-async-errors";
import "dotenv/config";

//data:
import { obj } from "./database.js";


const port = process.env.PORT
const path = "/my-server"
const link = `http://localhost:${3000}${path}`



const server = express()

server.get(path, (request, response) => {
    response.json(obj)
})


export {server as app, port, link}