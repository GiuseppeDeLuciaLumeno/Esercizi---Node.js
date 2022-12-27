const { createServer } = require("node:http")
const port = 3000

const server = () => {
    return createServer((req, res) => {
        res.statusCode = 200
        res.setHeader("Content-Type", "text/html")
        res.end("Welcome to the World Wide Web!")
    })
}

const appServer = server()

// appServer.listen(port, () => {
//     console.log(`Running at: http://localhost:${port}`)
// })


 module.exports = appServer

