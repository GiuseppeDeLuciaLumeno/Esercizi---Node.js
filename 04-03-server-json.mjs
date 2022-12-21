import {createServer} from "node:http";

const myServer= createServer((req, res)=> {

  res.statusCode = 200
  res.setHeader("Content-type", "application/json")

   const jsonResponse = JSON.stringify({location: "Mars"})
  res.end(jsonResponse)
})

const port = 3000

myServer.listen(port, () => {
  console.log(`Server's Running at: http://localhost:${port}`)
})