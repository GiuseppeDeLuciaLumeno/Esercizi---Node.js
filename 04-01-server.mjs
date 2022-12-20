import {createServer} from "node:http"

const myServer = createServer((req, res) => {

  res.statusCode = 200
  res.setHeader("Content-type", "text/html")
  res.end(
    `<html>
    <body>
    <h1>This is my first personal Server!!</h1>
    </body>
    </html>`
  )
})

let port = 3000

myServer.listen(port, () => {
  console.log(`Running at: http://localhost:${port}`)
})
